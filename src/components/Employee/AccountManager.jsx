import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import RegisterForm from "./AccountForms/RegisterForm";
import UpdateAccountForm from "./AccountForms/UpdateAccountForm";
import GrantAccount from "./AccountForms/GrantAccount";

const AccountManager = ({ employeeId, afterRegisterAction, afterChangePassAction }) => {
  const data = [
    {
      label: "Tạo tài khoản",
      value: "register",
      desc: (
        <RegisterForm
          employeeId={employeeId}
          afterAction={afterRegisterAction}
        />
      ),
    },
    {
      label: "Chỉnh sửa",
      value: "modify",
      desc: (
        <UpdateAccountForm
          employeeId={employeeId}
          afterChangePassAction={afterChangePassAction}
        />
      ),
    },
    {
      label: "Phân quyền",
      value: "grant",
      desc: (
        <GrantAccount
          employeeId={employeeId}
          afterGrantAction={afterChangePassAction}
        />
      ),
    },
  ];

  return (
    <div>
      <Tabs value="register">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default AccountManager;
