import styled from "styled-components";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";
import React from "react";
import { Icon } from "../../components";
import { ChatContextProvider } from "./context";

function HomePage() {
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] =
    React.useState(false);

  return (
    <PageContainer>
      <Header>
        <Icon
          name={isMobileSidebarVisible ? "close" : "listMenu"}
          size="medium"
          color="black"
          onClick={() => setIsMobileSidebarVisible((v) => !v)}
          role="button"
          style={{ cursor: "pointer" }}
        />
      </Header>

      <ChatContextProvider>
        <ContentContainer>
          <Sidebar isMobileSidebarVisible={isMobileSidebarVisible} />
          <Main />
        </ContentContainer>
      </ChatContextProvider>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const HEADER_HEIGHT = "42px";

const Header = styled.div`
  position: fixed;
  top: 0;
  height: ${HEADER_HEIGHT};
  width: 100%;
  background-color: ${(p) => p.theme.colors.link};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media ${(p) => p.theme.breakpoint.desktop} {
    display: none;
  }
`;

const ContentContainer = styled.div`
  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    margin-top: ${HEADER_HEIGHT};
  }

  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export { HomePage };
