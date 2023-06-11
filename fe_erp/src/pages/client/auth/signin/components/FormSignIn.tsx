import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormSigin = (props: any) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });


    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            props.onSubmit(formData)
        }} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label
          >Email address</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Enter email"
          name="email"
          onChange={e => setFormData({
            ...formData, ...{ email: e.target.value}
          })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
           type="password"
            placeholder="Password"
            name="password"
            onChange={e => setFormData({
                ...formData, ...{password: e.target.value}
            })}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}

export default FormSigin;

FormSigin.defaultProps = {
    onsubmit: () => {}
}