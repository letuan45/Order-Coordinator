import React, { useState, useEffect} from "react";
import { Typography } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import UpdateSupplierForm from "./SupplierForm/UpdateSupplierForm";
import RemoveDataModal from "../UI/RemoveDataModal";
import { RemoveSupplierService } from "@/service/SupplierService";
import { toast } from "react-toastify";

const SupplierItem = ({ item, afterUpdateSupplier }) => {
  const [updateSupplierIsOpen, setUpdateSupplierIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);

  const {
    removeSupplierRes,
    removeSupplierErr,
    removeSupplierAction,
  } = RemoveSupplierService();

  useEffect(() => {
    if (removeSupplierErr) {
      toast.error(removeSupplierErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removeSupplierRes) {
      toast.success("Xóa nhà cung cấp thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateSupplier();
    }
  }, [removeSupplierRes, removeSupplierErr]);

  const openUpdateSupplier = () => {
    setUpdateSupplierIsOpen(true);
  };

  const closeUpdateSupplier = () => {
    setUpdateSupplierIsOpen(false);
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removeSupplierHandler = () => {
    removeSupplierAction(item.id);
  };

  return (
    <tr>
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removeSupplierHandler}
        />
      )}
      {updateSupplierIsOpen && (
        <Modal
          title="Cập nhật nhà cung cấp"
          body={
            <UpdateSupplierForm
              supplier={item}
              afterUpdateSupplier={() => {
                afterUpdateSupplier();
                closeUpdateSupplier();
              }}
            />
          }
          size="xm"
          onClose={closeUpdateSupplier}
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
          {item.phone}
        </Typography>
      </td>
      <td className="flex border-b border-blue-gray-50 py-3 px-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={(e) => {
            e.preventDefault();
            openUpdateSupplier();
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
      </td>
    </tr>
  );
};

export default SupplierItem;
