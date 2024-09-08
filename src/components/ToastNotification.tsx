import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastNotification = (status: string, content: string) => {
  const notifySetting = {
    position: "bottom-left" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
  };

  if (status === "success") {
    toast.success(content, notifySetting);
  } else if (status === "error") {
    toast.error(content, notifySetting);
  }
};

export default toastNotification;
