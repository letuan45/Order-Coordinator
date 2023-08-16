import React from "react";
import Modal from "./Modal";
import { Button, Typography } from "@material-tailwind/react";

const RemoveDataModal = ({ onClose, onAccept }) => {
  return (
    <Modal
      title="Xóa dữ liệu"
      size="xm"
      body={
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-center font-normal"
          >
            Bạn có muốn xóa dữ liệu này?
          </Typography>
          <div className="flex justify-center">
            <Button className="mt-2" onClick={onAccept}>
              Xác nhận
            </Button>
          </div>
        </div>
      }
      onClose={onClose}
    />
  );
};

export default RemoveDataModal;
