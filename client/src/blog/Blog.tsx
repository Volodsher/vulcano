import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

// export default async function Blog() {

export default function Blog() {
  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Blog for blog
      </Typography>
      Blog
      <div>news section</div>
      {/* pagination or button with show more */}
      <div>pagination</div>
    </div>
  );
}
