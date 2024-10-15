import mockOrders from "@/mock/mockOrders";
import { Stack, Typography } from "@mui/material";

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
      <Stack gap={2}>
        {mockOrders}
      </Stack>
    </>
  ) 
}