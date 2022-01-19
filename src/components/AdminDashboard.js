import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_baseUrl;
const imageUrl = process.env.REACT_APP_imageUrl;

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState();
  const [data, setData] = useState({ title: "", description: "", image: "" });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let admin = JSON.parse(localStorage.getItem("admin"));

  const Auth = "Bearer ".concat(admin.adminToken);

  const getBlogs = () => {
    Axios.get(`${baseUrl}/getData`, {
      headers: { Authorization: Auth },
    }).then((result) => {
      setBlogs(result.data.data);
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const addBlog = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: data.title,
      description: data.description,
      image: data.image[0].name,
    };
    Axios.post(`${baseUrl}/addData`, postData, {
      headers: { Authorization: Auth },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="blog-list">
      <Button className="primary m-3" onClick={addBlog}>
        Add Blog
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Blog Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Likes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>
                <img src={`${imageUrl}/` + blog.image} alt="No preview" />{" "}
              </td>
              <td>{blog.totalLikes}</td>
              <td>
                {blog.published === "1" ? (
                  <Button>Unpublish</Button>
                ) : (
                  <Button>Publish</Button>
                )}
              </td>
              <td>
                <Button variant="info" className="m-2">
                  Edit Blog
                </Button>
                <Button variant="danger">Delete Blog</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                name="title"
                value={data.value}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description"
                name="description"
                value={data.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Choose image for your blog</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                name="image"
                onChange={handleChangeImage}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
