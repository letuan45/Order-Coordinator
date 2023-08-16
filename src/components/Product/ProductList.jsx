import { Typography, Card } from "@material-tailwind/react";
import NoData from "../UI/NoData";
import ProductItem from "./ProductItem";

const TABLE_HEAD = [
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Trọng lượng (kg)",
  "Giá (VND)",
  "Tình trạng",
  "Tương tác",
  "Đổi trạng thái"
];

const ProductList = ({ items, afterUpdateProduct, afterChangeStatus}) => {
  if (!items.length || items.length === 0) {
    return <NoData />;
  }

  return (
    <Card className="overflow-hidden">
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
          {items.map((item) => (
            <ProductItem
              key={item.id}
              item={item}
              afterUpdateProduct={afterUpdateProduct}
              afterChangeStatus={afterChangeStatus}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ProductList;
