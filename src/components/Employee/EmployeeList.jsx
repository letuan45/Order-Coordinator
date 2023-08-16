import { Typography } from "@material-tailwind/react";
import React from "react";
import NoData from "../UI/Nodata";
import EmployeeItem from "./EmployeeItem";

const TABLE_HEAD = [
  "Họ và tên",
  "Email",
  "Ngày sinh",
  "Giới tính",
  "Tình trạng",
  "Kho",
  "Có tài khoản",
  "Tương tác",
  "Tài khoản"
];

const EmployeeList = ({ items, afterUpdateAction }) => {
  if (!items || items.length === 0) {
    return <NoData />;
  }

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
          <EmployeeItem
            key={item.id}
            item={item}
            afterUpdateAction={afterUpdateAction}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
