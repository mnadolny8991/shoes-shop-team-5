"use client"
import Image from "next/image"
import SignInForm from "@/components/RegistrationForms/SignInForm"
import { Box, Divider, Link, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material"

export default function SignIn() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const Logo = styled(Link)(() => ({
        marginTop: isMobile ? 18 : 50,
        marginLeft: isMobile ? 20 : 40,
        display: 'inline-block'
    }))

    return (
        <Stack direction="row">
            <Box sx={{ 'flex': 1 }}>
                <Logo href="/">
                    <Image
                        src="/logo.svg"
                        width={isMobile ? 35 : 40}
                        height={isMobile ? 26.5 : 30}
                        alt="website logo"
                    />
                </Logo>
                {isMobile && <Divider />}
                <Box margin={isMobile ? '35px  calc((100vw - 320px) / 2)' : '20% calc((50vw - 436px) / 3)'}>
                    <Typography variant="h1">Welcome back</Typography>
                    <Typography variant="subtitle2">Welcome back! Please enter your details to log into your account.</Typography>
                    <SignInForm />
                    <Typography
                        mt={isMobile ? '16px' : '24px'}
                        maxWidth={isMobile ? 320 : 436}
                        align="center"
                        variant="body2"
                    >Don't have an account? <Link href="/sign_up">Sign up</Link></Typography>
                </Box>
            </Box>
            {!isMobile &&
                <Box sx={{ 'flex': 1}}>
                    <Image
                        alt="pexels-melvin-buezo"
                        src="/pexels-melvin-buezo-2529148.png"
                        sizes="50vw"
                        width={960}
                        height={1112}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </Box>
            }
        </Stack>
    )
}