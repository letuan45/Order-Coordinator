import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Pagination } from "@/components/UI/Pagination";
import ProductList from "@/components/Product/ProductList";
import { GetProduct } from "@/service/ProductService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/UI/Modal";
import AddNewProduct from "@/components/Product/ProductForm/AddNewProduct";

const Product = () => {
  const [renderProducts, setRenderProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [addProductIsOpen, setAddProductIsOpen] = useState(false);
  const [currenPage, setCurrenPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const {
    getProductsResponse,
    getProductsIsLoading,
    getProductsError,
    reloadProducts,
  } = GetProduct(searchKeyword, currenPage, 5);

  useEffect(() => {
    if (getProductsError) {
      toast.error("Không lấy được danh sách sản phẩm !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getProductsResponse) {
      setRenderProducts(getProductsResponse.content);
      setTotalPage(getProductsResponse.totalPages);
    }
  }, [getProductsResponse, getProductsError]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
    reloadProducts();
  }, [searchKeyword]);

  const onChangeKeyword = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const onChangePageHandler = (page) => {
    setCurrenPage(page);
    reloadProducts();
  };

  const openAddProductHandler = () => {
    setAddProductIsOpen(true);
  };

  const closeAddProductHandler = () => {
    setAddProductIsOpen(false);
  };

  const afterAddNewProductHandler = () => {
    reloadProducts();
    closeAddProductHandler();
  };

  const afterUpdateProductHandler = () => {
    reloadProducts();
  };

  const afterChangeStatusHandler = () => {
    reloadProducts();
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {addProductIsOpen && (
        <Modal
          title="Thêm sản phẩm"
          body={
            <AddNewProduct afterAddNewProduct={afterAddNewProductHandler} />
          }
          size="xm"
          onClose={closeAddProductHandler}
        />
      )}
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Danh sách sản phẩm
          </Typography>
          <div className="flex">
            <div className="mr-4 w-72 rounded-md bg-white">
              <Input
                placeholder="Nhập tên sản phẩm"
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
              onClick={openAddProductHandler}
            >
              <FolderPlusIcon className="h-4 w-4 text-blue-500" />
              Thêm mới
            </Button>
          </div>
        </CardHeader>
        <CardBody className="h-80 p-4">
          {getProductsIsLoading && <LoadingSpinner height="100" width="100" />}
          <ProductList
            items={renderProducts}
            afterUpdateProduct={afterUpdateProductHandler}
            afterChangeStatus={afterChangeStatusHandler}
          />
        </CardBody>
        {!getProductsIsLoading && renderProducts.length > 0 && (
          <CardFooter className="mt-2 flex items-center justify-between border-t border-blue-gray-50 p-4">
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

export default Product;
