import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o componente favorite', () => {
  test('mostra no favorite pokemon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
  test('mostra os pokemon favoritos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    // expect(screen.getByText(/no favorite pokemon found/i)).not.toBeInTheDocument();
  });
});
