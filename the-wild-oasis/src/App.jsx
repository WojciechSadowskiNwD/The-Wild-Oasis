import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";

const StyledApp = styled.div`
	/* background-color: orangered; */
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						<Heading as="h1">The Wild Oasis</Heading>

						<div>
							<Heading as="h2">Check in and out</Heading>
							<Button onClick={() => alert("check in")}>Check in</Button>
							<Button variations='secondary' sizes='Small' onClick={() => alert("check out")}>Check out</Button>
						</div>
					</Row>

					<Row type="vertical">
						<Heading as="h3">Form</Heading>

						<form>
							<Input type="number" placeholder="Number of guests" />
							<Input type="number" placeholder="Number of guests" />
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
