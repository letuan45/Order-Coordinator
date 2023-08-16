import React, { useEffect, useState } from "react";
import { Typography, Chip } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import UpdateProduct from "./ProductForm/UpdateProduct";
import ChangeStatus from "./ProductForm/ChangeStatus";
import RemoveDataModal from "../UI/RemoveDataModal";
import { RemoveProductService } from "@/service/ProductService";
import { toast } from "react-toastify";

const ProductItem = ({ item, afterUpdateProduct, afterChangeStatus }) => {
  const [updateProductIsOpen, setUpdateProductIsOpen] = useState(false);
  const [changeStatusIsOpen, setChangeStatusIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);
  const price = item.price.toLocaleString();

  const {
    removeProductRes,
    removeProductErr,
    removeProductAction,
  } = RemoveProductService();

  useEffect(() => {
    if (removeProductErr) {
      toast.error("Không thể xóa sản phẩm này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removeProductRes) {
      toast.success("Xóa sảm phẩm thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateProduct();
    }
  }, [removeProductRes, removeProductErr]);

  const openUpdateProductHandler = () => {
    setUpdateProductIsOpen(true);
  };

  const closeUpdateProductHandler = () => {
    setUpdateProductIsOpen(false);
  };

  const openChangeStatusHandler = () => {
    setChangeStatusIsOpen(true);
  };

  const closeChangeStatusHandler = () => {
    setChangeStatusIsOpen(false);
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removeProductHandler = () => {
    removeProductAction(item.id);
  };

  return (
    <tr>
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removeProductHandler}
        />
      )}
      {changeStatusIsOpen && (
        <Modal
          title={item.active ? "Vô hiệu sản phẩm" : "Kích hoạt sản phẩm"}
          body={
            <ChangeStatus
              isActive={item.active}
              productId={item.id}
              afterChangeStatus={() => {
                afterChangeStatus();
                closeChangeStatusHandler();
              }}
            />
          }
          size="xm"
          onClose={closeChangeStatusHandler}
        />
      )}
      {updateProductIsOpen && (
        <Modal
          title={`Sửa sản phẩm`}
          body={
            <UpdateProduct
              item={item}
              afterUpdateProduct={() => {
                afterUpdateProduct();
                closeUpdateProductHandler();
              }}
            />
          }
          size="xm"
          onClose={closeUpdateProductHandler}
        />
      )}
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.id}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.weight}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {price}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Chip
          value={item.active ? "Sẵn sàng" : "Ngừng giao dịch"}
          color={item.active ? "green" : "blue-gray"}
        />
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <div className="flex">
          <Typography
            as="a"
            href="#"
            variant="small"
            color="blue"
            className="font-medium"
            onClick={(e) => {
              e.preventDefault();
              openUpdateProductHandler();
            }}
          >
            Sửa
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="small"
            color="red"
            className="ml-4 font-medium"
            onClick={(e) => {
              e.preventDefault();
              setRemoveIsOpen(true);
            }}
          >
            Xóa
          </Typography>
        </div>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={(e) => {
            e.preventDefault();
            openChangeStatusHandler();
          }}
        >
          {item.active ? "Vô hiệu" : "Kích hoạt"}
        </Typography>
      </td>
    </tr>
  );
};

export default ProductItem;
