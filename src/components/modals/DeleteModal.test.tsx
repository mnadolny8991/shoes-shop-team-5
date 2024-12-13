import { render } from '@/testing/testUtils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteModal from '@/components/modals/DeleteModal';

describe('delete modal', () => {
  test('its showing all components', () => {
    const onDelete = jest.fn();
    const onClose = jest.fn();
    render(
      <DeleteModal
        isOpen={true}
        onDelete={onDelete}
        onClose={onClose}
        title="title"
        bodyText="Are you sure?"
      />
    );

    const title = screen.getByText('title');
    const closeButton = screen.getByTestId('close-button');
    const bodyText = screen.getByText('Are you sure?');
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    const deleteButton = screen.getByRole('button', { name: /Delete/i });

    expect(title).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('is triggering callbacks correctly', () => {
    const onDelete = jest.fn();
    const onClose = jest.fn();
    const modalProps = {
      isOpen: true,
      onDelete,
      onClose,
      title: 'title',
      bodyText: 'Are you sure?',
    };
    const { rerender } = render(<DeleteModal {...modalProps} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();

    rerender(<DeleteModal {...modalProps} />);
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();

    rerender(<DeleteModal {...modalProps} />);
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
