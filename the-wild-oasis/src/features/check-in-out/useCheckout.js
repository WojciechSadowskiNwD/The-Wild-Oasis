import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
	const queryClient = useQueryClient();

	// z biblioteki Tanstack React Query. useMutation służy do edytowania danych w bazie np jak tutaj do zmiany statusu rezerwacji na "checked-in" i ustawienia isPaid na true.
	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),

		//onSuccess jest wywoływane po udanym sprawdzeniu się mutacji, czyli po udanym check-in. Wtedy pokazujemy toast z sukcesem, odświeżamy dane w cache'u react query i na koniec przekierowujemy użytkownika na stronę główną.
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} succesfully checked out`);
			queryClient.invalidateQueries({ active: true });
		},

		//onError jest wywoływane, gdy mutacja zakończy się błędem, czyli gdy check-in się nie powiedzie. Wtedy pokazujemy toast z informacją o błędzie.
		onError: () => toast.error("There was an error while checking out"),
	});

	return { checkout, isCheckingOut };
}
