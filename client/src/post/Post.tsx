import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';

import { useParams, useLocation, useNavigate } from 'react-router-dom';

interface Post {
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

export default function Post() {
  const location = useLocation();
  const post = location.state;
  const navigate = useNavigate();

  const { id } = useParams();
  return (
    <>
      <div>
        <h1>{post?.post_title}</h1>
        <h4>
          {post.post_published_date instanceof Date
            ? post.post_published_date.toLocaleDateString()
            : 'Invalid date'}
        </h4>
        <p dangerouslySetInnerHTML={{ __html: post.post_text }} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back to the Blog
        </Button>
      </div>
    </>
  );
}
