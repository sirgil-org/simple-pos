import {
  IonBadge,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonRouterLink,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase_client";
import { useEffect } from "react";

export default function LoginPage() {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", reValidateMode: "onChange" });

  const onSubmit = async ({ email, password }: any) => {
    await showLoading();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      await showToast({
        message: error.message,
        duration: 1500,
      });
    } else {
      router.push("/tabs", "root", "replace");
    }

    await hideLoading();
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/tabs", "root", "replace");
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <IonLabel>Email</IonLabel>
            <IonInput
              type="email"
              placeholder="email@domain.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <IonBadge color="danger" className="mt-2">
                {/*{errors.email.message || ""}*/}
              </IonBadge>
            )}
          </div>
          <div>
            <IonLabel>Password</IonLabel>
            <IonInput
              type="password"
              {...register("password", {
                required: "Password is required",
                maxLength: { value: 40, message: "Password too long" },
              })}
            />
            {errors.password && (
              <IonBadge color="danger" className="mt-2">
                {/*{errors.password.message || ""}*/}
              </IonBadge>
            )}
          </div>
          <div className="mt-6">
            <IonButton expand="full" type="submit">
              Continue
            </IonButton>
          </div>
        </form>
        <div>
          {/* <IonRouterLink href={"/register"}>
            <span>Already have an account?</span>&nbsp;
            <span>Register</span>
          </IonRouterLink> */}

          <div onClick={()=>{router.push("/register", "root", "replace");}}>Goto register</div>
        </div>
        <div>
          <IonRouterLink href={"/reset-password"}>
            Forgot password
          </IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
}
