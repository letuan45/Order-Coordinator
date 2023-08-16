import React from "react";
import NoData from "../UI/NoData";
import { Card, Typography } from "@material-tailwind/react";
import ReceiptItem from "./ReceiptItem";

const TABLE_HEAD = [
  "Mã phiếu nhập",
  "Ngày tạo",
  "Tổng giá (VND)",
  "Nhân viên tạo",
  "Nhà cung cấp",
  "Chi tiết",
];

const ReceiptList = ({ items }) => {
  if (!items || items.length === 0) {
    return <NoData />;
  }
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
            <ReceiptItem item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ReceiptList;
