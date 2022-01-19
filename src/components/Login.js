import Axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_baseUrl;

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });

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
      password: data.password,
    };
    Axios.post(`${baseUrl}/login`, postData).then((result) => {
      if (result.status === 200) {
        console.log(result);
        if (result.data.data.token) {
          let admin = {
            isAdmin: true,
            adminToken: result.data.data.token,
            adminName: result.data.data.name,
          };
          localStorage.setItem("admin", JSON.stringify(admin));

          alert("Logged in successfully");
          props.history.push("/adminDashboard");
        }
      } else {
        alert("Invalid username or password");
      }
    });
  };

  return (
    <div className="container login-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={data.value}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
