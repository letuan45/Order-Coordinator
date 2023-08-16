import React, { useState } from "react";
import NoData from "../UI/NoData";
import { Card, Typography } from "@material-tailwind/react";
import OrderItem from "./OrderItem";

const OrderList = ({
  items,
  onChoose,
  choosenItems,
  afterUpdateStatus,
  isForAnalyze,
}) => {
  let TABLE_HEAD = [
    "Mã đơn hàng",
    "Ngày tạo",
    "Đối tác",
    "Nhân viên tạo",
    "Kho phụ trách",
    "Tình trạng",
    "Chi tiết",
    "Chọn",
    "Trạng thái",
  ];
  if(isForAnalyze) {
    TABLE_HEAD = [
      "Mã đơn hàng",
      "Ngày tạo",
      "Đối tác",
      "Nhân viên tạo",
      "Kho phụ trách",
      "Tình trạng",
    ];
  }

  if (!items || items.length === 0) {
    return <NoData />;
  }

  const onChoooseHandler = ({ id, value }) => {
    onChoose({ id, value });
  };

  return (
    <Card className="overflow-hidden">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <OrderItem
              isForAnalyze={isForAnalyze}
              key={item.id}
              item={item}
              onChoose={onChoooseHandler}
              isChoosen={choosenItems.includes(item.id)}
              afterUpdateStatus={afterUpdateStatus}
            />
          ))}
          {/* {items.map((item) => (
            <ReceiptItem item={item} key={item.id} />
          ))} */}
        </tbody>
      </table>
    </Card>
  );
};

export default OrderList;
