import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForms";
import { useAppContext } from "../contexts/AppContext";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchMyHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { mutate, isLoading: isUpdateLoading } = useMutation(
    apiClient.updatedMyHotelById,
    {
      onError: (error: Error) => {
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("fetchHotelById");
        showToast({
          message: "Saved!",
          type: "SUCCESS",
        });
      },
    }
  );

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      onSave={handleSave}
      isLoading={isLoading || isUpdateLoading}
      hotel={hotel}
    />
  );
};

export default EditHotel;
