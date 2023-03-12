import React from "react";
import styled from "styled-components";
import { Button } from "../../../components";
import { MOBILE_HEADER_HEIGHT } from "../constants";
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

const SIDEBAR_WIDTH = "260px";

const SidebarHeader = styled.div`
  text-align: center;
`;

const SidebarContainer = styled.aside<{ isMobileSidebarVisible: boolean }>`
  width: ${SIDEBAR_WIDTH};
  height: 100vh;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    display: ${(p) => (p.isMobileSidebarVisible ? "block" : "none")};
    width: 100vw;
    padding-top: ${MOBILE_HEADER_HEIGHT};
  }

  /* Internal Layout */
  padding: 0.5em;
  display: flex;
  flex-direction: column;

  border-right: 1px solid ${(p) => p.theme.colors.border};
  overflow: hidden;
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH};

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    width: 100vw;
  }

  /* Internal Layout */
  padding: 10px;
  text-align: center;

  border-top: 1px solid ${(p) => p.theme.colors.border};
`;

export { Sidebar };
