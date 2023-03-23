import React from 'react';
import styles from './Contact.module.css';
import Box from '@mui/material/Box';
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
  const { handleInputValue, handleFormSubmit, values, errors } =
    useFormControls();

  return (
    <Box id="contact">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'white', margin: '2rem 0' }}
        color="text.secondary"
        component="div"
      >
        Contact
      </Typography>
      <form
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
            <FormLabel>Name*</FormLabel>
            <Input
              name="name"
              value={values.name}
              error={errors.name ? true : false}
              placeholder="Type your name here"
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              size="md"
              startDecorator={<FontAwesomeIcon icon={faUser} />}
            />
            <Box style={{ height: '1rem' }}>
              {errors.name && (
                <FormLabel sx={{ color: '#ff8000', fontSize: '0.8rem' }}>
                  {' '}
                  {errors.name}
                </FormLabel>
              )}
            </Box>
          </Box>
          <Box className={styles.inputNameEmail}>
            <FormLabel>Email*</FormLabel>
            {/* {errors.email && (
              <FormLabel sx={{ color: '#ff8000' }}> {errors.email}</FormLabel>
            )} */}
            <Input
              name="email"
              value={values.email}
              error={errors.email ? true : false}
              placeholder="Type your email here"
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              size="md"
              startDecorator={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <Box style={{ height: '1rem' }}>
              {errors.email && (
                <FormLabel sx={{ color: '#ff8000', fontSize: '0.8rem' }}>
                  {' '}
                  {errors.email}
                </FormLabel>
              )}
            </Box>
          </Box>
          <Box
            style={{
              textAlign: 'left',
              width: '100%',
              minWidth: '200px',
            }}
          >
            <FormLabel>Message*</FormLabel>
            {/* {errors.message && (
              <FormLabel sx={{ color: '#ff9933' }}> {errors.message}</FormLabel>
            )} */}
            <Input
              name="message"
              value={values.message}
              variant="soft"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              size="md"
              startDecorator={<FontAwesomeIcon icon={faEnvelopeOpenText} />}
              error={errors.message ? true : false}
              placeholder={
                errors.message ? errors.message : 'Type your message here'
              }
            />
            <Box style={{ height: '1rem' }}>
              {errors.message && (
                <FormLabel sx={{ color: '#ff8000', fontSize: '0.8rem' }}>
                  {' '}
                  {errors.message}
                </FormLabel>
              )}
            </Box>
          </Box>
        </Box>
        <Button
          disabled={
            errors.name !== '' || errors.email !== '' || errors.message !== ''
          }
          type="submit"
        >
          Send Message
        </Button>
      </form>
    </Box>
  );
}
