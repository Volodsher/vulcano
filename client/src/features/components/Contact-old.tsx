import React from 'react';
import styles from './Contact.module.css';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import { useFormControls } from '../utilities/Validator';

export default function Contact(): JSX.Element {
  // function handleClick(newHref: string): void {
  //   window.location.href = newHref;
  //   // window.open(newHref, '_blank');
  // }

  const { handleInputValue, handleFormSubmit, formIsValid, values, errors } =
    useFormControls();

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Contact
      </Typography>
      <form
        // onSubmit={(event) => {
        //   event.preventDefault();
        // }}
        onSubmit={handleFormSubmit}
        style={{
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            textAlign: 'left',
            columnGap: '2rem',
            marginBottom: '2rem',
          }}
          className={styles.nameEmailBox}
        >
          <Box className={styles.inputNameEmail}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={values.name}
              placeholder="Type your name here…"
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              size="md"
              startDecorator={<FontAwesomeIcon icon={faUser} />}
              error
              // defaultValue="Oh no, error found!"
              required
              // {...(errors['name'] && {
              //   error: true,
              //   helperText: errors['name'],
              // })}
            />
          </Box>
          <Box className={styles.inputNameEmail}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={values.email}
              placeholder="Type your email here…"
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              // error
              // defaultValue="Oh no, error found!"
              {...(errors['email'] && {
                error: true,
                helperText: errors['email'],
              })}
              size="md"
              required
              startDecorator={<FontAwesomeIcon icon={faEnvelope} />}
            />
          </Box>
          <Box
            style={{
              textAlign: 'left',
              width: '100%',
              minWidth: '200px',
            }}
          >
            <FormLabel>Message</FormLabel>
            <Input
              name="message"
              value={values.message}
              placeholder="Type your message here…"
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              // error
              // defaultValue="Oh no, error found!"
              {...(errors['message'] && {
                error: true,
                helperText: errors['message'],
              })}
              // {...(true && {
              //   error: true,
              //   defaultValue: 'Please check your message, only lettars',
              // })}
              size="md"
              required
              startDecorator={<FontAwesomeIcon icon={faEnvelopeOpenText} />}
            />
          </Box>
        </Box>
        <Button
          // disabled={!formIsValid()}
          type="submit"
        >
          Send Message
        </Button>
        <Typography>{JSON.stringify(errors)}</Typography>
      </form>
    </Box>
  );
}
