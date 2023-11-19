import moment from "moment";
import { useEffect, useState } from "react";
import { AddExpenseModal } from "../modals";
import { toast } from "react-toastify";
import { supabase } from "../../../supabase_client";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

export default function ShopsPage(props) {
  const [expenses, setExpenses]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function dismiss() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function getOrders() {
      setLoading(true);

      const { data, error } = await supabase
        .from("expenses")
        .select(
          `
            id,
            invoice_number,
            amount,
            created_at
      `
        )
        .eq("shop_id", props.match.params.id);

      if (error) {
        toast.warn(error.message || "Could not fetch expenses...");
      } else if (data) {
        setExpenses(data);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shops</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/expenses" />
          </IonButtons>
          <IonButtons collapse={true} slot="end">
            <IonButton onClick={() => setIsOpen(true)}>
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
              <IonButton onClick={() => setIsOpen(true)}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItemGroup>
          {expenses.map((expense: any, index: any) => (
            <IonItem button key={index} detail={false}>
              <IonLabel>
                <div>Invoice #{expense.invoice_number}</div>
                <div className="text-sm">
                  {moment(expense.created_at).format("Do MMMM YYYY, h:mm a")}
                </div>
              </IonLabel>
              <IonNote slot="end">
                <div>N$ {expense.amount}</div>
              </IonNote>
            </IonItem>
          ))}
        </IonItemGroup>
        <AddExpenseModal dismiss={dismiss} isOpen={isOpen} />
      </IonContent>
    </IonPage>
  );
}
