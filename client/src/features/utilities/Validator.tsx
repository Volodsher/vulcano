import { useState } from 'react';
import axios from 'axios';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

const PostContactForm = async (
  values: any,
  successCallback: any,
  errors: any,
  setErrors: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/mail', values, config);
    alert(res.data);
    successCallback();
  } catch (error: any) {
    console.log(error.response.data.errors[0].param);

    error.response.data.errors.map((er: any) =>
      setErrors({ ...errors, [er.param]: er.msg })
    );
    alert(error.response.data.errors.map((al: any) => al.msg));
  }
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let newErrors: any = { ...errors };

    if ('name' in fieldValues) {
      newErrors.name = fieldValues.name ? '' : 'This field is required';
    }

    if ('email' in fieldValues) {
      newErrors.email = fieldValues.email ? '' : 'This field is required';
      if (fieldValues.email)
        newErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ''
          : 'Email is not valid.';
    }

    if ('message' in fieldValues)
      newErrors.message =
        fieldValues.message.length !== 0 ? '' : 'This field is required';

    setErrors({
      ...newErrors,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialValues,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.name &&
      fieldValues.email &&
      fieldValues.message &&
      Object.values(errors).every((x) => x === '');

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    validate();
    const isValid =
      Object.values(errors).every((x) => x === '') && formIsValid();
    if (isValid) {
      await PostContactForm(values, handleSuccess, errors, setErrors);
    }
  };

  return {
    values,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  };
};
