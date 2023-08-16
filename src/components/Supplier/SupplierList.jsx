import React from "react";
import NoData from "../UI/NoData";
import { Typography, Card } from "@material-tailwind/react";
import SupplierItem from "./SupplierItem";

const TABLE_HEAD = [
  "Mã nhà cung cấp",
  "Tên nhà cung cấp",
  "Số điện thoại",
  "Tương tác",
];

const SupplierList = ({ items, afterUpdateSupplier }) => {
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
            <SupplierItem
              afterUpdateSupplier={afterUpdateSupplier}
              key={item.id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default SupplierList;
