import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
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

  useMemo(() => {
    supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "expenses" },
        async (data) => {
          if (data.new.shop_id === props.match.params.id) {
            setExpenses((prev) => [...prev, data.new]);
          }
        }
      )
      .subscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses</IonTitle>
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
            <IonTitle size="large">Expenses</IonTitle>
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
                  {format(new Date(expense.created_at), "dd MMMM yyyy, h:mm a")}
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
