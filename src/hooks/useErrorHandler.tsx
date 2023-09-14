import { useState } from 'react';

export const useErrorHandler = () => {
  const [errorName, setErrorName] = useState<false | string>(false);

  const catchError = (errorMessage: string) => {
    setErrorName(errorMessage);
  };

  return {
    errorName,
    catchError,
  };
};
