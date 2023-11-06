import { useEffect, useState } from "react";
import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";
import { NewOrderSkeletal } from "./components";

import { LuTrash } from "react-icons/lu";
import { Spinner } from "flowbite-react";

export default function NewOrder() {
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [products, setProducts]: any = useState([]);

  const [order, setOrder]: any = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("products").select();

    if (error) {
      toast.warn(error.message || "Could not fetch orders...");
    } else if (data) {
      setProducts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    setSavingOrder(true);
    const { data: existing_orders }: any = await supabase
      .from("orders")
      .select("order_number")
      .order("order_number", { ascending: false });

    let new_order_number = 1;

    // no orders on system
    if (existing_orders.length > 0) {
      new_order_number = existing_orders[0].order_number + 1;
    }

    const { data: new_order }: any = await supabase
      .from("orders")
      .insert({
        order_number: new_order_number,
        phone_number: "in store",
        catalog: "in store",
        status: "waiting",
      })
      .select();

    let total_cost = 0;

    const { error }: any = await supabase.from("product_order").insert(
      Object.keys(order).map((key: any) => {
        const item = products.find((product: any) => product.sku === key);
        total_cost += item.price * order[key];

        return {
          order_id: new_order[0].id,
          sku: key,
          quantity: order[key],
          price: item?.price,
        };
      })
    );

    await supabase.from("payments").insert({
      order_id: new_order[0].id,
      amount_paid: inputValue,
      change: inputValue - total_cost,
    });

    setOrder([]);
    setTotalCost(0);
    setInputValue(0);

    setSavingOrder(false);

    if (error) {
      return toast.error(error.msg || "Could not create order...");
    }

    toast.success("Order created...");
  };

  const calculate_total = (orders: any) => {
    let total_cost = 0;
    Object.keys(orders).forEach((key: any) => {
      const item = products.find((product: any) => product.sku === key);
      total_cost += item.price * orders[key];
    });

    setTotalCost(total_cost);
  };

  if (loading) {
    return <NewOrderSkeletal />;
  }

  return (
    <div className="flex space-x-4 grow">
      <div>
        <div className="grid grid-cols-4 gap-2">
          {products.map((product: any) => {
            return (
              <div>
                <img
                  key={product.sku}
                  src={product.image_url}
                  onClick={() => {
                    setOrder((prev: any) => {
                      const old_count = order[product.sku];

                      const new_data = {
                        ...prev,
                        [product.sku]: old_count > 0 ? old_count + 1 : 1,
                      };

                      calculate_total(new_data);
                      return new_data;
                    });
                  }}
                  className="cursor-pointer"
                />
                <div>
                  <div>{product.title}</div>
                  <div>N$ {product.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="min-w-[350px] flex flex-col">
        <div className="grow">
          {Object.keys(order).map((key: any) => {
            const item = products.find((product: any) => product.sku === key);
            return (
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4 items-center">
                  <div className="flex items-center justify-center rounded-full h-[30px] w-[30px] bg-gray-400">
                    {order[key]}
                  </div>
                  <div>{item?.title}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setOrder((prev: any) => {
                        delete prev[key];

                        calculate_total({ ...prev });
                        return { ...prev };
                      });
                    }}
                  >
                    <LuTrash />
                  </div>
                  <div>N$ {item.price * order[key]}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-yellow-300 rounded-md p-3 mb-5">
          <div className="flex justify-between text-3xl font-bold">
            <div>Total</div>
            <div>N$ {totalCost}</div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount paid
            </label>
            <input
              type="number"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e: any) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <div
              className={`text-end text-lg font-bold ${
                totalCost > inputValue ? "text-red-600" : "text-green-400"
              } ${Object.keys(order).length === 0 ? "invisible" : ""}`}
            >
              {inputValue - totalCost}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={
                Object.keys(order).length === 0 || totalCost > inputValue
              }
              onClick={onSubmit}
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {savingOrder ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
