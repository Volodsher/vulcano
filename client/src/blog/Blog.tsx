import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

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
        setPosts(data);

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
    <div>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Blog for blog and again
      </Typography>
      Blog
      <div>news section</div>
      {/* pagination or button with show more */}
      <div>pagination</div>
    </div>
  );
}
