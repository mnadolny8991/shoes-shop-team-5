import { useEffect, useState } from 'react';

const useValidate = (
  inputVal: string,
  validatorFunc: (...args: string[]) => string,
  isFirstInteraction: boolean
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isFirstInteraction) return;
    setError(validatorFunc!(inputVal));
  }, [inputVal, isFirstInteraction, validatorFunc]);

  return {
    error,
  };
};

export default useValidate;
