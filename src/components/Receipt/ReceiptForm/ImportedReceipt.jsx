import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import NoData from "@/components/UI/NoData";

const TABLE_HEAD = [
  "STT",
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Số lượng nhập",
  "Giá",
];

const ImportedReceipt = ({ items, supplier, warehouse }) => {
  if (items.length === 0) {
    return <NoData />;
  }
  const totalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.item.amount * item.price,
    0
  );

  return (
    <>
      <div className="flex">
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-4 font-semibold italic leading-none opacity-70"
        >
          Tên kho: <span className="font-normal">{warehouse.name}</span>
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="my-4 ml-4 font-semibold italic leading-none opacity-70"
        >
          Nhà cung cấp: <span className="font-normal">{supplier.name}</span>
        </Typography>
      </div>
      <Card className="mt-1 h-64 w-full overflow-auto">
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
            {items.map((item, index) => (
              <tr key={item.item.productId}>
                <td className="border-b border-blue-gray-50 py-3 px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.item.productId}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.name}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.item.amount}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 py-3 px-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.price.toLocaleString()}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default ImportedReceipt;
