import { useState } from "react";
import { AddShopModal } from "./modals";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import useQuery from "../../hooks/query";
import OrdersSkeletal from "../orders/components/orders_skeletal";

export default function Expenses() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: shops, loading } = useQuery<any[]>({
    table: "vendor_shop",
    from: 0,
    to: 100,
    filter: `
      shops(
        id,
        name
      )
  `,
  });

  function dismiss() {
    setIsOpen(false);
  }

  // useMemo(() => {
  //   supabase
  //     .channel("todos")
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "shops" },
  //       async (data) => {
  //         setShops((prev) => [...prev, data.new]);
  //       }
  //     )
  //     .subscribe();
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses</IonTitle>
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
          {loading ? (
            <OrdersSkeletal />
          ) : (
            shops.map(({ shops: shop }, index: number) => (
              <IonItem
                button
                key={index}
                routerLink={`/tabs/expenses/${shop.id}`}
              >
                <IonLabel>{shop.name}</IonLabel>
              </IonItem>
            ))
          )}
        </IonItemGroup>
        <AddShopModal dismiss={dismiss} isOpen={isOpen} />
      </IonContent>
    </IonPage>
  );
}
