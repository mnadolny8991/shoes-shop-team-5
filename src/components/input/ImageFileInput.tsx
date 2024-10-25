'use client';

import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function ImageFileInput({
  onFileUpload,
}: {
  onFileUpload: (file: FileList) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) =>
    files?.[0] && onFileUpload(files);

  return (
    <Stack
      width="100%"
      height="100%"
      border={dragOver ? '2px dashed' : '1px dashed'}
      borderColor={dragOver ? 'text.primary' : 'text.secondary'}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <img src="/gallery.svg" alt="gallery" width={38} height={38} />
      <Typography variant="subtitle2">
        Drop your image here, or select
        <Button
          component="label"
          sx={{
            pt: '2px',
            color: 'rgb(20, 30, 122)',
            textDecoration: 'underline',
          }}
        >
          <Typography
            variant="subtitle2"
            component="span"
            color="rgb(20, 30, 122)"
          >
            click to browse
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </Button>
      </Typography>
    </Stack>
  );
}
