import { useEffect, useState } from 'react';

const useValidate = (
  inputVal: string,
  validatorFunc: (inputVal: string) => string,
  isFirstInteraction: boolean
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isFirstInteraction) return;
    setError(validatorFunc(inputVal));
  }, [inputVal, isFirstInteraction]);

  return {
    error,
  };
};

export default useValidate;
