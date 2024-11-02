import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();
  const { showToast } = useAppContext();
  const { mutate } = useMutation(apiClient.signIn, {
    onSuccess: () => {
      showToast({
        message: "SignIn Successful!",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="container p-5 flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-800 text-sm font-bold flex-1">
        Email
        <input
          className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-sm text-red-600 font-normal">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-800 text-sm font-bold flex-1">
        Password
        <input
          className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-600 font-normal">
            {errors.password.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 px-4 font-bold hover:bg-blue-500 rounded-md"
        >
          Login
        </button>
      </span>
    </form>
  );
};
export default SignIn;
