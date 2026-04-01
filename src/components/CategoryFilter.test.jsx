/**
 * Skenario pengujian CategoryFilter component
 *
 * - CategoryFilter component
 *   - should render all category buttons including Semua
 *   - should call onCategoryChange when a category is clicked
 *   - should show active style on selected category
 *   - should call onCategoryChange with empty string when Semua is clicked
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('should render all category buttons including Semua', () => {
    // arrange
    render(
      <CategoryFilter
        categories={['general', 'react', 'redux']}
        selectedCategory=""
        onCategoryChange={() => {}}
      />,
    );

    // assert
    expect(screen.getByText('Semua')).toBeTruthy();
    expect(screen.getByText('#general')).toBeTruthy();
    expect(screen.getByText('#react')).toBeTruthy();
    expect(screen.getByText('#redux')).toBeTruthy();
  });

  it('should call onCategoryChange when a category is clicked', async () => {
    // arrange
    const onCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={['general', 'react']}
        selectedCategory=""
        onCategoryChange={onCategoryChange}
      />,
    );

    // action
    await userEvent.click(screen.getByText('#general'));

    // assert
    expect(onCategoryChange).toHaveBeenCalledWith('general');
  });

  it('should show active style on selected category', () => {
    // arrange
    const { container } = render(
      <CategoryFilter
        categories={['general', 'react']}
        selectedCategory="general"
        onCategoryChange={() => {}}
      />,
    );

    // assert
    const activeButton = container.querySelector('.category-filter__item--active');
    expect(activeButton.textContent).toBe('#general');
  });

  it('should call onCategoryChange with empty string when Semua is clicked', async () => {
    // arrange
    const onCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={['general']}
        selectedCategory="general"
        onCategoryChange={onCategoryChange}
      />,
    );

    // action
    await userEvent.click(screen.getByText('Semua'));

    // assert
    expect(onCategoryChange).toHaveBeenCalledWith('');
  });
});
