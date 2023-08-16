import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";

const SubmitStep = ({ coordinateString, onSubmit }) => {
  return (
    <Card
      className="mx-auto bg-blue-gray-200 py-4 px-10 mb-6"
      style={{ width: "35rem" }}
    >
      <Typography
        variant="h3"
        color="blue-gray"
        className="border-b-2 pb-3 text-center"
      >
        Xác nhận điều phối đơn hàng
      </Typography>
      <Typography
        variant="small"
        color="blue-gray"
        className="pt-2 text-center text-lg"
      >
        Xác nhận điều phối đơn hàng có id:{" "}
        <span className="text-blue font-semibold">{coordinateString}</span> về
        kho?
      </Typography>
      <div className="mt-4 flex justify-center">
        <Button onClick={onSubmit}>Xác nhận</Button>
      </div>
    </Card>
  );
};

export default SubmitStep;
