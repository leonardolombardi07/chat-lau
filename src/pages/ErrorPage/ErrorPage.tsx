import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error) ? (
          <i>{error?.statusText || error?.data.message}</i>
        ) : (
          <i>Unknown error</i>
        )}
      </p>
    </div>
  );
}

export { ErrorPage };
