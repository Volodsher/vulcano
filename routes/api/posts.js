const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/blog');
  },
  filename: function (req, file, cb) {
    console.log('should be a new name here', req.body.image);
    cb(null, req.body.image);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).single('file');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  '/',
  auth,
  upload,
  check('post_title', 'Title is required').notEmpty(),
  check('post_text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      post_title,
      post_title_ua,
      post_title_fr,
      post_short_text,
      post_short_text_ua,
      post_short_text_fr,
      post_text,
      post_text_ua,
      post_text_fr,
      post_images,
      post_status,
    } = req.body;
    const id = uuidv4();
    const post_published_date = new Date().toJSON().slice(0, 10);
    const postUserId = req.user.id;
    let post_author = '';

    // Get user's name
    // Function to get post author's name
    const getPostAuthor = async (postUserId) => {
      return new Promise((resolve, reject) => {
        connectDBMySQL.getConnection((err, connection) => {
          if (err) {
            return reject(err);
          }

          const postsUserQuery = 'SELECT user_login FROM users WHERE id = ?';
          connection.query(postsUserQuery, [postUserId], (err, results) => {
            connection.release();

            if (err) {
              return reject(err);
            }

            if (results.length > 0) {
              resolve(results[0].user_login); // Return the user login
            } else {
              reject(new Error('User not found'));
            }
          });
        });
      });
    };

    // Get the post author's name (asynchronously)
    try {
      post_author = await getPostAuthor(postUserId); // Await the result of the database query
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching author' });
    }

    if (req.file) {
      console.log(req.file);
      try {
        // Resize image to width 800px
        const resizedImage800Buffer = await sharp(req.file.path)
          .resize({ width: 800 })
          .toBuffer();

        // Save or upload the resized image with width 800px
        // Example: fs.writeFileSync('path/to/save/resizedImage800.jpg', resizedImage800Buffer);
        fs.writeFileSync(
          `./uploads/blog/${image.substring(0, image.length - 4)}800.jpg`,
          resizedImage800Buffer
        );

        // Add the resized images to the newPost object or update the image field with their base64 representation
        // newPost.image800 = resizedImage800Buffer.toString('base64');
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error resizing image' });
      }
    }

    const newPost = {
      id,
      post_title,
      post_title_ua,
      post_title_fr,
      post_short_text,
      post_short_text_ua,
      post_short_text_fr,
      post_text,
      post_text_ua,
      post_text_fr,
      post_images,
      post_status,
      post_published_date,
      post_author,
    };

    console.log(newPost);
    // Post a new post
    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 1' });
      }

      const addNewPost =
        'INSERT INTO posts (id, post_title, post_title_ua, post_title_fr, post_short_text, post_short_text_ua, post_short_text_fr, post_text, post_text_ua, post_text_fr, post_images, post_status, post_published_date, post_author) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(
        addNewPost,
        [
          id,
          post_title,
          post_title_ua,
          post_title_fr,
          post_short_text,
          post_short_text_ua,
          post_short_text_fr,
          post_text,
          post_text_ua,
          post_text_fr,
          post_images,
          post_status,
          post_published_date,
          post_author,
        ],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error 2' });
          }

          results = {
            message: 'You successfully added a new post!',
            newPost: newPost,
          };

          res.json(results);
          connection.release();
        }
      );
    });
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 3' });
    }

    const getAllPosts = 'SELECT * FROM posts ORDER BY post_published_date ASC';
    connection.query(getAllPosts, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      res.send(rows);
    });
  });
});

router.get('/:id', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 4' });
    }

    const getOnePosts = `SELECT * FROM posts WHERE id = ?`;
    connection.query(getOnePosts, [req.params.id], (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 5' });
      }

      res.send(rows);
    });
  });
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;

  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 6' });
    }

    const checkPostQuery = 'SELECT 1 FROM posts WHERE id = ? LIMIT 1';
    connection.query(checkPostQuery, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database error 7' });
      }

      if (rows.length === 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: "Post with such name doesn't exists" }],
        });
      }

      console.log(req.body, 'here you go');
      if (req.body.image) {
        fs.unlink(`./uploads/blog/${req.body.image}`, (err) => {
          if (err) throw err;
          console.log('Blog big photo deleted');
        });
        fs.unlink(
          `./uploads/blog/${req.body.image.substring(
            0,
            req.body.image.length - 4
          )}800.jpg`,
          (err) => {
            if (err) throw err;
            console.log('Blog 800 photo deleted');
          }
        );
        fs.unlink(
          `./uploads/blog/${req.body.image.substring(
            0,
            req.body.image.length - 4
          )}350.jpg`,
          (err) => {
            if (err) throw err;
            console.log('Blog 350 photo deleted');
          }
        );
      }

      const deletePost = 'DELETE FROM posts WHERE id = ?';
      connection.query(deletePost, [id], (err, results) => {
        connection.release();

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error 8' });
        }

        results.message = 'You successfully deleted a post!';
        res.json(results.message);
      });
    });
  });
});

// @route PUT api/posts/:id
// @desc Edit a post
// @access Private
router.put(
  '/:id',
  upload,
  check('post_title', 'Title is required').notEmpty(),
  check('post_title_ua', 'UA Title is required').notEmpty(),
  check('post_title_fr', 'FR Title is required').notEmpty(),

  check('post_text', 'Text is required').notEmpty(),
  check('post_text_ua', 'UA Text is required').notEmpty(),
  check('post_text_fr', 'FR Text is required').notEmpty(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database error 9' });
      }

      const checkPostQuery = 'SELECT 1 FROM posts WHERE id = ? LIMIT 1';
      connection.query(checkPostQuery, [req.params.id], (err, rows) => {
        if (err) {
          console.error(err);
          connection.release();
          return res.status(500).json({ error: 'Database rorror 10' });
        }

        if (rows.length === 0) {
          connection.release();
          return res.status(400).json({
            errors: [{ msg: "Post with such name doesn't exists" }],
          });
        }

        const id = req.params.id;

        const updatedPost = {
          post_title: req.body.post_title ?? '',
          post_title_ua: req.body.post_title_ua ?? '',
          post_title_fr: req.body.post_title_fr ?? '',
          post_text: req.body.post_text ?? '',
          post_text_ua: req.body.post_text_ua ?? '',
          post_text_fr: req.body.post_text_fr ?? '',
          post_short_text: req.body.post_short_text ?? '',
          post_short_text_ua: req.body.post_short_text_ua ?? '',
          post_short_text_fr: req.body.post_short_text_fr ?? '',
          post_images: req.body.post_images ?? '[]',
          post_status: req.body.post_status ?? null,
          id,
        };

        const toUpdatePost =
          'UPDATE posts SET post_title = ?, post_title_ua = ?, post_title_fr = ?, post_text = ?, post_text_ua = ?, post_text_fr = ?, post_short_text = ?, post_short_text_ua = ?, post_short_text_fr = ?, post_images = ?, post_status = ? WHERE id = ?;';

        connection.query(
          toUpdatePost,
          [...Object.values(updatedPost), id],
          (err, results) => {
            connection.release();

            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Database error 11' });
            }

            results.message = `You just edited post: ${updatedPost.post_title}`;
            res.json(results.message);
          }
        );
      });
    });
  }
);

module.exports = router;
