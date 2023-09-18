import { useState } from 'react';

export const useErrorHandler = () => {
  const [errorName, setErrorName] = useState<false | string>(false);

  const catchError = (errorMessage: string | false) => {
    setErrorName(errorMessage);
  };

  return {
    errorName,
    catchError,
  };
};
