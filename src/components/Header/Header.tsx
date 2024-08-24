import {
  AppBar, 
  Typography, 
  Divider, 
  Container 
} from "@mui/material";

type HeaderProps = {
  signedIn: boolean;
}

export default function Header() {
  return (
    <header>
      
      <Container sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <NavLeft />
        <NavRight />
      </Container>
      <Divider />
    </header>
  );
}

function NavLeft() {
  return (
    <Container><Typography>Hello</Typography></Container>
  );
}

function NavRight() {
  return (
    <Container></Container>
  );
}