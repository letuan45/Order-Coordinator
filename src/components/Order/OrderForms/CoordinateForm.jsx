import React, { useEffect, useState } from "react";
import SubmitStep from "./SubmitStep";
import CoordinateRes from "./CoordinateRes";
import { OrderCoordinateService } from "@/service/OrderService";
import { toast } from "react-toastify";
const CoordinateForm = ({ coordinateString, afterCoordinate }) => {
  const [step, setStep] = useState(1);
  const [coordinatedOrders, setCoordinatedOrders] = useState([]);
  const {
    orderCoordinateResponse,
    orderCoordinateError,
    orderCoordinateIsLoading,
    orderCoordinateAction,
  } = OrderCoordinateService();

  useEffect(() => {
    if (orderCoordinateResponse) {
      toast.success("Điều phối đơn hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setStep(2);
      setCoordinatedOrders(orderCoordinateResponse);
    } else if (orderCoordinateError) {
      toast.error("Điều phối đơn hàng thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [orderCoordinateResponse, orderCoordinateError]);

  const submitHandler = () => {
    orderCoordinateAction(coordinateString);
  };

  return (
    <div>
      {step === 1 && (
        <SubmitStep
          coordinateString={coordinateString}
          onSubmit={submitHandler}
        />
      )}
      {step === 2 && (
        <CoordinateRes
          afterCoordinate={afterCoordinate}
          isLoading={orderCoordinateIsLoading}
          coordinatedOrders={coordinatedOrders}
        />
      )}
    </div>
  );
};

export default CoordinateForm;
