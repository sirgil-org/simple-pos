import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonRouterLink,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase_client";
import { useEffect } from "react";

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
    }

    await hideLoading();
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/tabs", "root", "replace");
      }
    })();
  }, [router]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <div className="mx-auto max-w-lg h-full flex flex-col justify-center space-y-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div className="space-y-3">
              <IonInput
                type="email"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="email@domain.com"
                errorText={errors.email?.message}
                helperText="Enter valid email"
                className={`${errors.email && "ion-invalid"} ${
                  touchedFields.email && "ion-touched"
                }`}
                {...register("email", { required: "Email is required" })}
              ></IonInput>
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
            <IonButton expand="full" type="submit">
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
