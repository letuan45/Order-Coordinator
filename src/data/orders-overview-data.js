import {
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

export const ordersOverviewData = [
  {
    icon: BanknotesIcon,
    color: "text-blue-gray-900",
    title: "Tạo đơn hàng",
    description: "Tạo đơn hàng bằng cách import file excel",
  },
  {
    icon: BellIcon,
    color: "text-green-500",
    title: "Chọn ra các đơn hàng cần điều phối",
    description: 'Chọn mục "điều phối" và lựa chọn đơn hàng',
  },
  {
    icon: ShoppingCartIcon,
    color: "text-blue-500",
    title: "Với mỗi đơn hàng, hệ thống tự động đưa ra phương án điều phối",
    description: "Chọn ra các kho thỏa tồn kho so với đơn hàng",
  },
  {
    icon: PlusCircleIcon,
    color: "text-red-500",
    title: "Lựa chọn kho hàng",
    description: "Hệ thống tự động chọn kho hàng gần nhất",
  },
  {
    icon: CreditCardIcon,
    color: "text-orange-500",
    title: "Cập nhật đơn hàng hoàn tất",
    description: "Hệ thống sẽ trừ tồn với chi nhánh kho",
  },
  {
    icon: LockOpenIcon,
    color: "text-pink-500",
    title: "Hủy đơn hàng",
    description: "Bạn có thể hủy đơn hàng",
  },
];

export default ordersOverviewData;
