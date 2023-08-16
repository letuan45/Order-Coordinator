import { DisableProduct, ReactiveProduct } from "@/service/ProductService";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const ChangeStatus = ({ productId, isActive, afterChangeStatus }) => {
  const { disableProductResponse, disableProductError, disableProductAction } =
    DisableProduct();

  const {
    reactiveProductResponse,
    reactiveProductError,
    reactiveProductAction,
  } = ReactiveProduct();

  useEffect(() => {
    if (disableProductResponse) {
      toast.success("Vô hiệu sản phẩm thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterChangeStatus();
    } else if (disableProductError) {
      toast.error(disableProductError.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [disableProductResponse, disableProductError]);

  useEffect(() => {
    if (reactiveProductResponse) {
      toast.success("Kích hoạt sản phẩm thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterChangeStatus();
    } else if (reactiveProductError) {
      toast.error(reactiveProductError.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [reactiveProductResponse, reactiveProductError]);

  const disableProductHandler = () => {
    disableProductAction({productId: productId});
  };

  const reactiveProductHandler = () => {
    reactiveProductAction({ productId: productId });
  }

  if (!isActive) {
    return (
      <div>
        <Typography variant="h5" className="mb-2 text-center">
          Bạn có muốn kích hoạt sản phẩm?
        </Typography>
        <div className="flex justify-center">
          <Button onClick={reactiveProductHandler}>Xác nhận</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" className="mb-2 text-center">
        Bạn có muốn vô hiệu sản phẩm?
      </Typography>
      <div className="flex justify-center">
        <Button onClick={disableProductHandler}>Xác nhận</Button>
      </div>
    </div>
  );
};

export default ChangeStatus;
