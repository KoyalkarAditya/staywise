import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { mutate } = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Registration Successful!",
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
      <h2 className="text-3xl font-bold">Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-800 text-sm font-bold flex-1">
          First Name
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="text"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-sm text-red-600 font-normal">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-800 text-sm font-bold flex-1">
          Last Name
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="text"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-sm text-red-600 font-normal">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-800 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required ";
              } else if (watch("password") !== val) {
                return "Your password did not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-600 font-normal">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 rounded-md"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
