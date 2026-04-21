import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";

export function useBookings() {
	const [searchParams] = useSearchParams();
	
	// do pre-fetchinh
	const queryClient = useQueryClient()

	// FILTER
	const filterValue = searchParams.get("status");
	// dostajemy nic albo obiekt
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


	// PAGINATION 
	const page = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	// QUERY
	const {
		isLoading,
		// data: { data: bookings, count } = {},
		data,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page], //to drugie działa jak tablica zależności gdy sie zmienia mamy refetching danych z bazy
		//odpala się gdy komponent się montuje oraz gdy nastąpią zmiany w zależnościach
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// zabezpieczenie przed undefined na początku
	//count to ilość wierszy jakie dostaliśmy w wyniku zapyt. do bazy danych
	const bookings = data?.data || [];
	const count = data?.count || 0;


	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// pobierz następną stronę do pamięci cache
	if(page < pageCount)
	//zasada działania podobna do useQuery
	queryClient.prefetchQuery({
		queryKey: ["bookings", filter, sortBy, page+1],
		queryFn: () => getBookings({ filter, sortBy, page: page+1 }),
	})
	
	// pobierz poprzednią stronę do pamięci cache
	if(page > 1)
	//zasada działania podobna do useQuery
	queryClient.prefetchQuery({
		queryKey: ["bookings", filter, sortBy, page-1],
		queryFn: () => getBookings({ filter, sortBy, page: page-1 }),
	})


	return { isLoading, error, bookings, count };
}
