import React from 'react';
import styles from './BrandLogos.module.css';
import styles2 from './Projects.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import comfortWay from '../../images/brandLogos/comfortWayGood.jpeg';

interface BrandLogo {
  id: string;
  name: string;
  text: string;
  link: string;
  image: string;
}

const myBrandLogos: BrandLogo[] = [
  {
    id: '1',
    name: 'ComfortWay Heating & Cooling',
    text: 'This is a brand logo of a plumbing company.',
    link: 'https://www.facebook.com/profile.php?id=100086258155451',
    image: comfortWay,
  },
];

export default function BrandLogos(): JSX.Element {
  function handleClick(newHref: string): void {
    window.location.href = newHref;
    // window.open(newHref, '_blank');
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Brand Logos
      </Typography>
      <p style={{ textAlign: 'center' }}>
        I also specialize in creating logos.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          // margin: '2rem 0',
        }}
        className={styles.brandLogos}
      >
        {myBrandLogos.map((brandLogo: BrandLogo) => {
          return (
            <Card
              // onClick={() => handleClick(project.link)}
              key={brandLogo.id}
              sx={{
                display: 'flex',
                boxSizing: 'border-box',
                flex: '0 1 calc(50% - 0.5rem)',
                padding: '1rem',
                margin: '0.5rem 0',
                backgroundColor: 'rgba(110, 162, 207, 0.9)',
                overflow: 'hidden',
                gap: '0.5rem',
              }}
              className={styles.myBrandLogosCard}
            >
              <Box>
                <CardContent style={{ padding: '0' }}>
                  <Typography component="div" variant="h5">
                    {brandLogo.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {brandLogo.text}
                  </Typography>
                  <Link href={brandLogo.link} underline="hover">
                    {'Link to the Project'}
                  </Link>
                </CardContent>
              </Box>
              <Link href={brandLogo.link}>
                <CardMedia
                  className={styles2.cardImage}
                  component="img"
                  image={brandLogo.image}
                  alt={brandLogo.name}
                />
              </Link>
            </Card>
          );
        })}
      </div>
    </Box>
  );
}
