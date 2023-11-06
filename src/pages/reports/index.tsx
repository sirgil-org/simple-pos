import { useEffect, useState } from "react";
import { ReportSkeletal } from "./components";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders]: any = useState([]);

  const timeUnitInterval = "hour";
  const minRangeDays = 10;
  const statusFilter = "ready";

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      //   const { data, error } = await supabase.from("orders").select(`
      //         id,
      //         order_number,
      //         status,
      //         created_at,
      //         phone_number,
      //         product_order (
      //           sku,
      //           quantity,
      //           created_at,
      //           order_id,
      //           price,
      //           products (
      //             title
      //           )
      //         )
      //       `);

      // Call the function using a SQL query
      const { data, error } = await supabase.rpc(
        "calculate_sales_by_time_unit",
        {
          time_unit_interval: timeUnitInterval,
          min_range_days: minRangeDays,
          status_filter: statusFilter,
        }
      );

      if (error) {
        toast.warn(error.message || "Could not fetch orders...");
      } else if (data) {
        setOrders(data);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

  if (loading) {
    return <ReportSkeletal />;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={orders}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="total_sales"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            {/* <Line type="monotone" dataKey="pv" stroke="#387908" /> */}
            {/* <YAxis /> */}
            <Tooltip />
            <XAxis dataKey="period" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col min-w-[300px] col-span-3 justify-between mb-7">
        <div className="space-y-2">
          <div className="p-2 bg-blue-400">
            <div className="text-sm font-thin">Total Sales</div>
            <div className="text-end text-2xl font-bold">N$ 80.00</div>
          </div>
          <div className="p-2 bg-blue-400">
            <div className="text-sm font-thin">Total Expenses</div>
            <div className="text-end text-2xl font-bold">N$ 500</div>
          </div>
          <div className="p-2 bg-blue-400">
            <div className="text-sm font-thin">Profits</div>
            <div className="text-end text-2xl font-bold">N$ 70.00</div>
          </div>
        </div>
        <div className="bg-red-200 mt-5 space-y-3">
          <div className="p-2">
            <div>Top Selling</div>
            <div className="flex justify-between">
                <div>Stenio</div>
                <div>N$ 50.00</div>
            </div>
          </div>
          <hr />
          <div className="p-2">
            <div>Highest Grossing</div>
            <div className="flex justify-between">
                <div>Hotspot</div>
                <div>N$ 400.00</div>
            </div>
          </div>
        </div>
        {/* <ResponsiveContainer width={400} height={500}>
          <PieChart>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={120}
              outerRadius={160}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
}

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
