import ProductOrder from '@/components/products/ProductOrder';

const mockOrders = [
  <ProductOrder
    key={1}
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1476,
        size: 36,
        quantity: 3,
      },
      {
        productId: 1564,
        size: 38,
        quantity: 1,
      },
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
    key={2}
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1881,
        size: 38,
        quantity: 1,
      },
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
    key={3}
    orderNumber={1}
    date={new Date()}
    products={[
      {
        productId: 1880,
        size: 38,
        quantity: 3,
      },
      {
        productId: 1635,
        size: 38,
        quantity: 1,
      },
    ]}
    shipmentStatus="Recieved"
    data={{
      delivery: 'Meest, #134-45 London',
      contacts: 'Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com',
      paymentStatus: 'After payment',
    }}
    discount={20}
  />,
];

export default mockOrders;
