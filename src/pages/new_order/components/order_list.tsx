import { LuTrash } from "react-icons/lu";

export default function OrderList({
  products,
  order,
  calculate_total,
  setOrder,
}: any) {
  return (
    <div>
      {Object.keys(order).map((key: any) => {
        const item = products.find((product: any) => product.sku === key);
        return (
          <div key={item.sku} className="flex justify-between mb-2">
            <div className="flex space-x-4 items-center">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-secondary ">
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
  );
}
