import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { INewOrder, IProduct } from "../../../types";

interface IOrderListProps {
  products: IProduct[];
  order: INewOrder;
  calculate_total: (orders: any) => void;
  setOrder: React.Dispatch<React.SetStateAction<INewOrder>>;
}

export default function OrderList({
  products,
  order,
  calculate_total,
  setOrder,
}: IOrderListProps) {
  return (
    <div>
      {Object.keys(order).map((key) => {
        const item = products.find((product) => product.id === key);
        return (
          <div key={item.id} className="flex justify-between mb-2">
            <div className="flex space-x-4 items-center">
              <div className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-100">
                {order[key]}
              </div>
              <div>{item?.title}</div>
            </div>

            <div className="flex items-center space-x-2">
              <div>N$ {(item.price * order[key]).toFixed(2)}</div>
              <IonIcon
                icon={trashOutline}
                onClick={() => {
                  setOrder((prev) => {
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
