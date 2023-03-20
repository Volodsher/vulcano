import React from 'react';
import styles from './Projects.module.css';
import irisphoto from '../../images/irisphoto.png';
import pstool from '../../images/pstool.png';
import schoolua from '../../images/schoolua.png';
import webart from '../../images/webart.png';
import todo from '../../images/todo.png';

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
    name: "A Photographer's Website",
    text: 'I had the pleasure of creating the UI design for the site in a collaborative effort with a skilled photographer.',
    technologies:
      'React, Exprss(Node), Redux, React-Router, Font, Font Awesome',
    link: 'https://dreamsmile.photography/',
    image: irisphoto,
  },
  {
    id: '2',
    name: 'Psychological Tool',
    text: 'An app (first stage) for measuring the level of happiness. A main idea:  a person is happy when everything is good with what is important to him/her (family, relatives, friends, favorite things), and also when what a person does is what he/she wants, can and should do.',
    technologies: 'React',
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
    name: 'Todo List',
    text: "This is a simple most popular first React task for learning purposes. It's a good example to show difference between functional and class component. And also how to connect Redux to them.",
    technologies: 'React, Redux',
    link: 'https://volodsher.github.io/todo/',
    image: todo,
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
          // margin: '2rem 0',
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
              }}
              className={styles.projectCard}
            >
              <Box>
                <CardContent>
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
                  <Link href={project.link} underline="hover">
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
              <Link href={project.link}>
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.name}
                />
              </Link>
            </Card>
          );
        })}
      </div>
    </Box>
  );
}
