import React, { useEffect, useState } from "react";
import { Card, Typography, Tooltip, IconButton } from "@material-tailwind/react";
import { GetReceiptDetailsService } from "@/service/ReceiptService";
import { toast } from "react-toastify";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  HomeModernIcon,
  UserIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = [
  "Tên sản phẩm",
  "Trọng lượng (kg)",
  "Giá (VND)",
  "Số lượng",
  "Đơn giá (VND)",
];

const ReceiptDetailsList = ({ receiptId, warehouse, employee, supplier }) => {
  const [renderItems, setRenderItems] = useState([]);
  const {
    getReceiptDetailsRes,
    getReceiptDetailsIsLoading,
    getReceiptDetailsErr,
  } = GetReceiptDetailsService(receiptId);

  useEffect(() => {
    if (getReceiptDetailsRes) {
      setRenderItems(getReceiptDetailsRes);
    } else if (getReceiptDetailsErr) {
      toast.error("Không lấy được danh sách chi tiết phiếu nhập !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getReceiptDetailsRes, getReceiptDetailsErr]);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="group inline-flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex">
            <Tooltip content="Kho" placement="top">
              <IconButton className="rounded-full">
                <HomeModernIcon className="h-5 w-5 text-white" />
              </IconButton>
            </Tooltip>
            <div className="ml-2 flex flex-col justify-center pr-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 inline-block font-semibold leading-none opacity-70"
              >
                {warehouse.name}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="inline-block font-normal leading-none opacity-70"
              >
                Địa chỉ: {warehouse.additionAddress}
              </Typography>
            </div>
          </div>
          <div className="flex">
            <Tooltip content="Nhân viên nhập" placement="top">
              <IconButton className="rounded-full bg-green-500">
                <UserIcon className="h-5 w-5 text-white" />
              </IconButton>
            </Tooltip>
            <div className="ml-2 flex flex-col justify-center pr-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 inline-block font-semibold leading-none opacity-70"
              >
                {employee.fullName}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="inline-block font-normal leading-none opacity-70"
              >
                Email: {employee.email}
              </Typography>
            </div>
          </div>
          <div className="flex">
            <Tooltip content="Nhà cung cấp" placement="top">
              <IconButton className="rounded-full bg-red-600">
                <BriefcaseIcon className="h-5 w-5 text-white" />
              </IconButton>
            </Tooltip>
            <div className="ml-2 flex flex-col justify-center pr-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 inline-block font-semibold leading-none opacity-70"
              >
                {supplier.name}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="inline-block font-normal leading-none opacity-70"
              >
                SĐT: {supplier.phone}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
      <Card className="h-72 overflow-auto">
        {getReceiptDetailsIsLoading && <LoadingSpinner />}
        {!getReceiptDetailsIsLoading && (
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
              {renderItems.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.id.product.name}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.id.product.weight}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.id.product.price.toLocaleString()}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.amount}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {(item.id.product.price * item.amount).toLocaleString()}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
};

export default ReceiptDetailsList;
