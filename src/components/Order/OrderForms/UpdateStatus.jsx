import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import {
  CancelOrderService,
  ConfirmOrderService,
} from "@/service/OrderService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const UpdateStatus = ({ item, afterUpdateStatus }) => {
  const {
    confirmOrderResponse,
    confirmOrderError,
    confirmOrderIsLoading,
    confirmOrderAction,
  } = ConfirmOrderService();

  const {
    cancelOrderResponse,
    cancelOrderError,
    cancelOrderIsLoading,
    cancelOrderAction,
  } = CancelOrderService();

  useEffect(() => {
    if (cancelOrderResponse) {
      toast.success("Hủy đơn hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateStatus();
    } else if (cancelOrderError) {
      toast.error("Hủy đơn hàng thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [cancelOrderResponse, cancelOrderError]);

  useEffect(() => {
    if (confirmOrderResponse) {
      toast.success("Xác nhận hoàn tất đơn hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateStatus();
    } else if (confirmOrderError) {
      toast.error(confirmOrderError.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [confirmOrderResponse, confirmOrderError]);

  const confirmOrderHandler = () => {
    confirmOrderAction(item.id);
  };

  const cancelOrderHandler = () => {
    cancelOrderAction(item.id);
  }

  return (
    <>
      <div className="flex justify-center">
        {item.status !== 1 && (
          <Button className="mr-4" onClick={confirmOrderHandler}>
            Xác nhận hoàn thành
          </Button>
        )}
        <Button color="red" onClick={cancelOrderHandler}>
          Hủy đơn hàng
        </Button>
      </div>
      {(confirmOrderIsLoading || cancelOrderIsLoading) && <LoadingSpinner />}
      <Typography variant="small" color="black" className="text-center italic">
        <span className="font-semibold">Lưu ý: </span>Khi hoàn tất đơn hàng hoặc
        hủy đơn hàng, bạn không thể thay đổi trạng thái được nữa.
      </Typography>
    </>
  );
};

export default UpdateStatus;
