'use client';

import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {
  useStripe,
  useElements,
  AddressElement,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import TextField from '@/components/input/TextField';
import useValidate from '@/hooks/useValidate';
import {
  addressValidator,
  cityValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
  stateValidator,
  zipCodeValidator,
} from '@/lib/validators';
import InputField from '@/components/input/InputField';
import useUserData from '@/hooks/useUserData';
import { useSession } from 'next-auth/react';
import { countries, CountryType } from '@/data/countries';
import CountryAutocomplete from '@/components/input/CountryAutocomplete';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ProductOrderProps } from '@/components/products/ProductOrder';
import { useCartContext } from '@/context/CartContext';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { promocode, amount } = useCartContext();

  const { data: session } = useSession();
  const [confirmPaymentErrorMessage, setConfirmPaymentErrorMessage] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<CountryType | null>(
    countries.find((country) => country.code === 'US') ?? null
  );
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');

  const [isFirstInteractionFirstName, setIsFirstInteractionFirstName] =
    useState(false);
  const [isFirstInteractionLastName, setIsFirstInteractionLastName] =
    useState(false);
  const [isFirstInteractionEmail, setIsFirstInteractionEmail] = useState(false);
  const [isFirstInteractionPhone, setIsFirstInteractionPhone] = useState(false);
  const [isFirstInteractionCountry, setIsFirstInteractionCountry] =
    useState(false);
  const [isFirstInteractionCity, setIsFirstInteractionCity] = useState(false);
  const [isFirstInteractionState, setIsFirstInteractionState] = useState(false);
  const [isFirstInteractionZipCode, setIsFirstInteractionZipCode] =
    useState(false);
  const [isFirstInteractionAddress, setIsFirstInteractionAddress] =
    useState(false);

  const { error: firstNameError } = useValidate(
    firstName,
    nameValidator,
    isFirstInteractionFirstName
  );
  const { error: lastNameError } = useValidate(
    lastName,
    nameValidator,
    isFirstInteractionLastName
  );
  const { error: emailError } = useValidate(
    email,
    emailValidator,
    isFirstInteractionEmail
  );
  const { error: phoneError } = useValidate(
    phoneNumber,
    phoneValidator,
    isFirstInteractionPhone
  );
  const countryError =
    isFirstInteractionCountry && !country ? 'Please specify your country' : '';
  const { error: cityError } = useValidate(
    city,
    cityValidator,
    isFirstInteractionCity
  );
  const { error: stateError } = useValidate(
    state,
    stateValidator,
    isFirstInteractionState
  );
  const { error: zipCodeError } = useValidate(
    zipCode,
    zipCodeValidator,
    isFirstInteractionZipCode
  );
  const { error: addressError } = useValidate(
    address,
    addressValidator,
    isFirstInteractionAddress
  );

  const { data, status } = useUserData(session?.id!, session?.accessToken!);

  useEffect(() => {
    if (data && status === 'success') {
      setFirstName(data.firstName ?? '');
      setLastName(data.lastName ?? '');
      setPhoneNumber(data.phoneNumber ?? '');
      setEmail(data.email);
    }
  }, [data, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName) setIsFirstInteractionFirstName(true);
    if (!lastName) setIsFirstInteractionLastName(true);
    if (!email) setIsFirstInteractionEmail(true);
    if (!phoneNumber) setIsFirstInteractionPhone(true);
    if (!country) setIsFirstInteractionCountry(true);
    if (!state) setIsFirstInteractionState(true);
    if (!city) setIsFirstInteractionCity(true);
    if (!zipCode) setIsFirstInteractionZipCode(true);
    if (!address) setIsFirstInteractionAddress(true);

    if (
      !stripe ||
      !elements ||
      !firstName ||
      !!firstNameError ||
      !lastName ||
      !!lastNameError ||
      !email ||
      !!emailError ||
      !phoneNumber ||
      !!phoneError ||
      !country ||
      !!countryError ||
      !state ||
      !!stateError ||
      !city ||
      !!cityError ||
      !zipCode ||
      !!zipCodeError ||
      !address ||
      !!addressError
    ) {
      return;
    }

    setIsLoading(true);

    const orderRecord: ProductOrderProps = {
      orderNumber: 0,
      data: {
        delivery: `${address}, ${city}, ${zipCode}`,
        contacts: `${firstName} ${lastName}, ${phoneNumber}, ${email}`,
        paymentStatus: 'After payment',
      },
      date: new Date(),
      shipmentStatus: 'Shipped',
      discount: promocode ? 10 : 0,
      records: amount.map((productAmount) => ({
        id: productAmount.id,
        productId: productAmount.productId,
        size: productAmount.size,
        quantity: productAmount.amount,
      })),
    };
    localStorage.removeItem('pending');
    localStorage.setItem('pending', JSON.stringify(orderRecord));

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thank-you`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`,
              email,
              phone: phoneNumber,
              address: {
                country: country.code,
                state,
                city,
                postal_code: zipCode,
                line1: address,
                line2: null,
              },
            },
          },
        },
      })
      .then((result) => {
        if (result.error) {
          console.error('error confirmPayment  ', result.error);
          if (
            result.error.type === 'card_error' ||
            result.error.type === 'validation_error'
          ) {
            setConfirmPaymentErrorMessage(
              result.error.message || 'An error occurred.'
            );
          } else {
            setConfirmPaymentErrorMessage('An unexpected error occurred.');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="checkoutForm">
      <Typography variant="h1" mb={{ xs: 5, sm: 7, md: 9 }}>
        Checkout
      </Typography>
      <Typography variant="h4" mb={{ xs: 3, md: 4 }}>
        Personal info
      </Typography>
      <Stack
        spacing={{ xs: 2, sm: 3 }}
        direction={'row'}
        mb={{ xs: 2, sm: 3, md: 4 }}
      >
        <TextField
          value={firstName}
          onBlur={(e) => setIsFirstInteractionFirstName(true)}
          onChange={(e) => setFirstName(e.target.value)}
          required
          name="name"
          id="name"
          label="Name"
          min={2}
          error={firstNameError}
        />
        <TextField
          value={lastName}
          onBlur={(e) => setIsFirstInteractionLastName(true)}
          onChange={(e) => setLastName(e.target.value)}
          required
          name="lastName"
          id="lastName"
          label="Surname"
          min={2}
          error={lastNameError}
        />
      </Stack>
      <Stack spacing={{ xs: 2, sm: 3 }} direction={'row'}>
        <TextField
          value={email}
          onBlur={(e) => setIsFirstInteractionEmail(true)}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          id="email"
          label="Email"
          min={6}
          error={emailError}
        />
        <TextField
          value={phoneNumber}
          onBlur={(e) => setIsFirstInteractionPhone(true)}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          name="phone"
          id="phone"
          label="Phone"
          min={10}
          error={phoneError}
        />
      </Stack>
      <Divider sx={{ my: { xs: 5, sm: 7, md: 9 } }} />
      <Typography variant="h4" mb={{ xs: 3, md: 4 }}>
        Shipping info
      </Typography>
      <Grid2 container spacing={{ xs: 2, sm: 3 }} mb={{ xs: 1, sm: 2, md: 3 }}>
        <Grid2 xs={6} md={3}>
          <CountryAutocomplete
            value={country}
            onBlur={(e) => {
              setIsFirstInteractionCountry(true);
              console.log('country blur');
            }}
            onChange={setCountry}
            error={countryError}
          />
        </Grid2>
        <Grid2 xs={6} md={3}>
          <InputField
            value={state}
            onBlur={(e) => setIsFirstInteractionState(true)}
            onChange={(e) => setState(e.target.value)}
            required
            name="state"
            id="state"
            label="State"
            placeholder="NY"
            error={stateError}
            width={'100%'}
          />
        </Grid2>
        <Grid2 xs={6} md={3}>
          <InputField
            value={city}
            onBlur={(e) => setIsFirstInteractionCity(true)}
            onChange={(e) => setCity(e.target.value)}
            required
            name="city"
            id="city"
            label="City"
            placeholder="NY"
            error={cityError}
            width={'100%'}
          />
        </Grid2>
        <Grid2 xs={6} md={3}>
          <InputField
            value={zipCode}
            onBlur={(e) => setIsFirstInteractionZipCode(true)}
            onChange={(e) => setZipCode(e.target.value)}
            required
            name="zipCode"
            id="zipCode"
            label="Zip Code"
            placeholder="10001"
            error={zipCodeError}
            width={'100%'}
          />
        </Grid2>
      </Grid2>
      <InputField
        value={address}
        onBlur={(e) => setIsFirstInteractionAddress(true)}
        onChange={(e) => setAddress(e.target.value)}
        required
        name="address"
        id="address"
        label="Address"
        width="100%"
        placeholder="street, appartment, block"
        error={addressError}
      />

      {/* <AddressElement options={{mode:'shipping', defaultValues:{address:{country:'US', state:'NY'}}}}/> */}
      <Divider sx={{ my: { xs: 5, sm: 7, md: 9 } }} />
      <Typography variant="h4" mb={{ xs: 3, md: 4 }}>
        Payment info
      </Typography>
      <PaymentElement options={{ fields: { billingDetails: 'never' } }} />
      <Divider sx={{ my: { xs: 5, sm: 7, md: 9 } }} />
      <Backdrop open={isLoading}>
        <CircularProgress size={200} />
      </Backdrop>
      <Snackbar
        open={!!confirmPaymentErrorMessage}
        autoHideDuration={2000}
        onClose={()=>setConfirmPaymentErrorMessage(null)}
      >
        <Alert severity='error' onClose={()=>setConfirmPaymentErrorMessage(null)}>
          {confirmPaymentErrorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
