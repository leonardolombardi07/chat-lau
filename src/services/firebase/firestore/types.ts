import { ChatCompletionResponseMessage } from "openai";

export interface Chat {
  id: string;
  title: string;
  uid: string;
  updatedAt: Date;
}

export type Message = ChatCompletionResponseMessage;
