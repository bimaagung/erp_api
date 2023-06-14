import React, { useState } from "react";
import {Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import example from '../../../../assets/img/example.webp'
import '../styles/FormLogin.css'

const FormSignin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="row">
      <div className="col-md-9">
        <img src={example} alt={"hero"} width="100%" height="100%" />
      </div>
      <div className="col-md-3">
        <div className="form-login">
          <h5>Welcome</h5>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(formData);
            }}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ email: e.target.value },
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ password: e.target.value },
                  })
                }
              />
            </Form.Group>

            <div className="d-grid gap-2 sign-button">
              <Button type="sumbit" variant="custome">
                sign in
              </Button>
            </div>
          </Form>
        </div>
        <div className="sign-up">
          <p>
            Don't Have account yet?
            <Link to="/register">
              <strong> Sign Up</strong>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSignin;
