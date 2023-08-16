import React from "react";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ModalContent = (props) => {
  const body = document.querySelector("body");
  const modalSize = props.size;
  let width = "400px"; //xm
  if (modalSize === "sm") {
    width = "600px";
  } else if (modalSize === "md") {
    width = "800px";
  } else if (modalSize === "lg") {
    width = "1000px";
  }

  if (props.isConfirmation) {
    return (
      <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform">
        <Backdrop onClose={props.onClose} />
        <Card style={{ width: width }}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-16 flex-col place-items-center"
          >
            <Typography variant="h3" color="white">
              {props.title}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">{props.body}</CardBody>
          <CardFooter className="flex justify-end pt-0">
            <Button
              className="rounded-full bg-blue-gray-300"
              onClick={props.onClose}
            >
              Hủy
            </Button>
            <Button className="ml-4 rounded-full">Xác nhận</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform">
      <Backdrop onClose={props.onClose} />
      <Card style={{ width: width }}>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-16 flex-col place-items-center"
        >
          <Typography variant="h3" color="white">
            {props.title}
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">{props.body}</CardBody>
        {!props.hideCloseButton && (
          <CardFooter className="flex justify-end pt-0">
            <Button
              className="rounded-full bg-blue-gray-300"
              onClick={props.onClose}
            >
              Đóng
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalContent
          onClose={props.onClose}
          size={props.size}
          title={props.title}
          body={props.body}
          isConfirmation={props.isConfirmation}
          hideCloseButton={props.hideCloseButton}
        />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
