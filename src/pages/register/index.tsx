import {
  IonButton,
  IonContent,
  IonInput,
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

type IRegiterForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function RegisterPage() {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IRegiterForm>();

  const onSubmit = async ({ email, password }) => {
    await showLoading();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      await showToast({
        message: error.message,
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
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log(data, " has data");
        router.push("/tabs", "root", "replace");
      }
    })();
  }, [router]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}></div>
        <div className="mx-auto max-w-lg h-full flex flex-col justify-center space-y-2">
          <IonText>
            <p className="text-3xl font-bold">
              Welcome to Simple PoS <br /> Setup your account to proceed
            </p>
          </IonText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <IonInput
                type="text"
                label="Business Name"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter text"
                errorText={errors.name?.message}
                className={`${errors.name && "ion-invalid"} ${
                  touchedFields.name && "ion-touched"
                }`}
                {...register("name", { required: true })}
              />
              <IonInput
                type="email"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="email@domain.com"
                errorText={errors.email?.message}
                className={`${errors.email && "ion-invalid"} ${
                  touchedFields.email && "ion-touched"
                }`}
                {...register("email", { required: true })}
              />

              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="xxxxxxx"
                errorText={errors.password?.message}
                className={`${errors.password && "ion-invalid"} ${
                  touchedFields.password && "ion-touched"
                }`}
                {...register("password", { required: true })}
              />
              <IonInput
                type="password"
                label="Re-Enter Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="xxxxxxx"
                errorText={errors.confirm_password?.message}
                className={`${errors.confirm_password && "ion-invalid"} ${
                  touchedFields.confirm_password && "ion-touched"
                }`}
                {...register("confirm_password", {
                  required: true,
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
              />
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
        </div>
      </IonContent>
    </IonPage>
  );
}
