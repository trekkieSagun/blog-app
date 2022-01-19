import Axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_baseUrl;

const Register = (props) => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    Axios.post(`${baseUrl}/register`, postData).then((result) => {
      if (result.data.success === true) {
        alert("User registered successfully.");
        props.history.push("/login");
      } else {
        alert("Failed to register");
      }
    });
  };

  return (
    <div>
      <div className="container login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
