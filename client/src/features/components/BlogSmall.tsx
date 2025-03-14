import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';

export default function BlogSmall() {
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
      Blog
      <div>news section</div>
      {/* pagination or button with show more */}
      <div>pagination</div>
      <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button type="submit">Go to blog</Button>
        </div>
      </Link>
    </div>
  );
}

// import React from 'react';
// import Typography from '@mui/material/Typography';

// export default async function BlogSmall() {
//   const data = await fetch('/api/posts');
//   const posts = await data.json();

//   // const data = await fetch('https://api.vercel.app/blog')
//   // const posts = await data.json()
//   // return (
//   //   <ul>
//   //     {posts.map((post) => (
//   //       <li key={post.id}>{post.title}</li>
//   //     ))}
//   //   </ul>
//   // )

//   return (
//     <div>
//       <Typography
//         variant="h4"
//         sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
//         color="text.secondary"
//         component="div"
//       >
//         Blog
//       </Typography>
//       Blog
//       {/* <div>
//         {posts.map((post) => {
//           <li key={post.id}>{post.post_name}</li>;
//         })}
//       </div> */}
//       {/* pagination or button with show more */}
//       <div>pagination</div>
//     </div>
//   );
// }
