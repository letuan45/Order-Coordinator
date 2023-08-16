import React, { useState } from "react";
import { Typography, Chip, Checkbox } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import OrderDetailList from "./OrderDetailsList";
import UpdateStatus from "./OrderForms/UpdateStatus";
import { toast } from "react-toastify";

const OrderItem = ({
  item,
  onChoose,
  isChoosen,
  afterUpdateStatus,
  isForAnalyze,
}) => {
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);
  const [updateStatusIsOpen, setUpdateStatusIsOpen] = useState(false);
  const isAllowedChangeStatus = item.status === 2 || item.status === 1;

  const dates = item.date.split("-");
  const year = dates[0];
  const month = dates[1];
  const day = dates[2];

  const openUpdateStatusHandler = () => {
    if (!isAllowedChangeStatus) {
      toast.error("Không thể cập nhật trạng thái đơn hàng này!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setUpdateStatusIsOpen(true);
  };

  const closeUpdateStatusHandler = () => {
    setUpdateStatusIsOpen(false);
  };

  const afterUpdateStatusHandler = () => {
    closeUpdateStatusHandler();
    afterUpdateStatus();
  };

  const addressString =
    item.additionAddress +
    ", " +
    item.district.name +
    ", " +
    item.district.province.name +
    ", " + "Miền: " + item.district.province.region.name;

  return (
    <tr>
      {detailsIsOpen && (
        <Modal
          title={`Chi tiết đơn hàng #${item.id}`}
          body={
            <OrderDetailList
              orderId={item.id}
              warehouse={item.deliveryWarehouse}
              employee={item.employee}
              partner={item.partner}
              addressString={addressString}
              customer={item.customer}
              deliveryPrice={item.deliveryPrice}
            />
          }
          size="md"
          onClose={() => {
            setDetailsIsOpen(false);
          }}
        />
      )}
      {updateStatusIsOpen && (
        <Modal
          title="Cập nhật trạng thái"
          body={
            <UpdateStatus
              item={item}
              afterUpdateStatus={afterUpdateStatusHandler}
            />
          }
          size="xm"
          onClose={() => {
            closeUpdateStatusHandler(false);
          }}
        />
      )}
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="gray" className="font-normal">
          {item.id}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="gray" className="font-normal">
          {day + "/" + month + "/" + year}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        {item.partner && (
          <Typography variant="small" color="gray" className="font-normal">
            {item.partner.name}
          </Typography>
        )}
        {!item.partner && (
          <Typography variant="small" color="gray" className="font-semibold">
            Không có
          </Typography>
        )}
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="gray" className="font-normal">
          {item.employee.fullName}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        {item.deliveryWarehouse && (
          <Typography variant="small" color="blue" className="font-semibold">
            {item.deliveryWarehouse.name}
          </Typography>
        )}
        {!item.deliveryWarehouse && (
          <Typography variant="small" color="gray" className="font-semibold">
            Không có
          </Typography>
        )}
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        {item.status === 1 && <Chip color="amber" value="Chờ xác nhận" />}
        {item.status === 2 && <Chip color="indigo" value="Đã điều phối" />}
        {item.status === 3 && <Chip color="green" value="Hoàn tất" />}
        {item.status === 4 && <Chip color="red" value="Đã hủy" />}
      </td>
      {!isForAnalyze && (
        <>
          <td className="border-b border-blue-gray-50 py-3 px-4">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue"
              className="font-medium"
              onClick={(e) => {
                e.preventDefault();
                setDetailsIsOpen(true);
              }}
            >
              Xem
            </Typography>
          </td>
          <td className="border-b border-blue-gray-50 py-3 px-4">
            <Checkbox
              disabled={item.status !== 1}
              defaultChecked={isChoosen && item.status === 1}
              color="teal"
              onChange={(e) => {
                onChoose({ id: item.id });
              }}
              ripple={false}
              className={`h-6 w-6 rounded-full ${
                item.status === 1
                  ? "border-teal-500/50 bg-teal-500/25"
                  : "cursor-not-allowed border-gray-500/50 bg-gray-500/25"
              } transition-all hover:scale-105 hover:before:opacity-0`}
            />
          </td>
          <td className="border-b border-blue-gray-50 py-3 px-4">
            <Typography
              as="a"
              href="#"
              variant="small"
              color={`${isAllowedChangeStatus ? "blue" : "gray"}`}
              className="font-medium"
              onClick={(e) => {
                e.preventDefault();
                openUpdateStatusHandler();
              }}
            >
              Cập nhật
            </Typography>
          </td>
        </>
      )}
    </tr>
  );
};

export default OrderItem;
