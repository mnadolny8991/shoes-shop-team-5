import { useEffect, useState } from 'react';

const useValidate = (
  inputVal: string,
  validatorFunc: (...args: string[]) => string,
  isFirstInteraction: boolean,
  confPass?: string
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isFirstInteraction) return;
    if (confPass) setError(validatorFunc(inputVal, confPass));
    else setError(validatorFunc!(inputVal));
  }, [inputVal, isFirstInteraction, confPass]);

  return {
    error,
  };
};

export default useValidate;
