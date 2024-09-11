'use client';

import CustomModal from './CustomModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  bodyText: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  title,
  bodyText,
}: Props) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onDelete}
      title={title}
      bodyText={bodyText}
    />
  );
}
