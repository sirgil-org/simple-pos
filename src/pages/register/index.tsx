import {
  IonBadge,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonText,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { supabase } from "../../supabase_client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function RegisterPage() {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }: any) => {
    await showLoading();

    console.log(email, "-------", password);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      await showToast({
        message: error.error_description || error.message,
        duration: 1500,
      });
    } else {
      await showToast({
        message: "Check your email to activate your account",
      });
    }

    await hideLoading();
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        console.log(data, ' has data')
        router.push("/tabs", "root", "replace");
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <IonText>
          <p className="text-2xl">
            Welcome to the Solace, setup your account proceed
          </p>
        </IonText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <IonLabel>Business Name</IonLabel>
            <IonInput type="text" placeholder="Enter text" />
            {errors.name && (
              <IonBadge color="danger" className="mt-2">
                {errors.name.message}
              </IonBadge>
            )}
          </div>
          <div>
            <IonLabel>Email</IonLabel>
            <IonInput
              type="email"
              placeholder="email@domain.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <IonBadge color="danger" className="mt-2">
                {errors.email.message}
              </IonBadge>
            )}
          </div>
          <div>
            <IonLabel>Password</IonLabel>
            <IonInput
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <IonBadge color="danger" className="mt-2">
                {errors.password.message}
              </IonBadge>
            )}
          </div>
          <div>
            <IonLabel>Re-Enter Password</IonLabel>
            <IonInput
              type="password"
              {...register("confirm_password", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
            {errors.confirm_password && (
              <IonBadge color="danger" className="mt-2">
                {errors.confirm_password.message}
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
          <IonRouterLink href={"/login"}>
            Already have an account? &nbsp;
            <span>Login</span>
          </IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
}
