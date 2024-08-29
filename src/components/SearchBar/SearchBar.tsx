import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image";
import IconButton from "@mui/material/IconButton";

const Outline = styled("div")(( { theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  width: "100%",
  height: "100%",
  display: "flex",
  paddingInline: "4%",
  borderRadius: "42px",
  border: "1px solid #494949",
  [theme.breakpoints.down("md")]: {
  }
}));

const Input = styled("input")(({ theme }) => ({
  all: "unset",
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  width: "100%",
}));

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  width: number | string,
  height: number | string,
}

export default function SearchBar({ value, onChange, width, height }: SearchBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <form>
      <Outline sx={{
        width: width,
        height: height
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}>
          <IconButton type="submit">
            <Image
              src="/search-normal.svg"
              width={isMobile ? 11.16 : 17}
              height={isMobile ? 11.16 : 17} 
              alt="website logo"/>
          </IconButton>
          <Input placeholder="Search" value={value} onChange={(e: any) => onChange(e.target.value)}></Input>
        </Box>
      </Outline>
    </form>
  )
}