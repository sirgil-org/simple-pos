import { IonInput } from "@ionic/react";
import { Spinner } from "flowbite-react";

type IOrderSummaryProps = {
  order: object;
  totalCost: number;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => Promise<void>;
  savingOrder: boolean;
  inputRef: React.MutableRefObject<HTMLIonInputElement>;
};

export default function OrderSummary({
  order,
  totalCost,
  inputValue,
  setInputValue,
  onSubmit,
  savingOrder,
  inputRef,
}: IOrderSummaryProps) {
  return (
    <div>
      <div className="flex justify-between text-3xl font-bold">
        <div>Total</div>
        <div>N$ {totalCost.toFixed(2)}</div>
      </div>

      <div className="my-6">
        <label
          htmlFor="amount"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Amount Paid
        </label>

        <IonInput
          id="amount"
          type="text"
          fill="outline"
          inputMode="decimal"
          autoFocus
          placeholder="0.00"
          ref={inputRef}
          autofocus
          onIonInput={(e) =>
            setInputValue(parseFloat(e.target.value.toString()))
          }
        />
        <div
          className={`text-end text-lg font-bold ${
            totalCost > inputValue ? "text-red-600" : "text-green-400"
          } ${Object.keys(order).length === 0 || !inputValue ? "invisible" : ""}`}
        >
          {(inputValue - totalCost).toFixed(2)}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-2 mb-5">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "del"].map(
          (item: string) => (
            <button
              key={item}
              onClick={() => {
                if (item === "del") {
                  return setInputValue(0);
                }

                if (inputValue[0] === "0" && item !== ".") {
                  return setInputValue(parseInt(item));
                }

                // if (
                //   item === "." &&
                //   Array.from(inputValue).indexOf(".") !== -1
                // ) {
                //   return;
                // }
                setInputValue(inputValue + parseInt(item));
              }}
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {item}
            </button>
          )
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={Object.keys(order).length === 0}
          onClick={onSubmit}
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {savingOrder ? <Spinner /> : "Place Order"}
        </button>
      </div>
    </div>
  );
}
