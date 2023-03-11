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

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 42px;
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

function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export { HomePage };
