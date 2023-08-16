import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import WarehouseList from "@/components/Warehouse/WarehouseList";
import { useEffect, useState } from "react";
import { GetWarehousePaginate } from "@/service/WarehouseService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Pagination } from "@/components/UI/Pagination";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/UI/Modal";
import NewWarehouse from "@/components/Warehouse/WarehouseForms/NewWarehouse";

export function Warehouse() {
  const [renderWarehouses, setRenderWarehouses] = useState([]);
  const [addWarehouseIsOpen, setAddWarehouseIsOpen] = useState(false);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    getWarehouseRes,
    getWarehouseIsLoading,
    getWarehouseErr,
    reloadWarehouse,
  } = GetWarehousePaginate(searchKeyword, currenPage, 5);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadWarehouse();
  }, [searchKeyword]);

  useEffect(() => {
    if (getWarehouseRes) {
      setRenderWarehouses(getWarehouseRes.content);
      setTotalPage(getWarehouseRes.totalPages);
    } else if (getWarehouseErr) {
      toast.error("Không lấy được danh sách kho !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getWarehouseRes, getWarehouseErr]);

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadWarehouse();
  };

  const openAddWarehouseHandler = () => {
    setAddWarehouseIsOpen(true);
  };

  const closeAddWarehouseHandler = () => {
    setAddWarehouseIsOpen(false);
  };

  const afterCreateHandler = () => {
    reloadWarehouse();
    closeAddWarehouseHandler();
  };

  const afterUpdateWarehouseHandler = () => {
    reloadWarehouse();
  };

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {addWarehouseIsOpen && (
        <Modal
          title="Thêm kho"
          body={<NewWarehouse afterCreateAction={afterCreateHandler} />}
          size="xm"
          onClose={closeAddWarehouseHandler}
        />
      )}
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Danh sách các kho
          </Typography>
          <div className="flex">
            <div className="mr-4 w-72 rounded-md bg-white">
              <Input
                placeholder="Nhập tên kho"
                labelProps={{
                  className: "hidden",
                }}
                value={searchKeyword}
                onChange={onChangeKeyword}
                label="Input With Icon"
                icon={<MagnifyingGlassIcon />}
                className="!border !border-blue-gray-50 bg-white text-blue-gray-500 shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-white focus:!border-t-white focus:ring-offset-white"
              />
            </div>
            <Button
              className="flex items-center gap-3"
              color="white"
              size="sm"
              onClick={openAddWarehouseHandler}
            >
              <FolderPlusIcon className="h-4 w-4 text-black" />
              Thêm mới
            </Button>
          </div>
        </CardHeader>
        <CardBody className="h-80 p-4">
          {getWarehouseIsLoading && <LoadingSpinner height="100" width="100" />}
          <WarehouseList
            items={renderWarehouses}
            afterUpdateWarehouse={afterUpdateWarehouseHandler}
          />
        </CardBody>
        {!getWarehouseIsLoading && renderWarehouses.length > 0 && (
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
}

export default Warehouse;
