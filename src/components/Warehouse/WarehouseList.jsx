import React from "react";
import NoData from "../UI/NoData";
import { Card, Typography } from "@material-tailwind/react";
import WarehouseItem from "./WarehouseItem";

const TABLE_HEAD = [
  "Id",
  "Tên kho",
  "Quận/Huyện",
  "Tỉnh",
  "Vùng miền",
  "Địa chỉ chi tiết",
  "Tình trạng",
  "Tương tác",
  "Nhân viên",
];

const WarehouseList = ({ items, afterUpdateWarehouse }) => {
  if (!items || items.length === 0) {
    return <NoData />;
  }

  const afterUpdateWarehouseHandler = () => {
    afterUpdateWarehouse();
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
            <WarehouseItem
              key={item.id}
              item={item}
              afterUpdateWarehouse={afterUpdateWarehouseHandler}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default WarehouseList;
