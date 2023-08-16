import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import StockList from "@/components/Stock/StockList";
import { GetWarehousePaginate } from "@/service/WarehouseService";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Pagination } from "@/components/UI/Pagination";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const Stock = () => {
  const [renderItems, setRenderItems] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    getWarehouseRes,
    getWarehouseIsLoading,
    getWarehouseErr,
    reloadWarehouse,
  } = GetWarehousePaginate(searchKeyword, currenPage, 3);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadWarehouse();
  }, [searchKeyword]);

  useEffect(() => {
    if (getWarehouseErr) {
      toast.error("Không lấy được danh sách kho !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getWarehouseRes) {
      setRenderItems(getWarehouseRes.content);
      setTotalPage(getWarehouseRes.totalPages);
    }
  }, [getWarehouseRes, getWarehouseErr]);

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadWarehouse();
  };

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.squarespace-cdn.com/content/v1/624254183b018337ece5eb0b/fb84b4cf-ee9d-49df-96a6-5bb292e335c7/Mastercast+background+images.png)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="-mt-40 mb-6 h-full lg:mx-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tồn kho
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Theo dõi tồn kho từ các chi nhánh kho
              </Typography>
            </div>
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
                className="focus:!border-t-blue !border !border-blue-gray-300 bg-white text-blue-gray-500 shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="h-76 px-0 pt-0">
          {getWarehouseIsLoading && <LoadingSpinner height="100" width="100" />}
          {!getWarehouseIsLoading && renderItems && (
            <StockList items={renderItems} />
          )}
        </CardBody>

        {!getWarehouseIsLoading && renderItems.length > 0 && (
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
};

export default Stock;
