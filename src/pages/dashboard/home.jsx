import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BanknotesIcon,
  UserIcon,
  CircleStackIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { projectsTableData, ordersOverviewData } from "@/data";
import {
  GetCardDataService,
  GetChartDataService,
} from "@/service/AnalyzeService";
import { toast } from "react-toastify";
import { chartsConfig } from "@/configs";
import OrderList from "@/components/Order/OrderList";
import Order from "./order";

const innitialStatisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Tổng nhập hàng năm nay",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "0",
      label: "phiếu nhập tháng này",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Tổng nhân sự",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "0",
      label: "nhân sự có tài khoản",
    },
  },
  {
    color: "green",
    icon: ClipboardDocumentIcon,
    title: "Lượng đơn hàng",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "0",
      label: "đơn đã điều phối",
    },
  },
  {
    color: "orange",
    icon: CircleStackIcon,
    title: "Tổng tồn kho",
    value: "0",
    footer: {
      color: "text-orange-500",
      value: "0",
      label: "chi nhánh kho hoạt động",
    },
  },
];

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Lượng tăng",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Lượng xuất",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    },
  },
};

const completedTasksChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Lượng tồn",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "smooth",
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
    },
  },
};

const statisticsChartsData = [
  {
    color: "blue",
    title: "Tồn kho tăng trong tuần",
    description: "Lượng tồn kho tăng tại các chi nhánh",
    footer: "dữ liệu cập nhật 2 phút trước",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Tồn kho xuất đi trong tuần",
    description: "Dữ liệu dựa trên các đơn hàng hoàn tất",
    footer: "dữ liệu cập nhật 5 phút trước",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Số đơn hàng được điều phối trong năm",
    description: "Thống kê cuối tháng trong năm",
    footer: "dữ liệu cập nhật 4 phút trước",
    chart: completedTasksChart,
  },
];

export function Home() {
  const [cardData, setCardData] = useState(innitialStatisticsCardsData);
  const [chartData, setChartData] = useState(statisticsChartsData);
  const [numberOfCoordinated, setNumberOfCoordinated] = useState(0);

  const { getCardDataResponse, getCardDataIsLoading, getCardDataError } =
    GetCardDataService();

  const { getChartDataResponse, getChartDataIsLoading, getChartDataError } =
    GetChartDataService();

  useEffect(() => {
    if (getChartDataError) {
      toast.error("Lấy data thống kê thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getChartDataResponse) {
      let chartData = [...statisticsChartsData];
      chartData = getChartDataResponse.map((item, index) => {
        if (index === 0) {
          return {
            color: "blue",
            title: "Tồn kho tăng trong tuần",
            description: "Lượng tồn kho tăng tại các chi nhánh",
            footer: "Dữ liệu thống kê trong tuần hiện tại",
            chart: {
              ...websiteViewsChart,
              series: [
                {
                  name: "Lượng tăng",
                  data: item.data,
                },
              ],
            },
          };
        }
        if (index === 1) {
          return {
            color: "pink",
            title: "Tồn kho xuất đi trong tuần",
            description: "Dữ liệu dựa trên các đơn hàng hoàn tất",
            footer: "Dữ liệu thống kê trong tuần hiện tại",
            chart: {
              ...dailySalesChart,
              series: [
                {
                  name: "Lượng xuất",
                  data: item.data,
                },
              ],
            },
          };
        }
        if (index === 2) {
          return {
            color: "green",
            title: "Số đơn hàng được điều phối trong năm",
            description: "Thống kê cuối tháng trong năm",
            footer: "Dữ liệu thống kê các tháng trong năm",
            chart: {
              ...completedTasksChart,
              series: [
                {
                  name: "Số đơn hàng",
                  data: item.data,
                },
              ],
            },
          };
        }
      });

      setChartData(chartData);
    }
  }, [getChartDataResponse, getChartDataError]);

  useEffect(() => {
    if (getCardDataError) {
      toast.error("Lấy data thống kê thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getCardDataResponse) {
      let innitialData = [...innitialStatisticsCardsData];
      innitialData = innitialData.map((item, index) => {
        let label = "";
        let value = "";
        let color = "";
        if (index === 0) {
          label = "phiếu nhập tháng này";
          value = "+" + getCardDataResponse[index].addition + "";
          color = "text-blue-500";
        } else if (index === 1) {
          label = "nhân sự có tài khoản";
          value = getCardDataResponse[index].addition + "";
          color = "text-red-500";
        } else if (index === 2) {
          label = "đơn đã điều phối";
          value = "+" + getCardDataResponse[index].addition + "";
          setNumberOfCoordinated(value);
          color = "text-green-500";
        } else if (index === 3) {
          label = "chi nhánh kho hoạt động";
          value = getCardDataResponse[index].addition + "";
          color = "text-orange-500";
        }

        return {
          ...item,
          value: getCardDataResponse[index].total + "",
          footer: {
            color: color,
            value: value,
            label: label,
          },
        };
      });

      setCardData(innitialData);
    }
  }, [getCardDataResponse, getCardDataError]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {cardData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {chartData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Các đơn hàng đã điều phối về kho
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>{numberOfCoordinated} đơn hàng</strong> đã điều về kho
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <Order isForAnalyze/>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Quy trình điều phối đơn hàng
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>Quy trình</strong> tuân thủ các bước:
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
