import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";




const StyledApp = styled.div`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading >The Wild Oasis</Heading>
				<Button onClick={() => alert("check in")}>Check in</Button>
				<Button onClick={() => alert("check out")}>Check out</Button>
				<Input type="number" placeholder="Number of guests" />
				<Input type="number" placeholder="Number of guests" />
			</StyledApp>
		</>
	);
}

export default App;
