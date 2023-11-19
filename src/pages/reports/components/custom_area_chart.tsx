// import React, { useRef, useState } from "react";
// import { Line } from 'react-chartjs-2';
// import 'chartjs-plugin-zoom';

// export default function CustomAreaChart({ data }) {
//   // console.log('----------- ', newDateRange, '-------', startIndex, '+++++++++', endIndex)

//   const formatDate = (dateString) => {
//     // You can use a library like `date-fns` for more advanced date formatting
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   return (

//   );
// }

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  zoomPlugin
);

export const options = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        tooltipFormat: "YYYY-MM-DD HH:mm",
        displayFormats: {
          day: "dd/M",
          millisecond: "HH:mm:ss.SSS",
          second: "HH:mm:ss",
          minute: "HH:mm",
          hour: "dd/M HH:mm",
        },
        unit: "hour",
      },
      ticks: {
        display: true,
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0,
        // maxTicksLimit: 5,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: true,
      },
    },
    // to remove the y-axis labels
    y: {
      position: "right",
      // min: 0,
      // max: 1500,

      ticks: {
        display: true,
        beginAtZero: true,
        // stepSize: 1,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: true,
      },
    },
  },
  plugins: {
    title: {
      display: false,
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
      pan: {
        enabled: true,
        mode: "x",
        threshold: 5,
      },
      animation: {
        duration: 1000,
        easing: "easeOutCubic",
      },
      limits: {
        y: { min: 0, max: 100 },
        y2: { min: -5, max: 5 },
      },
    },
  },
};

export default function CustomAreaChart({ data }) {
  const getStackedData = (data) => {
    return {
      labels: data.map((item) => item.period),
      datasets: [
        {
          fill: true,
          label: "Dataset 2",
          data: data.map((item) => item.total_sales),
          borderColor: "#EF6335",
          backgroundColor: "#7B1013",
        },
      ],
    };
  };
  return (
    <Line height={"300px"} options={options} data={getStackedData(data)} />
  );
}
