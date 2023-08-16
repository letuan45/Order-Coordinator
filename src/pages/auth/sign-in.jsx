import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import ForgetPass from "./ForgetPass";


export function SignIn() {
   let data = [
    {
      label: "Đăng nhập",
      value: "login",
      desc: <LoginForm/>,
    },
    {
      label: "Quên mật khẩu",
      value: "forget",
      desc: <ForgetPass/>,
    },
  ];

  return (
    <>
      <img
        src="https://wallpaperaccess.com/full/2308917.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-5 gap-5">
          <Card className="col-span-3 p-10">
            <Typography
              variant="h1"
              color="blue"
              textGradient
              className="text-center"
            >
              <p className="mb-4 text-black">Phần mềm điều phối đơn hàng</p>
              <div className="grid grid-cols-2">
                <Card
                  color="blue"
                  variant="gradient"
                  className="col-span-1 w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      ADMIN
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý nhân viên
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý tài khoản truy cập
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý danh mục kho
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                <Card
                  color="blue"
                  variant="gradient"
                  className="col-span-1 w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      Nhân viên
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý danh mục sản phẩm
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý danh mục đối tác
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quản lý tồn kho, nhập kho
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Điều phối đơn hàng tự động
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </Typography>
          </Card>
          <Card className="col-span-2 pt-2">
            <Tabs id="custom-animation" value="login">
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 pb-2"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-4 border-blue-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
}

export default SignIn;
