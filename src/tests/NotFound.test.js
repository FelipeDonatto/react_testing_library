import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente NotFound', () => {
  it('', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole('heading', { name: /page requested not found/i }),
    ).toBeDefined();
    const imgSource = screen
      .getByRole('img',
        { name: /pikachu crying because the page requested was not found/i });
    const { src } = imgSource;
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
