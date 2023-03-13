import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { Icon } from "../../components";
import {
  ChatContextProvider,
  SidebarContextProvider,
  useSidebar,
} from "../../context";
import { MOBILE_HEADER_HEIGHT, MOBILE_HEADER_ZINDEX } from "./constants";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <PageContainer>
      <SidebarContextProvider>
        <MobileHeader />

        <ContentContainer>
          <ChatContextProvider>
            <Sidebar />
            <Outlet />
          </ChatContextProvider>
        </ContentContainer>
      </SidebarContextProvider>
    </PageContainer>
  );
}

function MobileHeader() {
  const {
    state: { isVisible },
    actions: { open, close },
  } = useSidebar();

  return (
    <StyledMobileHeader>
      <Icon
        name={isVisible ? "close" : "listMenu"}
        size="medium"
        color="black"
        onClick={isVisible ? close : open}
        role="button"
        style={{ cursor: "pointer" }}
      />
    </StyledMobileHeader>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledMobileHeader = styled.header`
  @media ${(p) => p.theme.breakpoint.desktop} {
    display: none;
  }

  position: fixed;
  top: 0;
  width: 100%;
  max-height: ${MOBILE_HEADER_HEIGHT};
  z-index: ${MOBILE_HEADER_ZINDEX};

  /* Internal Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  background-color: ${(p) => p.theme.colors.link};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  /* Internal Layout */
  display: flex;
  flex-direction: row;
`;

export { Layout };
