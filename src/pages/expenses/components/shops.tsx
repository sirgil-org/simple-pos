import { format } from "date-fns";
import { useContext, useEffect, useMemo, useState } from "react";
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
import { IExpense } from "../../../types";
import { AuthContext } from "../../../contexts";

export default function ShopsPage(props) {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useContext(AuthContext);

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
        .eq("vendor_id", currentUser.id)
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

  // useMemo(() => {
  //   supabase
  //     .channel("todos")
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "expenses" },
  //       async (data) => {
  //         if (data.new.shop_id === props.match.params.id) {
  //           setExpenses((prev) => [...prev, data.new]);
  //         }
  //       }
  //     )
  //     .subscribe();
  // }, [props.match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/expenses" />
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
            <IonTitle size="large">History</IonTitle>
            <IonButtons collapse={true} slot="end">
              <IonButton onClick={() => setIsOpen(true)}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItemGroup>
          {expenses.map((expense, index: number) => (
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
