import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /encountered pokémons/i })).toBeDefined();
  });
  it(
    'Teste se é exibido todos pokémon',
    () => {
      renderWithRouter(<App />);
      pokemons.forEach((element) => {
        expect(screen.getByText(element.name)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      });
    },
  );
  it(
    'Teste se é exibido o segundo pokémon',
    () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    },
  );
  it(
    'Teste se é exibido os filtros',
    () => {
      renderWithRouter(<App />);
      const filterLength = 7;
      expect(screen.getAllByTestId(/pokemon-type-button/i).length).toBe(filterLength);
      pokemons.forEach((element) => {
        const btn = screen.getByRole('button', { name: element.type });
        expect(btn).toBeInTheDocument();
      });
    },
  );
  it(
    'Teste se é possivel resetar os filtros',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /all/i }));
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    },
  );
});
