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
    cb(null, './uploads/projects');
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

// post
// get
// edit
// delete
// get only one post???

// @route  POST api/projects
// @desc   Create a projects
// @access Private
router.post(
  '/',
  auth,
  upload,
  check('project_name', 'Project name is required').notEmpty(),
  check('project_name_ua', 'Project name in Ukrainian is required').notEmpty(),
  check('project_name_fr', 'Project name in French is required').notEmpty(),

  check('project_short_text', 'Short text is required').notEmpty(),
  check(
    'project_short_text_ua',
    'Short text in Ukrainian is required'
  ).notEmpty(),
  check('project_short_text_fr', 'Short text in French is required').notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let project_text = '123onetwothree';
    console.log(project_text);

    const {
      project_name,
      project_name_ua,
      project_name_fr,
      project_short_text,
      project_short_text_ua,
      project_short_text_fr,
      // project_text,
      project_text_ua,
      project_text_fr,
      project_technologies,
      project_link,
    } = req.body;

    console.log(`this is project text: ${project_text}`);
    const id = uuidv4();

    let project_images = '{}';
    if (req.body.project_images) {
      project_images = JSON.stringify(req.body.project_images);
    }
    console.log(project_images);
    if (req.file) {
      console.log(req.file);
      try {
        // Resize image to width 800px
        const resizedImage800Buffer = await sharp(req.file.path)
          .resize({ width: 800 })
          .toBuffer();

        // Save or upload the resized image with width 800px
        fs.writeFileSync(
          `./uploads/projects/${image.substring(0, image.length - 4)}800.jpg`,
          resizedImage800Buffer
        );

        // Add the resized images to the newPost object or update the image field with their base64 representation
        // newPost.image800 = resizedImage800Buffer.toString('base64');
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error resizing image' });
      }
    }

    const newProject = {
      id,
      project_name,
      project_name_ua,
      project_name_fr,
      project_short_text,
      project_short_text_ua,
      project_short_text_fr,
      project_text,
      project_text_ua,
      project_text_fr,
      project_technologies,
      project_link,
      project_images,
    };

    console.log(newProject);
    // Post a new post
    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 1' });
      }

      const addNewProject =
        'INSERT INTO projects (id, project_name, project_name_ua, project_name_fr, project_short_text, project_short_text_ua, project_short_text_fr, project_text, project_text_ua, project_text_fr, project_technologies, project_link, project_images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      connection.query(
        addNewProject,
        [
          id,
          project_name,
          project_name_ua,
          project_name_fr,
          project_short_text,
          project_short_text_ua,
          project_short_text_fr,
          project_text,
          project_text_ua,
          project_text_fr,
          project_technologies,
          project_link,
          project_images,
        ],
        (err, results) => {
          connection.release();

          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error 2' });
          }

          results = {
            message: 'You successfully added a new post!',
            newProject: newProject,
          };

          res.json(results);
        }
      );
    });
  }
);

// @route  GET api/projects
// @desc   Get all projects
// @access Public
router.get('/', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 3' });
    }

    const getAllProjects = 'SELECT * FROM projects ORDER BY order ASC';
    connection.query(getAllProjects, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 4' });
      }

      res.send(rows);
    });
  });
});

// @route   GET api/posts/:id if I really need it
// @dexc    Get post by ID
// @access  Private

router.get('/:id', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 5' });
    }

    const getOneProject = `SELECT * FROM projects WHERE id = ?`;
    connection.query(getOneProject, [req.params.id], (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 6' });
      }

      res.send(rows);
    });
  });
});

// @route   DELETE api/posts/:id
// @dexc    Delete a post by ID
// @access  Private
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;

  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 7' });
    }

    const checkProjectQuery = 'SELECT 1 FROM projects WHERE id = ? LIMIT 1';
    connection.query(checkProjectQuery, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database error 8' });
      }

      if (rows.length === 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: "Project with such name doesn't exists" }],
        });
      }

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

      const deleteProject = 'DELETE FROM projects WHERE id = ?';
      connection.query(deleteProject, [id], (err, results) => {
        connection.release();

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error 9' });
        }

        results.message = 'You successfully deleted a project!';
        res.json(results.message);
      });
    });
  });
});

// @route   UPDATE api/posts/:id
// @dexc    Update a post by ID
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // let post = await Post.findById(req.params.id);
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database error 10' });
    }

    const checkProjectQuery = 'SELECT 1 FROM projects WHERE id = ? LIMIT 1';
    connection.query(checkProjectQuery, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database rorror 10' });
      }

      if (rows.length === 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: "Project with such name doesn't exists" }],
        });
      }

      const edit_date = new Date().toJSON().slice(0, 10);
      const edited = true;
      const id = req.params.id;
      const { title, text, image, date } = req.body;

      const updatedProject = {
        id,
        project_name,
        project_name_ua,
        project_name_fr,
        project_short_text,
        project_short_text_ua,
        project_short_text_fr,
        project_text,
        project_text_ua,
        project_text_fr,
        project_technologies,
        project_link,
        project_images,
      };

      const updateProject =
        'UPDATE posts SET title = ?, text = ?, image = ?, date = ?, edited = ?, edit_date = ? WHERE id = ?;';

      connection.query(
        updateProject,
        [title, text, image, date, edited, edit_date, id],
        (err, results) => {
          connection.release();

          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error 11' });
          }
          // console.log(results);
          // results.message = `You just edited post: ${title}`;
          // res.json(results.message);
          res.json(updatedProject);
        }
      );
    });
  });
});

module.exports = router;

// "project_name": "",
// "project_name_ua": "",
// "project_name_fr": "",
// "project_short_text": "",
// "project_short_text_ua": "",
// "project_short_text_fr": "",
// "project_text": "",
// "project_text_ua": "",
// "project_text_fr": "",
// "project_technologies": "",
// "project_link": ""

// "project_text": "This is about first, This is about first, This is about first",
// "project_text_ua": "Це про перший Це про перший Це про перший",
// "project_text_fr": "Ce pro perschyi Ce pro perschyi Ce pro perschyi ",
// "project_technologies": "react and others",
// "project_link": "www://sdfs.com",
// "project_images": {"two": "sdfssdf"}
