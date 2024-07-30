import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import signInWithGoogle from "../firebase/googleAuth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    setEmail("");
    setPassword("");
    // navigate to home page
    navigate("/home");
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card
        sx={{
          p: 2,
          mt: 5,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleGoogleSignIn} // Handle Google sign-in
          >
            Sign In with Google
          </Button>
        </form>
      </Card>

      {/* register page link */}
      {/* <Typography
        variant="body1"
        align="center"
        sx={{ mt: 2, cursor: "pointer" }}
      >
        Don't have an account? Register here
      </Typography> */}
    </Container>
  );
};

export default Login;
