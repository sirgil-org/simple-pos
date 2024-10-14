// src/context/HapticContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

type HapticContextType = {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  triggerLightFeedback: () => Promise<void>;
  triggerMediumFeedback: () => Promise<void>;
  triggerHeavyFeedback: () => Promise<void>;
  triggerNotification: (type: NotificationType) => Promise<void>;
};

const HapticContext = createContext<HapticContextType | undefined>(undefined);

export const HapticProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true); // Default: enabled

  const triggerLightFeedback = async () => {
    if (isEnabled) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  const triggerMediumFeedback = async () => {
    if (isEnabled) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    }
  };

  const triggerHeavyFeedback = async () => {
    if (isEnabled) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }
  };

  const triggerNotification = async (
    type:NotificationType
  ) => {
    if (isEnabled) {
      await Haptics.notification({ type });
    }
  };

  return (
    <HapticContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
        triggerLightFeedback,
        triggerMediumFeedback,
        triggerHeavyFeedback,
        triggerNotification,
      }}
    >
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptic = () => {
  const context = useContext(HapticContext);
  if (context === undefined) {
    throw new Error("useHaptic must be used within a HapticProvider");
  }
  return context;
};
