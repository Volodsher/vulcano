import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import { useData } from '../context/DataContext';

// interface Post {
//   id: string;
//   post_title: string;
//   post_title_ua: string;
//   post_title_fr: string;
//   post_short_text: string;
//   post_short_text_ua: string;
//   post_short_text_fr: string;
//   post_text: string;
//   post_text_ua: string;
//   post_text_fr: string;
//   post_images: Record<string, any>;
//   post_status: number;
//   post_published_date: Date;
//   post_edited_time: Date;
//   post_author: string;
// }

export default function Blog() {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const { posts, loading } = useData();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await fetch('api/posts', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error('Failed to fetch posts');
  //       }

  //       const data: Post[] = await res.json();

  //       // Ensure date conversion
  //       const formattedData = data.map((post: any) => ({
  //         ...post,
  //         post_published_date: post.post_published_date
  //           ? new Date(post.post_published_date)
  //           : null,
  //         post_edited_time: post.post_edited_time
  //           ? new Date(post.post_edited_time)
  //           : null,
  //       })) as Post[]; // Type assertion here

  //       setPosts(formattedData);

  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Blog
      </Typography>
      <section
        style={{
          marginBottom: '2rem',
          gridTemplateColumns: 'auto auto auto',
        }}
      >
        <div>
          {posts ? (
            posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto auto auto auto auto auto',
                  rowGap: '1px', // Creates a gap that acts like a border
                }}
              >
                <p style={{ paddingTop: '1.33em' }}>
                  {post.post_published_date instanceof Date
                    ? post.post_published_date.toLocaleDateString()
                    : 'Invalid date'}
                </p>

                <div
                  style={{
                    gridColumn: ' 2 / span 6',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '0,5rem',
                  }}
                >
                  <Link
                    to={'/blog/' + post.id}
                    state={post}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h4>{post.post_title}</h4>
                    <p
                      dangerouslySetInnerHTML={{ __html: post.post_short_text }}
                    />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button type="submit">Read more</Button>
      </div>
      {/* pagination or button with show more */}
    </div>
  );
}
