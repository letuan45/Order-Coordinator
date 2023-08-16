import React from "react";
import NoData from "../UI/NoData";
import { Card, Typography } from "@material-tailwind/react";
import CustomerItem from "./CustomerItem";

const TABLE_HEAD = [
  "Mã khách hàng",
  "Tên khách hàng",
  "Email",
  "Số điện thoại",
  "Thao tác",
];

const CustomerList = ({ items, afterUpdateAction }) => {
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
            <CustomerItem
              item={item}
              key={item.id}
              afterUpdateAction={afterUpdateAction}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default CustomerList;
