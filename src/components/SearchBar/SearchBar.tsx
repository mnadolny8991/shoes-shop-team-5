import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image";

const Outline = styled("div")(( { theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  width: "320px",
  padding: "15px 19px",
  px: "20px",
  borderRadius: "42px",
  border: "1px solid #494949",
  [theme.breakpoints.down("md")]: {
    padding: "6.92px 11px",
  }
}));

const Input = styled("input")(({ theme }) => ({
  all: "unset",
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

const Submit = styled("button")(({ theme }) => ({
  padding: "0",
  margin: "0",
  border: "none",
  background: "transparent",
  cursor: "pointer",
}));

export default function SearchBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <form>
      <Outline>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <Submit>
            <Image
              src="/search-normal.svg"
              width={isMobile ? 11.16 : 17}
              height={isMobile ? 11.16 : 17} 
              alt="website logo"/>
          </Submit>
          <Input placeholder="Search"></Input>
        </Box>
      </Outline>
    </form>
  )
}