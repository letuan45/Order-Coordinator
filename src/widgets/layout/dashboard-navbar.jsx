import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useSelector } from "react-redux";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const user = useSelector((state) => state.auth.user);
  let role = null;
  if (user) {
    role = user.role;
  }
  let isEmployee = null;
  if (role) {
    isEmployee = role.name === "USER";
  }

  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  let [layout, page] = pathname.split("/").filter((el) => el !== "");
  if (page === "employee") {
    page = "Nhân viên";
  } else if (page === "home") {
    page = "Trang chủ";
  } else if (page === "warehouse") {
    page = "Kho";
  } else if (page === "product") {
    page = "Sản phẩm";
  } else if (page === "receipt") {
    page = "Nhập hàng";
  } else if (page === "partner") {
    page = "Đối tác vận chuyển";
  } else if (page === "stock") {
    page = "Tồn kho";
  } else if (page === "order") {
    page = "Điều phối đơn hàng";
  } else if (page === "supplier") {
    page = "Nhà cung cấp";
  } else if (page === "customer") {
    page = "Khách hàng";
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className="transition-al sticky top-4 z-10 rounded-xl bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 py-3 shadow-md shadow-blue-gray-500/5"
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal text-white opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal text-white"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray" className="text-white">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography
            variant="h5"
            color="blue"
            size="md"
            icon={
              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-white content-['']" />
            }
          >
            {isEmployee ? (
              <Chip
                color="indigo"
                value="NHÂN VIÊN"
                icon={
                  <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-white content-['']" />
                }
              />
            ) : (
              <Chip
                color="teal"
                value="ADMIN"
                icon={
                  <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                }
              />
            )}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 text-white xl:flex"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-blue-gray-300" />
              Đăng xuất
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
