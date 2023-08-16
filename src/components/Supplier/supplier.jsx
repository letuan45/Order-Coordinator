import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SupplierList from "./SupplierList";
import { GetSupplierService } from "@/service/SupplierService";
import { toast } from "react-toastify";
import { Pagination } from "../UI/Pagination";
import Modal from "../UI/Modal";
import AddSupplierForm from "./SupplierForm/AddSupplierForm";

const Supplier = () => {
  const [renderItems, setRenderItems] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const [addSupplierIsOpen, setAddSupplierIsOpen] = useState(false);

  const {
    getSupplierRes,
    getSupplierIsLoading,
    getSupplierError,
    reloadSupplier,
  } = GetSupplierService(searchKeyword, currenPage, 3);

  useEffect(() => {
    if (getSupplierRes) {
      setRenderItems(getSupplierRes.content);
      setTotalPage(getSupplierRes.totalPages);
    } else if (getSupplierError) {
      toast.error("Không lấy được danh sách nhà cung cấp !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getSupplierRes, getSupplierError]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadSupplier();
  }, [searchKeyword]);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadSupplier();
  };

  const openAddSupplierHandler = () => {
    setAddSupplierIsOpen(true);
  };

  const closeAddSupplierHandler = () => {
    setAddSupplierIsOpen(false);
  };

  const afterAddSupplierHandler = () => {
    reloadSupplier();
    closeAddSupplierHandler();
  };

  const afterUpdateHandler = () => {
    reloadSupplier();
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {addSupplierIsOpen && (
        <Modal
          title="Thêm nhà cung cấp"
          body={<AddSupplierForm afterAddSupplier={afterAddSupplierHandler} />}
          size="xm"
          onClose={closeAddSupplierHandler}
        />
      )}
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Danh sách nhà cung cấp
          </Typography>
          <div className="flex">
            <div className="mr-4 w-72 rounded-md bg-white">
              <Input
                placeholder="Nhập tên nhà cung cấp"
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
              color="white"
              size="sm"
              onClick={openAddSupplierHandler}
            >
              <FolderPlusIcon className="h-4 w-4 text-blue-500" />
              Thêm mới
            </Button>
          </div>
        </CardHeader>
        <CardBody className="h-56 p-4">
          <SupplierList
            items={renderItems}
            afterUpdateSupplier={afterUpdateHandler}
          />
        </CardBody>
        {!getSupplierIsLoading && renderItems.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Pagination
              pageSize={totalPage}
              onChangePage={onChangePageHandler}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Supplier;
