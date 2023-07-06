import React from "react";
import "./styles/buttonPrimary.css";
const buttonPrimary = ({ title, onClick, icon }) => {
  return (
    <button className="button-10" role="button" onClick={onClick}>
      <div className="button-type">
        {icon} {title}
      </div>
    </button>
  );
};

export default buttonPrimary;
