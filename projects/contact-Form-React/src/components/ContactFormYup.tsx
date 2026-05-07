import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

type FormData = yup.InferType<typeof schema>;

const ContactFormYup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted with Yup!");
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us (Yup)
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Send
        </Button>

        {isSubmitSuccessful && (
          <Typography color="success.main" align="center" sx={{ mt: 2 }}>
            Message sent!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ContactFormYup;
