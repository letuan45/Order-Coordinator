import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FolderPlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Modal from "../UI/Modal";
import NewReceiptForm from "./ReceiptForm/NewReceiptForm";
import { GetReceiptService } from "@/service/ReceiptService";
import LoadingSpinner from "../UI/LoadingSpinner";
import ReceiptList from "./ReceiptList";
import { Pagination } from "../UI/Pagination";
import Datepicker from "../UI/Datepicker";

function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const Receipt = () => {
  const [addReceiptIsOpen, setAddReceiptIsOpen] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const {
    getReceiptResponse,
    getReceiptIsLoading,
    getReceiptError,
    reloadReceipt,
  } = GetReceiptService(
    currenPage,
    5,
    startDate ? formatDateToString(startDate) : null,
    endDate ? formatDateToString(endDate) : null
  );

  useEffect(() => {
    if (!startDate && !endDate) return;
    if ((startDate && endDate) && startDate.getTime() > endDate.getTime()) return;
    reloadReceipt();
  }, [startDate, endDate]);

  useEffect(() => {
    if (getReceiptResponse) {
      setRenderItems(getReceiptResponse.content);
      setTotalPage(getReceiptResponse.totalPages);
    } else if (getReceiptError) {
      toast.error("Không lấy được danh sách phiếu nhập!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getReceiptResponse, getReceiptError]);

  const openAddReceiptHandler = () => {
    setAddReceiptIsOpen(true);
  };

  const closeAddReceiptHandler = () => {
    setAddReceiptIsOpen(false);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadReceipt();
  };

  const afterCreateReceiptHandler = () => {
    reloadReceipt();
    closeAddReceiptHandler();
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    reloadReceipt();
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {addReceiptIsOpen && (
        <Modal
          title="Tạo phiếu nhập hàng"
          size="md"
          body={
            <NewReceiptForm afterCreateReceipt={afterCreateReceiptHandler} />
          }
          onClose={closeAddReceiptHandler}
        />
      )}
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 flex justify-between overflow-visible p-6"
        >
          <Typography variant="h6" color="white">
            Danh sách phiếu nhập
          </Typography>
          <div className="flex">
            <div className="h-10">
              <Datepicker
                label="Từ ngày"
                date={startDate}
                onDateChange={(data) => {
                  setStartDate(data);
                }}
              />
            </div>
            <div className="ml-4 h-10">
              <Datepicker
                label="Đến ngày"
                date={endDate}
                onDateChange={(data) => {
                  setEndDate(data);
                }}
              />
            </div>
            <Button
              className="ml-6 flex items-center gap-3"
              color="white"
              size="sm"
              onClick={resetDates}
            >
              <XCircleIcon className="h-5 w-5 text-blue-500" />
              Bỏ lọc
            </Button>
            <Button
              className="ml-4 flex items-center gap-3"
              color="white"
              size="sm"
              onClick={openAddReceiptHandler}
            >
              <FolderPlusIcon className="h-4 w-4 text-blue-500" />
              Thêm mới
            </Button>
          </div>
        </CardHeader>
        <CardBody className="h-80 p-4">
          {getReceiptIsLoading && <LoadingSpinner />}
          {!getReceiptIsLoading && <ReceiptList items={renderItems} />}
        </CardBody>
        {!getReceiptIsLoading && renderItems.length > 0 && (
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

export default Receipt;
