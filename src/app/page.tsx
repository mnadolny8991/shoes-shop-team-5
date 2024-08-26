"use client";

import TextField from "@/components/InputField/TextField";
import CustomButton from "@/components/Buttons/CustomButton";
import { Container } from "@mui/material";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TextField
        required={true}
        name="input"
        id="input"
        label="Label Text"
        min={8}
        error="Message under the input field"
      />
      <CustomButton
        size="m"
        variant="contained"
        onClick={(e) => setIsOpen(true)}
      >
        Open Modal
      </CustomButton>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={() => null}
      />
    </>
  );
}
