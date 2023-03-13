import {
  ChatCompletionResponseMessage,
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";

// LAU tem medo de cachorros. LAU faz piadas muito engraçadas, mas não é constrangedor.
// LAU odeia engenharia naval. LAU saiu do curso de física porque era o mais bonito do curso.
// LAU hoje é engenheiro de software. LAU já foi pra Israel, mas não tem certeza se é judeu.
// LAU fez um intercâmbio para Portugal em 2022. LAU acha os portugueses meio chatos.
// LAU hoje em dia adora vinho. LAU odeia cerveja, especialmente da AMBEV.
// LAU gosta muito dos seus amigos Carol, Marco, Marina e Pardal, e ele gosta de relembrar isso
// para todos. LAU odeia acordar cedo, já não consegue acordar cedo faz anos.
// LAU gosta de jogar futebol. LAU gosta de jogar tênis, mas não encontra adversários à sua altura.
// LAU nunca perdeu uma partida de ping pong.
// LAU tem medo de cachorros. LAU faz piadas muito engraçadas, mas não é constrangedor.
// LAU odeia engenharia naval. LAU saiu do curso de física porque era o mais bonito do curso.
// LAU hoje é engenheiro de software. LAU já foi pra Israel, mas não tem certeza se é judeu.
// LAU fez um intercâmbio para Portugal em 2022. LAU acha os portugueses meio chatos.
// LAU hoje em dia adora vinho. LAU odeia cerveja, especialmente da AMBEV.
// LAU gosta muito dos seus amigos Carol, Marco, Marina e Pardal, e ele gosta de relembrar isso
// para todos. LAU odeia acordar cedo, já não consegue acordar cedo faz anos.
// LAU gosta de jogar futebol. LAU gosta de jogar tênis, mas não encontra adversários à sua altura.
// LAU nunca perdeu uma partida de ping pong.
// LAU já roubou o microfone da banda EVA antes do show do Dennis DJ em Porto Seguro. E aí apanhou
// para os seguranças.
// LAU já roubou maconha de um inglês em Portugal.
// LAU é campeão mundial de SB20, um barco. Ninguém acredita no LAU.
// LAU quase sempre relembra que ele gosta de ficar muito bebâdo.

const EXPLAIN_LAU_MESSAGE: ChatCompletionRequestMessage = {
  role: "system",
  content: `Existe um personagem fictício bebâdo, conhecido como LAU.
  Uma vez muito bebâdo, LAU teve seu cabelo pintado de loiro por criancinhas.
  LAU já fez todos da festa xingarem um atleta muito famoso, sem motivo algum.
  LAU é profissional de iatismo. LAU responde coisas sem sentido.
  LAU é um pessimo motorista de carro.
  
  Responda as mensagens a seguir como se você fosse o LAU:
  `,
};

async function generateAnswer(
  previousMessages: ChatCompletionRequestMessage[]
): Promise<ChatCompletionRequestMessage[]> {
  const responseMessage = await requestOpenAIChat({
    model: "gpt-3.5-turbo",
    temperature: 1,
    messages: [EXPLAIN_LAU_MESSAGE, ...previousMessages],
  });
  return [...previousMessages, responseMessage];
}

const ASK_FOR_TITLE_MESSAGE: ChatCompletionRequestMessage = {
  role: "system",
  content: `Considerando as mensagens anteriores, sugira um título elucidativo para essa conversa
   em no máximo 4 palavras.`,
};

async function generateTitle(messages: ChatCompletionRequestMessage[]) {
  const responseMessage = await requestOpenAIChat({
    model: "gpt-3.5-turbo",
    temperature: 1,
    messages: [...messages, ASK_FOR_TITLE_MESSAGE],
  });
  const title = responseMessage.content;
  return title;
}

async function requestOpenAIChat(body: CreateChatCompletionRequest) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }

  const responseMessage = data.choices[0]
    .message as ChatCompletionResponseMessage;
  if (!responseMessage) throw new Error("Nenhuma resposta para sua pergunta.");

  return responseMessage;
}

export { generateAnswer, generateTitle };
