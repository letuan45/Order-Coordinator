import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  HomeModernIcon,
  UserIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { GetOrderDetailsService } from "@/service/OrderService";

const TABLE_HEAD = [
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Trọng lượng (kg)",
  "Số lượng",
];

const OrderDetailList = ({
  orderId,
  warehouse,
  employee,
  partner,
  addressString,
  customer,
  deliveryPrice,
}) => {
  const [renderItems, setRenderItems] = useState([]);

  const { getOrderDetailsRes, getOrderDetailIsLoading, getOrderDetailsErr } =
    GetOrderDetailsService(orderId);

  useEffect(() => {
    if (getOrderDetailsRes) {
      setRenderItems(getOrderDetailsRes);
    } else if (getOrderDetailsErr) {
      toast.error("Không lấy được danh sách chi tiết hóa đơn!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getOrderDetailsRes, getOrderDetailsErr]);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="group inline-flex flex-wrap items-center justify-between gap-3 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 inline-block font-semibold leading-none opacity-70"
          >
            Địa chỉ nhận: {addressString}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 inline-block font-semibold leading-none opacity-70"
          >
            Khách hàng: {customer.name}
          </Typography>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="group inline-flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex">
            {warehouse && (
              <>
                <Tooltip content="Kho đảm nhận" placement="top">
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
              </>
            )}
            {!warehouse && (
              <Typography
                variant="small"
                color="blue-gray"
                className="inline-block font-normal leading-none opacity-70"
              >
                Chưa có kho phụ trách
              </Typography>
            )}
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
            <>
              {partner && (
                <>
                  <Tooltip content="Đối tác vận chuyển" placement="top">
                    <IconButton className="rounded-full bg-red-600">
                      <BriefcaseIcon className="h-5 w-5 text-white" />
                    </IconButton>
                  </Tooltip>
                  <div className="ml-2 flex flex-col justify-center pr-2">
                    {partner && (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 inline-block font-semibold leading-none opacity-70"
                      >
                        {partner.name}
                      </Typography>
                    )}
                  </div>
                </>
              )}
              {!partner && (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="inline-block font-normal leading-none opacity-70"
                >
                  Chưa có đối tác vận chuyển
                </Typography>
              )}
            </>
          </div>
        </div>
      </Card>
      <Card className="h-72 overflow-auto">
        {getOrderDetailIsLoading && <LoadingSpinner />}
        {!getOrderDetailIsLoading && (
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
                      {item.id.product.id}
                    </Typography>
                  </td>
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
                      {item.amount}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      {deliveryPrice && (
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 inline-block text-right text-lg font-semibold leading-none opacity-70"
        >
          Phí vận chuyển:{" "}
          <span className="text-yellow-900">
            {deliveryPrice.toLocaleString()} VND
          </span>
        </Typography>
      )}
    </>
  );
};

export default OrderDetailList;
