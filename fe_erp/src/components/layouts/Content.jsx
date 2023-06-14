import React from "react";

function Content({children}) {
  return (
    <>
      <div className="content-wrapper">
        {children}
      </div>
    </>
  );
}

export default Content;
