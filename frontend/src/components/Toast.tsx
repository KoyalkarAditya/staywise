import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};
const Toast = ({ message, onClose, type }: ToastProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed rounded-md top-4 right-4 z-50 p-4 rounded-md bg-green-500 text-white max-w-md"
      : "fixed rounded-md top-4 right-4 z-50 p-4 rounded-md bg-red-500 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};
export default Toast;
