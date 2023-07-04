import React from "react";
import { Card } from "react-bootstrap";
import "../styles/formAddEducationLevel.css";

const FormAddEducationLevel = () => {
  return (
    <Card style={{ width: "100%", height: "auto" }}>
      <Card.Body>
        <div className="title-add-education">Form Pendidikan</div>
        <hr></hr>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(form);
          }}
        >
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default FormAddEducationLevel;
