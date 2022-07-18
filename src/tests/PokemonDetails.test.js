import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe(
  'Teste o componente <PokemonDetails.js />',
  () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    });

    it(
      'Teste se as informações detalhadas do pokémon selecionado são mostradas na tela',
      () => {
        expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
        expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
        expect(screen
          .getByRole('heading', { name: /pikachu details/i }))
          .toBeInTheDocument();

        expect(screen
          .getByTestId('pokemon-weight').innerHTML)
          .toBe('Average weight: 6.0 kg');
        expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
        expect(screen
          .getByText(/this intelligent pokémon roasts hard berries/i))
          .toBeInTheDocument();
      },
    );
    it(
      'Teste se existe na página uma seção com os mapas contendo as localizações',
      () => {
        expect(screen
          .getByRole('heading', { name: /game locations of pikachu/i }))
          .toBeInTheDocument();
        const location = screen.getAllByAltText('Pikachu location');
        expect(location).toHaveLength(2);
        expect(location[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
        expect(location[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      },
    );
    it(
      'Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
      () => {
        fireEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
        expect(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }))
          .toBeChecked();
        fireEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
        expect(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }))
          .not.toBeChecked();
      },
    );
  },
);
