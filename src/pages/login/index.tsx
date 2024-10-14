import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase_client";
import { useCurrentUser } from "../../contexts";
import { Redirect } from "react-router";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

type ILoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ILoginForm>({ mode: "onTouched", reValidateMode: "onChange" });

  useIonViewDidEnter(() => {
    Keyboard.setResizeMode({ mode: KeyboardResize.Native });

    setTimeout(() => {
      const emailInput = document.getElementById(
        "email-input"
      ) as HTMLIonInputElement;
      if (emailInput) {
        emailInput.setFocus();
      }
    }, 300);
  });

  const onSubmit = async ({ email, password }) => {
    await showLoading();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      await showToast({
        message: error.message,
        duration: 1500,
      });
    } else {
      console.log("pushing routes");
      router.push("/tabs", "root", "replace");
    }

    await hideLoading();
  };

  const { currentUser } = useCurrentUser();
  if (currentUser) return <Redirect to="/tabs" />;

  return (
    <IonPage>
      <IonContent className="ion-padding" scroll-y="false">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <div className="mx-auto max-w-lg space-y-2">
          <div className="font-bold text-3xl mt-10">Sign In</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div className="space-y-3">
              <IonInput
                id="email-input"
                type="email"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="email@domain.com"
                errorText={errors.email?.message}
                autoFocus
                autocomplete="off"
                className={`${errors.email && "ion-invalid"} ${
                  touchedFields.email && "ion-touched"
                }`}
                {...register("email", { required: "Email is required" })}
              />
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                fill="outline"
                errorText={errors.password?.message}
                placeholder="xxxxxx"
                className={`${errors.password && "ion-invalid"} ${
                  touchedFields.password && "ion-touched"
                }`}
                {...register("password", {
                  required: "Password is required",
                  maxLength: { value: 40, message: "Password too long" },
                })}
              />
            </div>
            <IonButton expand="block" type="submit">
              Continue
            </IonButton>
          </form>
          <div className="flex justify-between">
            <div>
              <IonRouterLink href={"/register"}>
                <span>New user?</span>&nbsp;
                <span>Register</span>
              </IonRouterLink>
            </div>
            <div>
              <IonRouterLink href={"/reset-password"}>
                Forgot password
              </IonRouterLink>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
