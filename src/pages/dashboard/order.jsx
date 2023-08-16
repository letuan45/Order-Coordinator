import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  FolderPlusIcon,
  DocumentArrowUpIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/UI/Modal";
import AddOrder from "@/components/Order/OrderForms/AddOrder";
import { GetOrdersService } from "@/service/OrderService";
import { toast } from "react-toastify";
import { Pagination } from "@/components/UI/Pagination";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import OrderList from "@/components/Order/OrderList";
import CoordinateForm from "@/components/Order/OrderForms/CoordinateForm";
import Datepicker from "@/components/UI/Datepicker";

function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const Order = ({ isForAnalyze }) => {
  const [addOrderIsOpen, setAddOrderIsOpen] = useState(false);
  const [coordinateOrderIsOpen, setCoordinateOrderIsOpen] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [choosenItems, setChoosenItems] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const {
    getOrdersResponse,
    getOrdersIsLoading,
    getOrdersError,
    reloadOrders,
  } = GetOrdersService(
    currenPage,
    5,
    startDate ? formatDateToString(startDate) : null,
    endDate ? formatDateToString(endDate) : null
  );

  useEffect(() => {
    if (!startDate && !endDate) return;
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) return;
    reloadOrders();
  }, [startDate, endDate]);

  useEffect(() => {
    if (getOrdersResponse) {
      if (isForAnalyze) {
        const data = [...getOrdersResponse.content];
        setRenderItems(data.filter(item => item.status === 3 || item.status === 2));
        setTotalPage(getOrdersResponse.totalPages);
        return;
      }
      setRenderItems(getOrdersResponse.content);
      setTotalPage(getOrdersResponse.totalPages);
    } else if (getOrdersError) {
      toast.error("Không lấy được danh sách đơn hàng!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getOrdersResponse, getOrdersError]);

  const closeCoordinateOrderHandler = () => {
    setCoordinateOrderIsOpen(false);
  };

  const openCoordinateOrderHandler = () => {
    setCoordinateOrderIsOpen(true);
  };

  const openAddOrderHandler = () => {
    setAddOrderIsOpen(true);
  };

  const closeAddOrderHandler = () => {
    setAddOrderIsOpen(false);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadOrders();
  };

  const afterCreateOrderHandlers = () => {
    reloadOrders();
    closeAddOrderHandler();
  };

  const onChooseHandler = ({ id }) => {
    const choosenArr = [...choosenItems];
    if (choosenArr.includes(id)) {
      setChoosenItems(choosenArr.filter((item) => item !== id));
    } else {
      setChoosenItems([...choosenItems, id]);
    }
  };

  const afterCoordinateHandler = () => {
    reloadOrders();
    setChoosenItems([]);
    closeCoordinateOrderHandler();
  };

  const afterUpdateStatusHandler = () => {
    reloadOrders();
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    reloadOrders();
  };

  return (
    <div
      className={`${!isForAnalyze ? "mt-12" : ""} mb-8 flex flex-col gap-12`}
    >
      {addOrderIsOpen && (
        <Modal
          title="Tạo đơn hàng"
          size="md"
          body={<AddOrder afterCreateOrder={afterCreateOrderHandlers} />}
          onClose={closeAddOrderHandler}
        />
      )}
      {coordinateOrderIsOpen && (
        <Modal
          title="Điều phối đơn hàng"
          size="lg"
          body={
            <CoordinateForm
              afterCoordinate={afterCoordinateHandler}
              coordinateString={choosenItems.sort((a, b) => a - b).join(",")}
            />
          }
          onClose={closeCoordinateOrderHandler}
          hideCloseButton
        />
      )}
      <Card className={isForAnalyze ? "shadow-none" : ""}>
        {!isForAnalyze && (
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-2 flex justify-between overflow-visible p-6"
          >
            <Typography variant="h6" color="white">
              Danh sách đơn hàng
            </Typography>
            <div className="flex">
              {!isForAnalyze && (
                <div className="flex">
                  <div className="h-10 w-40">
                    <Datepicker
                      label="Từ ngày"
                      date={startDate}
                      onDateChange={(data) => {
                        setStartDate(data);
                      }}
                    />
                  </div>
                  <div className="ml-4 mr-6 h-10 w-40">
                    <Datepicker
                      label="Đến ngày"
                      date={endDate}
                      onDateChange={(data) => {
                        setEndDate(data);
                      }}
                    />
                  </div>
                  <Button
                    className="flex items-center gap-3 mr-4"
                    color="white"
                    size="sm"
                    onClick={resetDates}
                  >
                    <XCircleIcon className="h-5 w-5 text-blue-500" />
                    Bỏ lọc
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    color="white"
                    size="sm"
                    onClick={openAddOrderHandler}
                  >
                    <FolderPlusIcon className="h-4 w-4 text-blue-500" />
                    Thêm mới
                  </Button>
                  <Button
                    className="ml-4 flex items-center gap-3"
                    color="white"
                    size="sm"
                    disabled={choosenItems.length === 0}
                    onClick={openCoordinateOrderHandler}
                  >
                    <DocumentArrowUpIcon className="h-4 w-4 text-green-700" />
                    Điều phối về kho
                  </Button>
                </div>
              )}
              <Button
                className="ml-4 flex items-center gap-3"
                color="white"
                size="sm"
                onClick={reloadOrders}
              >
                <ArrowPathIcon className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          </CardHeader>
        )}
        <CardBody
          className="p-4"
          style={{ height: isForAnalyze ? "auto" : "27rem" }}
        >
          {getOrdersIsLoading && <LoadingSpinner />}
          {!getOrdersIsLoading && (
            <OrderList
              items={renderItems}
              onChoose={onChooseHandler}
              choosenItems={choosenItems}
              afterUpdateStatus={afterUpdateStatusHandler}
              isForAnalyze={isForAnalyze}
            />
          )}
        </CardBody>
        {!getOrdersIsLoading && renderItems.length > 0 && (
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

export default Order;
