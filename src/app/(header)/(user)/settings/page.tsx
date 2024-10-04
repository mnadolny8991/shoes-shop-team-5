'use client';

import theme from '@/styles/theme';
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import CustomButton from '@/components/buttons/CustomButton';
import UpdateProfileForm from '@/components/forms/UpdateProfileForm';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { useRouter } from 'next/navigation';
import { getUserData, updateUserData } from '@/lib/api/fetchUserData';
import { useSession } from 'next-auth/react';
import { mapApiUserResponseToAvatar } from '@/mappers/userMappers';
import { ApiUserResponse } from '@/types/api/apiTypes';
import { UserAvatar } from '@/types/user';
import { ApiError } from '@/types/api/apiError';
import { uploadFile } from '@/lib/api/fetchFiles';
import useUpdateAvatarMutation from '@/hooks/useUpdateAvatarMutation';
import useUserData from '@/hooks/useUserData';

export default function UserSettings() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();
  const [_selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, status } = useUserData(session?.id!, session?.accessToken!);
  const { deleteAvatarMutation, updateAvatarMutation } =
    useUpdateAvatarMutation(session?.id!, session?.accessToken!);
  useEffect(() => {
    switch (deleteAvatarMutation.status) {
      case 'success':
        setAvatarUrl('/default-avatar.png');
        setSnackbarMessage('Avatar deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        break;
      case 'error':
        setSnackbarMessage(deleteAvatarMutation.error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        break;
    }
  }, [deleteAvatarMutation.status, deleteAvatarMutation.error]);
  useEffect(() => {
    switch (updateAvatarMutation.status) {
      case 'success':
        setAvatarUrl(updateAvatarMutation.data);
        setSnackbarMessage('Avatar uploaded successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        break;
      case 'error':
        setSnackbarMessage(updateAvatarMutation.error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        break;
    }
  }, [
    updateAvatarMutation.status,
    updateAvatarMutation.error,
    updateAvatarMutation.data,
  ]);

  useEffect(() => {
    if (status === 'success') {
      setAvatarUrl(data.avatar?.url ?? '/default-avatar.png');
    }
  }, [data, status]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDelete = () => {
    deleteAvatarMutation.mutate();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setSnackbarMessage('File exceeds 2MB limit');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('files', file);

      // Trigger the mutation to upload the avatar
      updateAvatarMutation.mutate(formData);
    }
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' },
        ml: { xs: '26px', md: '60px' },
        mt: { xs: '25px', md: 0 },
        mb: '50px',
      }}
    >
      <Box
        sx={{
          maxWidth: '460px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1">My Profile</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: { xs: '10px', md: '33px' },
            mb: { xs: '10px', md: '47px' },
            maxWidth: { xs: '245px', md: '370px' },
          }}
        >
          <Avatar
            alt="User avatar"
            src={avatarUrl}
            sx={{
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              border: '4px solid white',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: '15px', md: '23px' },
            }}
          >
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <CustomButton
              size={isMobile ? 's' : 'm'}
              variant="outlined"
              sx={{ borderRadius: '8px' }}
              onClick={handleAvatarButtonClick}
            >
              Change photo
            </CustomButton>
            <CustomButton
              size={isMobile ? 's' : 'm'}
              variant="contained"
              sx={{ borderRadius: '8px' }}
              onClick={handleDelete}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            mb: { xs: '0px', md: '23px' },
          }}
        >
          Welcome back! Please enter your details to log into your account.
        </Typography>
        <UpdateProfileForm />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
