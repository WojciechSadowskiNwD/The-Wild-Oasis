import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();

	// FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue == "all"
			? null
			: { field: "status", value: filterValue };
	// : { field: "totalPrice", value: 5000, method: 'gte' };

	// SORT
	//do zmiennej ładuję z adresu URL zawartość z sortBy a wartością domyslną będzie startDate-desc
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	//tutaj dzielę na dwie zmienne ktore po oddzieleniu powstaną
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy], //to drugie działa jak tablica zależności gdy sie zmienia mamy refetching danych z bazy
		//odpala się gdy komponent się montuje oraz gdy nastąpią zmiany w zależnościach
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, error, bookings };
}
