import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image";
import IconButton from "@mui/material/IconButton";

const variants = {
  header: {
    imgWidth: 17,
    fontSize: "15px",
    fontWeight: "500",
    lineHeight: "17.6px",
    gap: "12px"
  },
  popupLarge: {
    imgWidth: 28,
    fontSize: "25px",
    fontWeight: "400",
    lineHeight: "28.96px",
    gap: "12px"
  },
  popupMobile: {
    imgWidth: 11.16,
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "11.73px",
    gap: "8px"
  },
  filters: {
    imgWidth: 12,
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "14.08px",
    gap: "8px"
  }
};

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
    paddingInline: "2%",
  }
}));

const Input = styled("input")(({ theme }) => ({
  all: "unset",
  color: theme.palette.text.secondary,
  width: "100%",
}));

type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
  width: number | string,
  height: number | string,
  variant: keyof typeof variants,
}

export default function SearchBar({ value, onChange, width, height, variant }: SearchBarProps) {
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
          gap: variants[variant].gap,
          width: "100%",
        }}>
          <IconButton type="submit">
            <Image
              src="/search-normal.svg"
              width={variants[variant].imgWidth}
              height={variants[variant].imgWidth} 
              alt="website logo"/>
          </IconButton>
          <Input 
            placeholder="Search" 
            value={value} 
            onChange={(e: any) => onChange(e.target.value)} 
            sx={{
              fontSize: variants[variant].fontSize,
              fontWeight: variants[variant].fontWeight,
              lineHeight: variants[variant].lineHeight,
            }} />
        </Box>
      </Outline>
    </form>
  )
}