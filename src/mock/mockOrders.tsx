import ProductOrder from "@/components/products/ProductOrder";

const mockOrders = [
  <ProductOrder 
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1985,
        size: 36,
        quantity: 3,
      },
      {
        productId: 1983,
        size: 38,
        quantity: 1,
      }
    ]}
    shipmentStatus="Shipped"
    data={{
      delivery: 'Meest, #134-45 London',
      contacts: 'Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com',
      paymentStatus: 'After payment',
    }}
    discount={20}
  />,
  <ProductOrder 
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1983,
        size: 38,
        quantity: 1,
      }
    ]}
    shipmentStatus="Cancelled"
    data={{
      delivery: 'Meest, #134-45 London',
      contacts: 'Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com',
      paymentStatus: 'After payment',
    }}
    discount={20}
  />,
  <ProductOrder 
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1985,
        size: 38,
        quantity: 3,
      },
      {
        productId: 1983,
        size: 38,
        quantity: 1,
      }
    ]}
    shipmentStatus="Recieved"
    data={{
      delivery: 'Meest, #134-45 London',
      contacts: 'Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com',
      paymentStatus: 'After payment',
    }}
    discount={20}
  />
];

export default mockOrders;