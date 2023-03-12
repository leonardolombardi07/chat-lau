import styled from "styled-components";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";
import React from "react";
import { Icon } from "../../components";
import { ChatContextProvider } from "./context";
import { MOBILE_HEADER_HEIGHT, MOBILE_HEADER_ZINDEX } from "./constants";

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
          <Main isMobileSidebarVisible={isMobileSidebarVisible} />
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

const MobileHeader = styled.header`
  @media ${(p) => p.theme.breakpoint.desktop} {
    display: none;
  }

  position: fixed;
  top: 0;
  width: 100%;
  max-height: ${MOBILE_HEADER_HEIGHT};
  z-index: ${MOBILE_HEADER_ZINDEX};
  background-color: ${(p) => p.theme.colors.link};

  /* Internal Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const ContentContainer = styled.div`
  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    margin-top: ${MOBILE_HEADER_HEIGHT};
  }

  width: 100%;
  height: 100%;

  /* Internal Layout */
  display: flex;
  flex-direction: row;
`;

export { HomePage };
