import { Box, Checkbox, FormControlLabel, Link, Stack, useMediaQuery, useTheme } from "@mui/material"
import CustomButton from "../Buttons/CustomButton"
import TextField from "../InputField/TextField"

export default function SignInForm(){
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return <form>
    <Box maxWidth={isMobile ? 320 : 436}>
        <Stack spacing={2} mt={isMobile ? '25px' : '48px'}>
            <TextField required name="email" id="email" label="Email" min={8}/>
            <TextField required name="password" id="password" label="Password" min={8}/>
        </Stack>
        <Box sx={{
            'display': 'flex',
            'justifyContent': 'space-between',
            'alignItems': 'center',
            'marginTop': isMobile ? '12px' : '16px',
            'marginBottom': isMobile ? '30px': '56px'
        }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" slotProps={{'typography':{'variant':'body2'}}}/>
            <Link variant="body2"  href="/forgot_password">Forgot password?</Link>
        </Box>
        <CustomButton size={isMobile ? 's' : 'l'} variant="contained">Sign in</CustomButton>
    </Box>
    </form>
}