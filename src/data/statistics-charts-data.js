import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Lượng tăng",
      data: [50, 20, 10, 22, 50, 10, 40],
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
      categories: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Lượng xuất",
      data: [50, 40, 300, 320, 500, 350, 400],
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
      categories: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    },
  },
};

const completedTasksChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Lượng tồn",
      data: [0, 40, 300, 220, 500, 250, 400, 300, 220, 500, 250, 400],
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

export const statisticsChartsData = [
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
    title: "Tồn kho trong năm",
    description: "Thống kê tồn kho cuối tháng trong năm",
    footer: "dữ liệu cập nhật 4 phút trước",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;