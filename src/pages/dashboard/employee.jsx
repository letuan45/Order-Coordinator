import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Pagination } from "@/components/UI/Pagination";
import EmployeeList from "@/components/Employee/EmployeeList";
import { toast } from "react-toastify";
import { GetEmployees, RemoveEmployeeService } from "@/service/EmployeeService";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Modal from "@/components/UI/Modal";
import NewEmployeeForm from "@/components/Employee/NewEmployeeForm";

export function Employee() {
  const [renderEmployees, setRenderEmployees] = useState([]);
  const [addEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    employeesResponse,
    employeesIsLoading,
    employeesError,
    reloadEmployees,
  } = GetEmployees(searchKeyword, currenPage, 5);

  useEffect(() => {
    if (employeesError) {
      toast.error("Không lấy được danh sách nhân viên !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (employeesResponse) {
      setRenderEmployees(employeesResponse.content);
      setTotalPage(employeesResponse.totalPages);
    }
  }, [employeesResponse, employeesError]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadEmployees();
  }, [searchKeyword]);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const openAddEmployeeHandler = () => {
    setAddEmployeeIsOpen(true);
  };

  const closeAddEmployeeHandler = () => {
    setAddEmployeeIsOpen(false);
  };

  const afterCreateHandler = () => {
    reloadEmployees();
    setAddEmployeeIsOpen(false);
  };

  const afterUpdateHandler = () => {
    reloadEmployees();
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadEmployees();
  };

  return (
    <>
      {addEmployeeIsOpen && (
        <Modal
          title="Thêm nhân viên"
          size="xm"
          body={
            <NewEmployeeForm createEmployeeAfterAction={afterCreateHandler} />
          }
          onClose={closeAddEmployeeHandler}
        />
      )}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://wallpaperaccess.com/full/7823414.jpg)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="-mt-40 mb-6 h-full lg:mx-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Nhân viên
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Quản lý các nhân viên của bạn
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="mr-4 w-72 rounded-md bg-white">
                <Input
                  placeholder="Nhập tên nhân viên"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={searchKeyword}
                  onChange={onChangeKeyword}
                  label="Input With Icon"
                  icon={<MagnifyingGlassIcon />}
                  className="!border !border-blue-gray-300 bg-white text-blue-gray-500 shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-white  focus:ring-blue-500/20"
                />
              </div>
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
                onClick={openAddEmployeeHandler}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="h-80 px-0 pt-0">
          {employeesIsLoading && <LoadingSpinner height="100" width="100" />}
          {!employeesIsLoading && (
            <EmployeeList
              items={renderEmployees}
              afterUpdateAction={afterUpdateHandler}
            />
          )}
        </CardBody>
        {!employeesIsLoading && renderEmployees.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Pagination
              pageSize={totalPage}
              onChangePage={onChangePageHandler}
            />
          </CardFooter>
        )}
      </Card>
    </>
  );
}

export default Employee;
