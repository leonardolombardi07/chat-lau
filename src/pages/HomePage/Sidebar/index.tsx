import React from "react";
import styled from "styled-components";
import { Button } from "../../../components";
import { useChat } from "../context";

function Sidebar({
  isMobileSidebarVisible,
}: {
  isMobileSidebarVisible: boolean;
}) {
  const {
    state: { isLoading, messages },
    actions: { resetMessages },
  } = useChat();
  return (
    <SidebarContainer isMobileSidebarVisible={isMobileSidebarVisible}>
      <SidebarHeader>
        <p>
          Não vendo o que esperava aqui? <b>SE FUDEU.</b>
        </p>
      </SidebarHeader>

      <SidebarFooter>
        <Button
          disabled={messages.length === 0 || isLoading}
          variety="primary"
          style={{ width: "100%" }}
          onClick={() => resetMessages()}
        >
          Resetar
        </Button>
      </SidebarFooter>
    </SidebarContainer>
  );
}

const SidebarHeader = styled.div`
  text-align: center;
`;

const SidebarContainer = styled.aside<{ isMobileSidebarVisible: boolean }>`
  width: 260px;
  height: 100vh;
  border-right: 1px solid ${(p) => p.theme.colors.border};
  overflow: hidden;
  padding: 0.5em;
  display: flex;
  flex-direction: column;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: ${(p) => (p.isMobileSidebarVisible ? "block" : "none")};
  }
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 260px;
  text-align: center;
  border-top: 1px solid ${(p) => p.theme.colors.border};
`;

export { Sidebar };
