import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image";

const Outline = styled("div")(( { theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  width: "320px",
  height: "48px",
  padding: "15px 19px",
  px: "20px",
  borderRadius: "42px",
  border: "1px solid #494949",
}));

const Input = styled("input")(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  outline: "none",
  border: "none",
}));

const Submit = styled("button")(({ theme }) => ({
  all: "unset",
  height: "fit-content",
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
              width={17}
              height={17} 
              alt="website logo"/>
          </Submit>
          <Input placeholder="Search"></Input>
        </Box>
      </Outline>
    </form>
  )
}