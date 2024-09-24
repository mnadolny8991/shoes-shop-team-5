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

import { useMutation, useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import token from '@/data/token';
import { useRouter } from 'next/navigation';
import { getUserData, updateUserData } from '@/lib/fetchUserData';
import { useSession } from 'next-auth/react';

export default function UserSettings() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const userId = 679; // Test user ID

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      return response.json();
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Failed to delete user:', error);
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error uploading avatar');
      }
      const imageData = await response.json();
      const imageId = imageData[0]?.id;
      const updateResponse = await updateUserData(userId, session?.accessToken!, {
        avatar: imageId,
      });
      if (!updateResponse.ok) {
        throw new Error('Error updating user avatar');
      }
      return imageData[0]?.url; // Return the avatar URL
    },

    onSuccess: (newAvatarUrl) => {
      console.log('Avatar uploaded successfully:', newAvatarUrl);
      setAvatarUrl(newAvatarUrl);
      setSnackbarMessage('Avatar uploaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: (error) => {
      console.error('Failed to upload avatar:', error);
      setSnackbarMessage('Failed to upload avatar');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  const { data, status } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId, session?.accessToken!),
  });

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
    deleteUserMutation.mutate(userId);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.error('File size exceeds 2MB limit');
        return;
      }
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('files', file);

      // Trigger the mutation to upload the avatar
      uploadAvatarMutation.mutate(formData);
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
