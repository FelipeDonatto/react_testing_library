import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa o componente about', () => {
  test('', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { name: /about pokédex/i })).toBeInTheDocument();
    expect(
      screen
        .getByText(
          /this application simulates a pokédex/i,
        ),
    ).toBeInTheDocument();
    expect(
      screen
        .getByText(
          /one can filter pokémons by type/i,
        ),
    ).toBeInTheDocument();
    const imgSource = screen
      .getByRole('img', { name: /pokédex/i });
    const { src } = imgSource;
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
