import { useMutation } from "react-query";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForms";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({
        message: "Hotel Saved!",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Error Saving Hotel",
        type: "ERROR",
      });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
      <Header />
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </>
  );
};

export default AddHotel;
