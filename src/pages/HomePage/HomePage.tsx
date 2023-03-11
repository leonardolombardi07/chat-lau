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
      <MobileHeader>
        <Icon
          name={isMobileSidebarVisible ? "close" : "listMenu"}
          size="medium"
          color="black"
          onClick={() => setIsMobileSidebarVisible((v) => !v)}
          role="button"
          style={{ cursor: "pointer" }}
        />
      </MobileHeader>

      <ContentContainer>
        <ChatContextProvider>
          <Sidebar isMobileSidebarVisible={isMobileSidebarVisible} />
          <Main />
        </ChatContextProvider>
      </ContentContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MOBILE_HEADER_HEIGHT = "42px";

const MobileHeader = styled.div`
  position: fixed;
  top: 0;
  height: ${MOBILE_HEADER_HEIGHT};
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
    margin-top: ${MOBILE_HEADER_HEIGHT};
  }

  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export { HomePage };
