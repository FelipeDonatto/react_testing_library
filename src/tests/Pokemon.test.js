import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  it('testa o card do pokemon', () => {
    renderWithRouter(<App />);
    pokemons.forEach((element) => {
      const textExpected = `Average weight: ${element.averageWeight.value}`;
      const name = `${element.name} sprite`;
      const img = screen.getByRole('img', { name });
      const { src } = img;
      expect(screen.getByText(element.name)).toBeInTheDocument();
      expect(screen.getAllByText(element.type).length).toBeGreaterThan(1);
      expect(img).toBeInTheDocument();
      expect(src).toBe(element.image);
      expect(screen.getByAltText(name)).toBeInTheDocument();
      expect(screen
        .getByText(
          `${textExpected} ${element.averageWeight.measurementUnit}`,
        )).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
  it('exibe os detalhes do primeiro pokemon', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('exibe os detalhes do segundo pokemon', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/4');
  });
  it('exibe a estrela caso seja favoritado', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    const starIcon = screen.getByRole('img', {
      name: /charmander is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('star-icon.svg');
  });
});
