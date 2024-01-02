import React from 'react';
import styles from './Projects.module.css';
import irisphoto from '../../images/irisphoto.jpg';
import pstool from '../../images/pstool.png';
import schoolua from '../../images/schoolua.jpg';
import webart from '../../images/webart.jpg';
import comfortway from '../../images/comfortway.png';
import todo from '../../images/todo.jpg';
import osu from '../../images/osu.png';
import derkach from '../../images/derkach.png';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface Project {
  id: string;
  name: string;
  text: string;
  technologies: string;
  link: string;
  image: string;
}

const myProjects: Project[] = [
  {
    id: '1',
    name: "Photographer's Website",
    text: 'I had the pleasure of creating the UI design and back end for the site in a collaborative effort with a skilled photographer.',
    technologies:
      'React.js, Express (Node.js), Redux, React-Router, Font Awesome',
    link: 'https://dreamsmile.photography/',
    image: irisphoto,
  },
  {
    id: '1.1',
    name: "Composer's Website of Euriy Derkach",
    text: 'Landing page for a Ukrainian Canadian composer Euriy Derkach. Providing regular technical support, maintenance, adding content, improving UI/UX.',
    technologies: 'Next.js(13), Tailwind, Typescript',
    link: 'https://euriyderkach.com/',
    image: derkach,
  },
  {
    id: '1.2',
    name: "Non-for-profit Organization's Website",
    text: 'Landing page for a non-for-profit organization OSUDemocracy. Providing regular technical support, maintenance, adding content, improving UI/UX.',
    technologies: 'React.js, Tailwind, Typescript',
    link: 'https://osudemocracy.com/',
    image: osu,
  },
  {
    id: '2',
    name: 'Psychological Tool',
    text: 'An app (first stage) for measuring the level of happiness. A main idea:  a person is happy when everything is good with what is important to him/her (family, relatives, friends, favorite things), and also when what a person does is what he/she wants, can and should do.',
    technologies: 'React, MUI',
    link: 'https://volodsher.github.io/am-i-happy/',
    image: pstool,
  },
  {
    id: '3',
    name: 'Site of Ukrainian School in Ottawa',
    text: 'I provide IT support and web development for a website for Ukrainian School in Ottawa and am currently working on translating the site into English.',
    technologies: 'WIX',
    link: 'https://www.schoolua.org/',
    image: schoolua,
  },
  {
    id: '4',
    name: 'Website of an Artist',
    text: "IT support and web development for the website of the famous Ukrainian artist Valentyna Chaykovska's art gallery.",
    technologies: 'Drupal 8',
    link: 'https://chaykovska.com.ua/',
    image: webart,
  },
  {
    id: '5',
    name: 'Website Of Plumbing Company in Canada',
    text: 'Web development, content management, UI/UX design, graphic design for plumbing company based in Ottawa, Ontario, Canada. Since this project is a simple representative website that does not require sophisticated calculations or a highly unique design, we decided to use Wordpress instead of the React.js-Node.js stack or other technologies.',
    technologies: 'Wordpress, Elementor, PHP, MySQL',
    link: 'https://comfortway.ca/',
    image: comfortway,
  },
];

export default function Projects(): JSX.Element {
  const theme = useTheme();

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
        Recent Projects
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
        className={styles.projects}
      >
        {myProjects.map((project: Project) => {
          return (
            <Card
              // onClick={() => handleClick(project.link)}
              key={project.id}
              sx={{
                boxSizing: 'border-box',
                flex: '0 1 calc(50% - 0.5rem)',
                padding: '1rem',
                margin: '0.5rem 0',
                backgroundColor: 'rgba(110, 162, 207, 0.9)',
                overflow: 'hidden',
                gap: '0.5rem',
              }}
              className={styles.projectCard}
            >
              <Box>
                <CardContent style={{ padding: '0' }}>
                  <Typography component="div" variant="h5">
                    {project.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {project.text}
                  </Typography>
                  <Link
                    style={{ fontWeight: 'bold', color: 'rgb(230, 243, 247)' }}
                    href={project.link}
                    underline="hover"
                    target="_blank"
                  >
                    {'Link to the Project'}
                  </Link>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {project.technologies}
                  </Typography>
                </CardContent>
              </Box>
              <Link href={project.link} target="_blank">
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.name}
                  className={styles.cardImage}
                />
              </Link>
            </Card>
          );
        })}
      </div>
    </Box>
  );
}
