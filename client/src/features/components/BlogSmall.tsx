// import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { useData } from '../../context/DataContext';

export default function BlogSmall() {
  const { posts, loading } = useData();
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
      <h3 style={{ textAlign: 'center' }}>
        Some thoughts about the tech and a bit more
      </h3>

      <div style={{ textAlign: 'center' }}>Last 5 news</div>
      <section
        style={{
          marginBottom: '2rem',
          gridTemplateColumns: 'auto auto auto',
        }}
      >
        <div>
          {posts ? (
            posts.map((post) => (
              <div
                key={post.id}
                style={{
                  display: 'grid',
                  gap: '1em',
                  gridTemplateColumns: 'auto auto auto auto auto auto',
                  rowGap: '1px', // Creates a gap that acts like a border
                }}
              >
                {/* <p style={{ paddingTop: '1.33em' }}> */}
                <p style={{ textAlign: 'right' }}>
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
                    <h4 style={{ marginTop: '1em', marginBottom: '0.5em' }}>
                      {post.post_title}
                    </h4>
                    <p
                      style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
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
