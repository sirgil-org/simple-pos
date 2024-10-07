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
  }, [router]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <div className="mx-auto max-w-lg h-full flex flex-col justify-center space-y-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
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
