import ProductOrder from "@/components/products/ProductOrder";
import { Typography } from "@mui/material";

export default function Page() {
  return (
    <>
      <Typography
        variant="h1"
        mx={{ xs: 2, md: 0 }}
        mb={{ xs: '19px', md: '36px' }}
      >
        Order history
      </Typography>
      <ProductOrder 
        orderNumber={1}
        date={new Date()}
        products={[
          {
            productId: 1985,
            size: 36,
            quantity: 3,
          }
        ]}
        shipmentStatus="Shipped"
        data={{
          delivery: 'Meest, #134-45 London',
          contacts: 'Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com',
          paymentStatus: 'After payment',
        }}
      />
    </>
  ) 
}