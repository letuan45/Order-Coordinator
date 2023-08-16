import React, { useEffect, useState } from "react";
import { Typography, Chip } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import UpdatePartner from "./PartnerForm/UpdatePartner";
import DeliveryPrices from "./PartnerForm/DeliveryPrices";
import { RemovePartnerService } from "@/service/PartnerService";
import RemoveDataModal from "../UI/RemoveDataModal";
import { toast } from "react-toastify";

const PartnerItem = ({ item, afterUpdatePartner }) => {
  const [updatePartnerIsOpen, setUpdatePartnerIsOpen] = useState(false);
  const [deliveryPricesIsOpen, setDeliveryPricesIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);

  const {
    removePartnerRes,
    removePartnerError,
    removePartnerAction,
  } = RemovePartnerService();

  useEffect(() => {
    if (removePartnerError) {
      toast.error("Không thể xóa đối tác vận chuyển này!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removePartnerRes) {
      toast.success("Xóa đối tác thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdatePartner();
    }
  }, [removePartnerRes, removePartnerError]);

  const openUpdatePartnerHandler = () => {
    setUpdatePartnerIsOpen(true);
  };

  const closeUpdatePartnerHandler = () => {
    setUpdatePartnerIsOpen(false);
  };

  const openDeliveryPricesHandler = () => {
    setDeliveryPricesIsOpen(true);
  };

  const closeDeliveryPricesHandler = () => {
    setDeliveryPricesIsOpen(false);
  };

  const afterUpdatePartnerHandler = () => {
    afterUpdatePartner();
    closeUpdatePartnerHandler();
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removePartnerHandler = () => {
    removePartnerAction(item.id);
  };

  return (
    <tr>
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removePartnerHandler}
        />
      )}
      {deliveryPricesIsOpen && (
        <Modal
          title="Bảng giá vận chuyển"
          body={<DeliveryPrices partnerId={item.id} />}
          size="sm"
          onClose={closeDeliveryPricesHandler}
        />
      )}
      {updatePartnerIsOpen && (
        <Modal
          title="Cập nhật đối tác"
          body={
            <UpdatePartner
              partner={item}
              afterUpdatePartner={afterUpdatePartnerHandler}
            />
          }
          size="sm"
          onClose={closeUpdatePartnerHandler}
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
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Chip
          value={item.active ? "Hoạt động" : "Ngừng hoạt động"}
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
              openUpdatePartnerHandler();
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
            openDeliveryPricesHandler();
            // openUpdatePartnerHandler();
          }}
        >
          Xem hoặc điều chỉnh
        </Typography>
      </td>
    </tr>
  );
};

export default PartnerItem;
