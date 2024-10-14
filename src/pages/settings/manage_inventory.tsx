import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import useQuery from "../../hooks/query";
import ManageInventoryModal from "./inventory.modal";

function ManageInventory() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: inventory,
    loading,
    refresh,
  } = useQuery<any[]>({
    table: "products",
    // from: 0,
    // to: 100,
    filter: `
        id, 
        title,
        price,
        image_url
    `,
  });

  return (
    <IonPage id="manage-inventory">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Settings</IonBackButton>
          </IonButtons>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset>
          <IonItem
            button
            color="light"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add to Stock
          </IonItem>
        </IonList>
        <IonList>
          {!loading &&
            inventory.map((product, index: number) => (
              <IonItem
                key={index}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsOpen(true);
                }}
              >
                <IonThumbnail aria-hidden="true" slot="start">
                  <img alt="" src={product.image_url} className="rounded-lg" />
                </IonThumbnail>
                <IonLabel>{product.title}</IonLabel>
                <IonNote>N$ {product.price.toFixed(2)}</IonNote>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
      <ManageInventoryModal
        refresh={refresh}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </IonPage>
  );
}

export default ManageInventory;
