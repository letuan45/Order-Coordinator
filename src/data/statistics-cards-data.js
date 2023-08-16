import {
  BanknotesIcon,
  UserIcon,
  CircleStackIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Tổng nhập hàng năm nay",
    value: "1.000.000",
    footer: {
      color: "text-green-500",
      value: "+10",
      label: "phiếu nhập tháng này",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Tổng nhân sự",
    value: "2",
    footer: {
      color: "text-green-500",
      value: "2",
      label: "nhân sự có tài khoản",
    },
  },
  {
    color: "green",
    icon: ClipboardDocumentIcon,
    title: "Lượng đơn hàng",
    value: "3,462",
    footer: {
      color: "text-green-500",
      value: "100",
      label: "đơn đã điều phối",
    },
  },
  {
    color: "orange",
    icon: CircleStackIcon,
    title: "Tổng tồn kho",
    value: "103,430",
    footer: {
      color: "text-orange-500",
      value: "5",
      label: "chi nhánh kho hoạt động",
    },
  },
];

export default statisticsCardsData;
