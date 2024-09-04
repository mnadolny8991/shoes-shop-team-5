"use client";

import { Box, Typography, Link, useTheme, useMediaQuery } from "@mui/material";
import TextField from "../input/TextField";
import CustomButton from "../buttons/CustomButton";
import { useState } from "react";
import useValidate from "@/hooks/useValidate";
import { nameValidator } from "@/lib/validators";

export default function SignupForm() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const[name, setName] = useState("")
  const[email,setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [ confPass, setConfPass] = useState("")

  const [isFirstInteractionName, setIsFirstInteractionName] = useState(false)

  const {error:nameError} = useValidate(name, nameValidator, isFirstInteractionName)


  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: isMobile ? '320px' : '436px',
          gap: '22px',
        }}
      >
        <TextField required name='name' id='name' label='Name' min={3} value={name} onChange={(e) => setName(e.target.value)} onBlur={()=>setIsFirstInteractionName(true)} placeholder="Hayman Andrews" error={nameError} />
        <TextField required name='email' id='email' label='Email' min={8} value={email} onChange={(e) =>  setEmail(e.target.value)} placeholder="example@email.com"/>
        <TextField required name='password' id='password' label='Password' min={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField required name='confirm-password' id='confirm-password' label='Confirm password' min={8} value={confPass} onChange={(e) => setConfPass(e.target.value)} />

        <Box
          sx={{
            marginTop: isMobile ? '29px' : '68px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <CustomButton size={isMobile ? 's' : 'l'} variant='contained' type='submit'>
            Sign Up
          </CustomButton>
          <Typography
            variant='caption'>
            Already have an account?
            <Link sx={{
              marginLeft: isMobile ? '5px' : '7px',
            }} href='/sign-in' color='primary'>Log in</Link>
          </Typography>
        </Box>
      </Box>
    </form>
  )
}