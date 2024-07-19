import React from 'react';

// export default async function Blog() {

export default function Blog() {
  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  return (
    <div>
      Blog
      <div>news section</div>
      {/* pagination or button with show more */}
      <div>pagination</div>
    </div>
  );
}
