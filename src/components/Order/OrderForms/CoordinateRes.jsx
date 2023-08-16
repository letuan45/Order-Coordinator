import React from "react";
import { Typography, Card, Chip, Button } from "@material-tailwind/react";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const TABLE_HEAD = [
  "Mã đơn hàng",
  "Ngày tạo",
  "Đối tác",
  "Nhân viên tạo",
  "Kho phụ trách",
  "Tình trạng",
];

const CoordinateRes = ({ isLoading, coordinatedOrders, afterCoordinate }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Card className="h-80 overflow-auto">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-3 text-center font-normal leading-none opacity-70"
        >
          Kết quả điều phối đơn hàng
        </Typography>
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
            {coordinatedOrders.map((item) => {
              const date = item.date.split("-");
              const year = date[0];
              const month = date[1];
              const day = date[2];

              return (
                <tr key={item.id}>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.id}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {day + "/" + month + "/" + year}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    {item.partner && (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.partner.name}
                      </Typography>
                    )}
                    {!item.partner && (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Không có
                      </Typography>
                    )}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.employee.fullName}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.deliveryWarehouse === null && "Không có"}
                      {item.deliveryWarehouse !== null &&
                        item.deliveryWarehouse.name}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    {item.status === 1 && (
                      <Chip color="amber" value="Chờ xác nhận" />
                    )}
                    {item.status === 2 && (
                      <Chip color="indigo" value="Đã điều phối" />
                    )}
                    {item.status === 3 && (
                      <Chip color="green" value="Hoàn tất" />
                    )}
                    {item.status === 4 && <Chip color="red" value="Đã hủy" />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-end mt-3">
        <Button onClick={afterCoordinate}>Đóng</Button>
      </div>
    </>
  );
};

export default CoordinateRes;
