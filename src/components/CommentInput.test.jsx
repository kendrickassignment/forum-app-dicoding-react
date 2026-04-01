/**
 * Skenario pengujian CommentInput component
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call onAddComment when form is submitted
 *   - should clear textarea after successful submit
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('should handle content typing correctly', async () => {
    // arrange
    render(<CommentInput onAddComment={() => {}} />);
    const textarea = screen.getByPlaceholderText('Tulis komentar Anda...');

    // action
    await userEvent.type(textarea, 'Ini komentar saya');

    // assert
    expect(textarea.value).toBe('Ini komentar saya');
  });

  it('should call onAddComment when form is submitted', async () => {
    // arrange
    const onAddComment = vi.fn();
    render(<CommentInput onAddComment={onAddComment} />);
    const textarea = screen.getByPlaceholderText('Tulis komentar Anda...');
    const submitButton = screen.getByRole('button', { name: 'Kirim' });

    // action
    await userEvent.type(textarea, 'Ini komentar saya');
    await userEvent.click(submitButton);

    // assert
    expect(onAddComment).toHaveBeenCalledWith('Ini komentar saya');
  });

  it('should clear textarea after successful submit', async () => {
    // arrange
    const onAddComment = vi.fn();
    render(<CommentInput onAddComment={onAddComment} />);
    const textarea = screen.getByPlaceholderText('Tulis komentar Anda...');
    const submitButton = screen.getByRole('button', { name: 'Kirim' });

    // action
    await userEvent.type(textarea, 'Ini komentar saya');
    await userEvent.click(submitButton);

    // assert
    expect(textarea.value).toBe('');
  });
});
