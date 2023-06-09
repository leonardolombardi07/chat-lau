import { Button, Icon, IconNames } from "../../components";
import styled from "styled-components";
import { useChat } from "../../context";

const EXAMPLES = [
  `"Me explique quem é o LAU"`,
  `"Como posso ficar loiro se o alcool não faz efeito em mim?"`,
  `"Alguma ideia de como gastar R$ 1500 em uma noite?"`,
];

function EmptyMessages() {
  const {
    actions: { setInput },
  } = useChat();
  return (
    <EmptyMessagesContainer>
      <Title>Chat LAU 🤪</Title>

      <ShowcasesContainer>
        <Showcase name="lightning bolt" title="Exemplos">
          {EXAMPLES.map((example) => (
            <ShowcaseButton
              onClick={() => setInput(example.replaceAll(`"`, ""))}
              key={example}
            >
              {example}
            </ShowcaseButton>
          ))}
        </Showcase>

        <Showcase name="sun" title="Capacidades">
          <ShowcaseButton>
            Esquece o que o usuário disse anteriormente na conversa
          </ShowcaseButton>

          <ShowcaseButton>Não aceita nenhuma correção nunca</ShowcaseButton>

          <ShowcaseButton>
            Treinado para só aceitar pedidos inapropriados
          </ShowcaseButton>
        </Showcase>

        <Showcase name="warning" title="Limitações">
          <ShowcaseButton>
            Sempre irá gerar informações incorretas
          </ShowcaseButton>

          <ShowcaseButton>
            Sempre irá produzir instruções prejudiciais ou conteúdo tendencioso
          </ShowcaseButton>

          <ShowcaseButton>
            Conhecimento nenhum do mundo e eventos desde sempre
          </ShowcaseButton>
        </Showcase>
      </ShowcasesContainer>
    </EmptyMessagesContainer>
  );
}

const EmptyMessagesContainer = styled.div`
  width: 100%;
  height: 100%;

  /* Internal Layout */
  text-align: center;

  overflow-y: scroll;
`;

export const Title = styled.h1`
  margin-top: 3em;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
`;

interface ShowcaseProps {
  title: string;
  name: IconNames;
  children: React.ReactNode;
}

function Showcase({ title, name, children }: ShowcaseProps) {
  return (
    <ShowcaseContainer>
      <div style={{ marginBottom: "1em" }}>
        <Icon name={name} size="medium" />
        <h3 style={{ marginTop: -5 }}>{title}</h3>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {children}
      </div>
    </ShowcaseContainer>
  );
}

const ShowcasesContainer = styled.div`
  display: flex;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    flex-direction: column;
    width: 100%;
  }

  @media ${(p) => p.theme.breakpoint.desktop} {
    flex-direction: row;
    padding: 2em;
    width: 90%;
    margin: auto;
  }
`;

const ShowcaseContainer = styled.div`
  width: calc(33.33% - 1em);
  padding: 1em;

  @media ${(p) => p.theme.breakpoint.smallerThanDesktop} {
    flex-direction: column;
    width: 100%;
  }
`;

interface ShowcaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function ShowcaseButton({ children, onClick, ...rest }: ShowcaseButtonProps) {
  return (
    <Button
      variety="secondary"
      style={{ margin: "0.5em 0", pointerEvents: onClick ? "auto" : "none" }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

export { EmptyMessages };
