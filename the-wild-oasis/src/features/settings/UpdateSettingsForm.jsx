// import { createContext, useContext, useState } from "react";

// // Do notatek wkleić:

// // 1. Najpierw tworzymy kontekts
// const CounterContext = createContext();

// // 2. Tworzymy komponent nadrzędny, który odbiera children, oraz udoostępnia dane poprzez kontekst
// function Counter({ children }) {
// 	const [count, setCount] = useState(0);
// 	const increase = () => setCount((c) => c + 1);
// 	const decrease = () => setCount((c) => c - 1);

// 	return (
// 		<CounterContext.Provider value={{ count, increase, decrease }}>
// 			<span>{children}</span>
// 		</CounterContext.Provider>
// 	);
// }
// export default Counter;

// // 3, Tworzmymy podrzędne komponenty potzebne do wdrażania dodatkowych funkcjonalności i rozszerzeń komponentu głównego
// function Count() {
// 	const count = useContext(CounterContext)
// 	return <span>{count}</span>;
// }
// function Label({children}){
// 	return <span>{children}</span>
// }
// function Increase({icon}){
// 	const increase = useContext(CounterContext);
// 	return <button onClick={increase}>{icon}</button>
// }
// function Decrease({icon}){
// 	const decrease = useContext(createContext);
// 	return <button onClick={decrease}>{icon}</button>	
// }

// // 4. Dodajemy komponenty potomne w nadrzędnym
// Counter.Count = Count;
// Counter.Label = Label;
// Counter.Increase = Increase;
// Counter.Decrease = Decrease;

// // 5. Wrdożenie wyżej np w App.js
// <Counter>
// 	<Counter.Decrease icon="-"/>
// 	<Counter.Count/>
// 	<Counter.Increase icon="+"/>
// 	<Counter.Label>My super flexible counter</Counter.Label>
// </Counter>



import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	const { updateSetting, isUpdating } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					disabled={isUpdating}
					defaultValue={maxBookingLength}
          onBlur={(e)=> handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					disabled={isUpdating}
					defaultValue={maxGuestsPerBooking}
          onBlur={(e)=> handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					disabled={isUpdating}
					defaultValue={breakfastPrice}
          onBlur={(e)=>handleUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
