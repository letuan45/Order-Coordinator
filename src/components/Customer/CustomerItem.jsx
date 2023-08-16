import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import UpdateCustomer from "./CustomerForms/UpdateCustomer";
import { RemoveCustomerService } from "@/service/CustomerService";
import RemoveDataModal from "../UI/RemoveDataModal";
import { toast } from "react-toastify";

const CustomerItem = ({ item, afterUpdateAction }) => {
  const [updateCustomerIsOpen, setUpdateCustomerIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);

  const {
    removeCustomerRes,
    removeCustomerError,
    removeCustomerAction,
  } = RemoveCustomerService();

  useEffect(() => {
    if (removeCustomerError) {
      toast.error("Không thể xóa khách hàng này!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removeCustomerRes) {
      toast.success("Xóa khách hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateAction();
    }
  }, [removeCustomerRes, removeCustomerError]);

  const openUpdateCustomer = () => {
    setUpdateCustomerIsOpen(true);
  };

  const closeUpdateCustomer = () => {
    setUpdateCustomerIsOpen(false);
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removeCustomerHander = () => {
    removeCustomerAction(item.id);
  };

  return (
    <tr>
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removeCustomerHander}
        />
      )}
      {updateCustomerIsOpen && (
        <Modal
          title="Cập nhật khách hàng"
          body={
            <UpdateCustomer
              item={item}
              afterUpdateAction={() => {
                afterUpdateAction();
                closeUpdateCustomer();
              }}
            />
          }
          size="xm"
          onClose={closeUpdateCustomer}
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
          {item.email}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.phone}
        </Typography>
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
              openUpdateCustomer();
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
    </tr>
  );
};

export default CustomerItem;
