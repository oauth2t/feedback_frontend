'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from './config/constants';
import FormField from './components/FormField';
import StatusMessage from './components/StatusMessage';

// Define what our form data looks like
type FormData = {
  name: string;
  email: string;
  age: number;
  message: string;
};

export default function FormPage() {
  // Keep track of if form was submitted successfully or had an error
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Set up form handling
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // What happens when form is submitted
  const onSubmit = async (data: FormData) => {
    try {
      // Send data to our server
      await axios.post(`${API_URL}/submit`, data);
      setSubmitStatus('success');
      reset(); // Clear the form
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Submit Form</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Name"
          name="name"
          placeholder="Enter your name"
          register={register}
          errors={errors}
          validation={{ required: 'Name is required' }}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
        />

        <FormField
          label="Age"
          name="age"
          type="number"
          placeholder="Enter your age"
          register={register}
          errors={errors}
          validation={{
            required: 'Age is required',
            min: { value: 18, message: 'Must be at least 18' }
          }}
        />

        <FormField
          label="Message"
          name="message"
          placeholder="Enter your message"
          register={register}
          errors={errors}
          validation={{ required: 'Message is required' }}
          isTextArea={true}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {submitStatus === 'success' && (
        <StatusMessage 
          type="success" 
          message="Form submitted successfully!" 
        />
      )}

      {submitStatus === 'error' && (
        <StatusMessage 
          type="error" 
          message="Error submitting form. Please try again." 
        />
      )}
    </div>
  );
} 