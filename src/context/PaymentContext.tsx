import useLocalStorage from '@/hooks/useLocalStorage';
import useSessionStorage from '@/hooks/useSessionStorage';
import { createContext, useContext, useState } from 'react';
type Payment = {
  amount: number;
  orderId: number;
  paymentIntentId: string;
  clientSecret: string;
};
type PaymentContextType = {
  payment: Payment | null;
  setPayment: (payment: Payment | null) => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw Error(
      'usePaymentContext can only be used inside an PaymentContextProvider'
    );
  return context;
};

export const PaymentContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [payment, setPayment] = useSessionStorage<Payment | null>(
    'payment',
    null
  );
  return (
    <PaymentContext.Provider value={{ payment, setPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
