import React, { useEffect, useState } from "react";
import { Card, Typography, Chip } from "@material-tailwind/react";
import { Pagination } from "../UI/Pagination";
import { GetEmployeesByWarehose } from "@/service/EmployeeService";
import NoData from "../UI/NoData";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Họ và tên", "Email", "Giới tính", "Trạng thái"];

const EmployeeFKList = ({ warehouseId }) => {
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [renderEmployees, setRenderEmployees] = useState([]);

  const {
    employeesWHResponse,
    employeesWHIsLoading,
    employeesWHError,
    reloadEmployeesWH,
  } = GetEmployeesByWarehose(warehouseId, currenPage);

  useEffect(() => {
    if (employeesWHResponse) {
      setRenderEmployees(employeesWHResponse.content);
      setTotalPage(employeesWHResponse.totalPages);
    } else if (employeesWHError) {
      toast.error("Lấy thông tin nhân viên của kho thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [employeesWHResponse, employeesWHError]);

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadEmployeesWH();
  };

  return (
    <>
      {!employeesWHIsLoading && renderEmployees.length === 0 && <NoData />}
      <Card className="overflow-hidden">
        {!employeesWHIsLoading && renderEmployees.length > 0 && (
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
              {renderEmployees.map((item) => (
                <tr key={item.id}>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.fullName}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.email}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.gender ? "Nam" : "Nữ"}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Chip
                      value={item.active ? "Đang làm" : "Đã nghỉ"}
                      color={item.active ? "green" : "blue-gray"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      {!employeesWHIsLoading && renderEmployees.length > 0 && (
        <div>
          <Pagination pageSize={totalPage} onChangePage={onChangePageHandler} />
        </div>
      )}
    </>
  );
};

export default EmployeeFKList;
