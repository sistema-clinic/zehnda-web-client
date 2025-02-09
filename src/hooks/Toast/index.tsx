import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useIntl } from "react-intl";

export const useToast = () => {
    const toast = useRef<Toast>(null);
    const {messages} = useIntl();
    const show = (
      severityType: "success" | "info" | "warn" | "error" | "secondary" | "contrast",
      message: string
    ) => {
      toast.current?.show({
        severity: severityType,
        summary: String(messages[severityType]),
        detail: message,
        life: 5000,
      });
    };
  
    return { toast, show };
  };