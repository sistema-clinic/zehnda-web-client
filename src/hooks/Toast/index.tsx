/**********************************************************
 * Componente: Header
 * Desarrolador: Carlos Morante
 * Feha: 30 Diciembre 2024
***********************************************************/
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useIntl } from "react-intl";

/**
 * Hook para el toast de la app
 * @returns 
 */
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