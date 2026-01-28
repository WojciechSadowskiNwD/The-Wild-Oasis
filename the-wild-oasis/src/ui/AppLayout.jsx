import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Main = styled.main`
    background-color: green;
    padding: 4rem 4.8rem 6.4rem;
`;



function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;

// Utworzone komponenty - Sidebar, Header. Dodanie styled conponents do owinięcia treści - Main i StyledAppLayout( układ elementów -> grid ). Wstępne stylowanie (docelowo view dla desktop).
