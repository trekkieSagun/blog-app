import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_baseUrl;
const imageUrl = process.env.REACT_APP_imageUrl;

const AdminDashboard = (props) => {
  const [blogs, setBlogs] = useState();
  const [data, setData] = useState({ title: "", description: "", image: "" });

  const [editMode, setEditMode] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let admin = JSON.parse(localStorage.getItem("admin"));

  const Auth = "Bearer ".concat(admin.adminToken);

  const getBlogs = async () => {
    const response = await Axios.get(`${baseUrl}/getData`, {
      headers: { Authorization: Auth },
    });
    if (response.status === 200) {
      setBlogs(response.data.data.reverse());
    }
  };

  const getOneBlog = async (id) => {
    const response = await Axios.get(`${baseUrl}/getData/${id}`, {
      headers: { Authorization: Auth },
    });

    console.log(response);

    if (response.status === 200) {
      // setData(response.data.data());
      console.log(response);
    }
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);

    Axios.post(`${baseUrl}/addData`, formData, {
      headers: { Authorization: Auth },
    }).then((response) => {
      if (response.status === 200) {
        getBlogs();
        setShow(false);
        alert("New blog added successfully");
      }
    });
  };

  const handleUpdateClick = (id) => {
    // setEditMode(true);
    // setShow(true);
    getOneBlog(id);
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
            <tr key={index}>
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
                <Button
                  variant="info"
                  className="m-2"
                  onClick={handleUpdateClick(blog.id)}
                >
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
