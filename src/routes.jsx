import {
  HomeIcon,
  UserCircleIcon,
  HomeModernIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  BriefcaseIcon,
  InboxStackIcon,
  PaperAirplaneIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Home, Warehouse, Employee, Customer } from "@/pages/dashboard";
import Product from "./pages/dashboard/product";
import Partner from "./pages/dashboard/partner";
import Stock from "./pages/dashboard/stock";
import Order from "./pages/dashboard/order";
import { SignIn } from "./pages/auth";
import ReceiptPage from "./pages/dashboard/receipt";
import SupplierPage from "./pages/dashboard/supplier";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Trang chủ",
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    title: "Admin",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Nhân viên/Tài khoản",
        path: "/employee",
        element: <Employee />,
      },
      {
        icon: <HomeModernIcon {...icon} />,
        name: "Kho",
        path: "/warehouse",
        element: <Warehouse />,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Nhà cung cấp",
        path: "/supplier",
        element: <SupplierPage />,
      },
    ],
  },
  {
    title: "Displaynone",
    layout: "auth",
    pages: [
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "Đăng nhập",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    title: "nhân viên",
    layout: "dashboard",
    pages: [
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "Sản phẩm",
        path: "/product",
        element: <Product />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "Nhập hàng",
        path: "/receipt",
        element: <ReceiptPage />,
      },
      {
        icon: <InboxStackIcon {...icon} />,
        name: "Tồn kho",
        path: "/stock",
        element: <Stock />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Đối tác vận chuyển",
        path: "/partner",
        element: <Partner />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Khách hàng",
        path: "/customer",
        element: <Customer />,
      },
      {
        icon: <PaperAirplaneIcon {...icon} />,
        name: "Điều phối đơn hàng",
        path: "/order",
        element: <Order />,
      },
    ],
  },
];

export default routes;
