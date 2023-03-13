import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Message } from "../../components";

function ErrorPage() {
  const error = useRouteError();

  let status = "";
  let message = "";

  if (isRouteErrorResponse(error)) {
    status = String(error.status);
    message = error.data?.message;
  }

  return (
    <Message variant="error">
      <Message.Header>
        <b>DEU RUIM. ${status}</b>
      </Message.Header>
      <Message.Content>
        {" "}
        Erro: {humanReadableError(message || error)}
      </Message.Content>
    </Message>
  );
}

function humanReadableError(error: any) {
  if (error?.message) {
    return error.message;
  }
  return error;
}
export { ErrorPage };
