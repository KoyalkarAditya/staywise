import { RegisterFormData } from "./pages/Register";
import { SignInData } from "./pages/Signin";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include", // include cookies in the browser
  });
  if (!response.ok) {
    throw new Error("token invalid");
  }
  return response.json();
};

export const signIn = async (formData: SignInData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (formData: FormData) => {
  console.log(formData);
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error creating the your hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }
  return response.json();
};

export const updatedMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }
  await response.json();
};
