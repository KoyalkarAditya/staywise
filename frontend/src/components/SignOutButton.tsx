import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { mutate } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Signed Out!",
        type: "SUCCESS",
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const handleClick = () => {
    mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-4 py-2 bg-white rounded-md font-semibold"
    >
      Logout
    </button>
  );
};
export default SignOutButton;
