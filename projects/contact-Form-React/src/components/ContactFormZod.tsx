import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const ContactFormZod: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted with Zod!");
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us (Zod)
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

export default ContactFormZod;
