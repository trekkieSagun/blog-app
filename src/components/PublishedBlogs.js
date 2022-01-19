import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const baseUrl = process.env.REACT_APP_baseUrl;
const imageUrl = process.env.REACT_APP_imageUrl;

const PublishedBlogs = () => {
  const [blogs, setBlogs] = useState("");

  const getAllBlogs = () => {
    Axios.get(`${baseUrl}/get-published-blog`)
      .then((response) => {
        const allBlogs = response.data.data;

        setBlogs(allBlogs);
      })
      .catch(console.error("Error"));
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="container">
      <h1>All Blogs</h1>

      <div className="row">
        {blogs &&
          blogs.map((blog) => (
            <div className="col-md-4">
              <div className="blog-item">
                <img
                  className="img-fluid img-bordered"
                  src={`${imageUrl}/` + blog.image}
                  alt="No preview"
                />
                <div className="blog-info">
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {blog.totalLikes} people liked this.
                  </span>

                  <h1>{blog.title}</h1>
                  <p>{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PublishedBlogs;
