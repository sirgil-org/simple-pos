import { useEffect, useState } from "react";
import { CustomAreaChart, ReportSkeletal } from "./components";

import { supabase } from "../../supabase_client";
import { toast } from "react-toastify";
import {
  IonCard,
  IonCardContent,
  IonContent,
} from "@ionic/react";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders]: any = useState([]);

  const timeUnitInterval = "hour";
  const minRangeDays = 10;
  const statusFilter = "ready";

  useEffect(() => {
    async function getOrders() {
      setLoading(true);
      
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
    <>
      <IonContent fullscreen>
        <div
          style={{ paddingTop: "env(safe-area-inset-top)" }}
          className="grid md:grid-cols-12 gap-4"
        >
          <div className="md:col-span-9">
          <CustomAreaChart data={orders} />
          {/* <ContainerComponent historicalData={orders} /> */}
          </div>
          <div>
            <IonCard>
              <IonCardContent>
                <div className="space-y-2">
                  <div className="p-2">
                    <div className="text-sm font-thin">Total Sales</div>
                    <div className="md:text-end text-2xl font-bold">
                      N$ 80.00
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="text-sm font-thin">Total Expenses</div>
                    <div className="md:text-end text-2xl font-bold">N$ 500</div>
                  </div>
                  <div className="p-2">
                    <div className="text-sm font-thin">Profits</div>
                    <div className="md:text-end text-2xl font-bold">
                      N$ 70.00
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <div className="mt-5 space-y-3">
                  <div className="p-2">
                    <div>Top Selling</div>
                    <div className="flex justify-between">
                      <div>Stenio</div>
                      <div>N$ 50.00</div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div>Highest Grossing</div>
                    <div className="flex justify-between">
                      <div>Hotspot</div>
                      <div>N$ 400.00</div>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </>
  );
}
