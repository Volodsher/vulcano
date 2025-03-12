import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
// interface Settings {
//   theme: string;
//   notifications: boolean;
// }

interface Post {
  // settings: Settings;
  id: string;
  post_title: string;
  post_title_ua: string;
  post_title_fr: string;
  post_short_text: string;
  post_short_text_ua: string;
  post_short_text_fr: string;
  post_text: string;
  post_text_ua: string;
  post_text_fr: string;
  post_images: Record<string, any>;
  post_status: number;
  post_published_date: Date;
  post_edited_time: Date;
  post_author: string;
}

export default function Blog() {
  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data: Post[] = await res.json();

        // Ensure date conversion
        const formattedData = data.map((post: any) => ({
          ...post,
          post_published_date: post.post_published_date
            ? new Date(post.post_published_date)
            : null,
          post_edited_time: post.post_edited_time
            ? new Date(post.post_edited_time)
            : null,
        })) as Post[]; // Type assertion here

        setPosts(formattedData);

        console.log(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
    // style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // }}
    >
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto auto auto',
            rowGap: '1px', // Creates a gap that acts like a border
            // backgroundColor: '#ccc',
          }}
        >
          {posts.map((post) => (
            <>
              <p>
                {post.post_published_date instanceof Date
                  ? post.post_published_date.toLocaleDateString()
                  : 'Invalid date'}
              </p>

              <p
                style={{
                  gridColumn: ' 2 / span 6',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '0,5rem',
                }}
              >
                <Link
                  to={'/blog/' + post.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {post.post_title}
                </Link>
              </p>
            </>
          ))}
          <div>pagination</div>
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
