import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import ReceiptDetailsList from "./ReceiptDetailsList";

const ReceiptItem = ({ item }) => {
  const [receiptDetailsIsOpen, setReceiptDetailIsOpen] = useState(false);
  const dates = item.date.split("-");
  const year = dates[0];
  const month = dates[1];
  const day = dates[2];

  return (
    <tr>
      {receiptDetailsIsOpen && (
        <Modal
          title={`Chi tiết phiếu nhập #${item.id}`}
          body={
            <ReceiptDetailsList
              receiptId={item.id}
              warehouse={item.warehouse}
              employee={item.employee}
              supplier={item.supplier}
            />
          }
          size="md"
          onClose={() => {
            setReceiptDetailIsOpen(false);
          }}
        />
      )}
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.id}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {day + "/" + month + "/" + year}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.totalPrice.toLocaleString()}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.employee.fullName}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.supplier.name}
        </Typography>
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
            setReceiptDetailIsOpen(true);
          }}
        >
          Xem
        </Typography>
      </td>
    </tr>
  );
};

export default ReceiptItem;
