import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Pagination } from "@/components/UI/Pagination";
import { useEffect, useState } from "react";
import Modal from "@/components/UI/Modal";
import { GetCustomers } from "@/service/CustomerService";
import CustomerList from "@/components/Customer/CustomerList";
import NewCustomer from "@/components/Customer/CustomerForms/NewCustomer";

export function Customer() {
  const [renderItems, setRenderItems] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [newCustomerIsOpen, setNewCustomerIsOpen] = useState(false);

  const {
    getCustomersResponse,
    getCustomersIsLoading,
    getCustomersError,
    reloadCustomers,
  } = GetCustomers(searchKeyword, currenPage, 5);

  useEffect(() => {
    if (getCustomersResponse) {
      setRenderItems(getCustomersResponse.content);
      setTotalPage(getCustomersResponse.totalPages);
    } else if (getCustomersError) {
      toast.error("Không lấy được danh sách khách hàng!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getCustomersResponse, getCustomersError]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadCustomers();
  }, [searchKeyword]);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadCustomers();
  };

  const openAddCustomerHander = () => {
    setNewCustomerIsOpen(true);
  }

  const closeAddCustomerHander = () => {
    setNewCustomerIsOpen(false);
  }

  const afterCreateHandler = () => {
    reloadCustomers();
    closeAddCustomerHander();
  }

  const afterUpdateCustomerHandler = () => {
    reloadCustomers();
  }

  return (
    <>
      {newCustomerIsOpen && (
        <Modal
          title="Thêm khách hàng"
          body={<NewCustomer afterCreateAction={afterCreateHandler} />}
          size="xm"
          onClose={closeAddCustomerHander}
        />
      )}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://www.incimages.com/uploaded_files/image/1920x1080/getty_866149824_384020.jpg)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="-mt-40 mb-6 h-full lg:mx-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Khách hàng
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Quản lý thông tin khách hàng
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="mr-4 w-72 rounded-md bg-white">
                <Input
                  placeholder="Nhập tên khách hàng"
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
                onClick={openAddCustomerHander}
              >
                <FolderPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="h-80 px-4 pt-0">
          {getCustomersIsLoading && <LoadingSpinner height="100" width="100" />}
          {!getCustomersIsLoading && (
            <CustomerList
              afterUpdateAction={afterUpdateCustomerHandler}
              items={renderItems}
            />
          )}
        </CardBody>
        {!getCustomersIsLoading && renderItems.length > 0 && (
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

export default Customer;
