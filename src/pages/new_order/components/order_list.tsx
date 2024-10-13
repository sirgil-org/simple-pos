import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
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
        const item = products.find((product: any) => product.id === key);
        return (
          <div key={item.id} className="flex justify-between mb-2">
            <div className="flex space-x-4 items-center">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-100">
                {order[key]}
              </div>
              <div>{item?.title}</div>
            </div>

            <div className="flex items-center space-x-2">
              <div>N$ {item.price * order[key]}</div>
              <IonIcon
                icon={trashOutline}
                onClick={() => {
                  setOrder((prev: any) => {
                    delete prev[key];

                    calculate_total({ ...prev });
                    return { ...prev };
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
