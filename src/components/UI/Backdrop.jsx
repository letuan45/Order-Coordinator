import ReactDOM from "react-dom";
import React from "react";

const BackdropContent = (props) => {
  const classes = `backdrop-brightness-50 z-20 fixed top-0 left-0 w-full h-screen backdrop-blur-md`;

  return <div className={classes} onClick={props.onClose} />;
};

const Backdrop = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackdropContent onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
};

export default Backdrop;
