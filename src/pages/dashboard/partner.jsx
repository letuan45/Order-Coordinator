import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  SquaresPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { GetPartners } from "@/service/PartnerService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import PartnerList from "@/components/Partner/PartnerList";
import { Pagination } from "@/components/UI/Pagination";
import Modal from "@/components/UI/Modal";
import NewPartner from "@/components/Partner/PartnerForm/NewPartner";

const Partner = () => {
  const [renderPartner, setRenderPartner] = useState([]);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [addNewPartnerIsOpen, setAddNewPartnerIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    getPartnersResponse,
    getPartnersIsLoading,
    getPartnerError,
    reloadPartner,
  } = GetPartners(searchKeyword, currenPage, 5);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadPartner();
  }, [searchKeyword]);

  useEffect(() => {
    if (getPartnersResponse) {
      setRenderPartner(getPartnersResponse.content);
      setTotalPage(getPartnersResponse.totalPages);
    } else if (getPartnerError) {
      toast.error("Không lấy được danh sách đối tác!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getPartnersResponse, getPartnerError]);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadPartner();
  };

  const openAddPartnerHandler = () => {
    setAddNewPartnerIsOpen(true);
  };

  const closeAddPartnerHandler = () => {
    setAddNewPartnerIsOpen(false);
  };

  const afterCreatePartnerHandler = () => {
    closeAddPartnerHandler();
    reloadPartner();
  }

  const afterUpdatePartnerHanlder = () => {
    reloadPartner();
  }

  return (
    <>
      {addNewPartnerIsOpen && (
        <Modal
          title="Thêm đối tác"
          body={<NewPartner afterCreateAction={afterCreatePartnerHandler} />}
          size="xm"
          onClose={closeAddPartnerHandler}
        />
      )}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6169668.jpg&fm=jpg)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="-mt-40 mb-6 h-full lg:mx-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Đối tác vận chuyển
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Quản lý đối tác vận chuyển
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="mr-4 w-72 rounded-md bg-white">
                <Input
                  placeholder="Nhập tên đối tác vận chuyển"
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
                onClick={openAddPartnerHandler}
              >
                <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="h-80 px-4 pt-0">
          {getPartnersIsLoading && <LoadingSpinner height="100" width="100" />}
          {!getPartnersIsLoading && (
            <PartnerList
              items={renderPartner}
              afterUpdatePartner={afterUpdatePartnerHanlder}
            />
          )}
        </CardBody>
        {!getPartnersIsLoading && renderPartner.length > 0 && (
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

export default Partner;
