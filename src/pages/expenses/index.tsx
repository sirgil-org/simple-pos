import { useEffect, useState } from "react";
import { AddShopModal } from "./modals";
import { toast } from "react-toastify";
import { supabase } from "../../supabase_client";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

export default function Expenses() {
  const [shops, setExpenses]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function dismiss() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      const { data, error } = await supabase.from("shops").select(`
          id,
          name
      `);

      if (error) {
        toast.warn(error.message || "Could not fetch shops...");
      } else if (data) {
        setExpenses(data);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shops</IonTitle>
          <IonButtons collapse={true} slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <IonIcon icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Shops</IonTitle>
            <IonButtons collapse={true} slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
          <IonItemGroup>
            {shops.map((shop: any, index: any) => (
              <IonItem
                button
                key={index}
                routerLink={`/expenses/shops/${shop.id}`}
              >
                <IonLabel>{shop.name}</IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
          <AddShopModal dismiss={dismiss} isOpen={isOpen} />
      </IonContent>
    </>
  );
}
