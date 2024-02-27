import { useRouteError } from 'react-router-dom';

interface RouteErrorProps {
  statusText?: string;
  message?: string;
}

const RouteError = () => {
  const error = useRouteError() as RouteErrorProps;
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default RouteError;
