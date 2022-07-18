import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('contém os 3 links', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /home/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /about/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /favorite pokémons/i })).toBeDefined();
  });
  it('testa se o primeiro link leva para o home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /home/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('testa se o segundo link leva para o about', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /about/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('testa se o terceiro link leva para o favorites', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('testa se uma url inexistente retorna not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('sla');
    expect(
      screen.getByRole('heading', { name: /page requested not found/i }),
    ).toBeDefined();
  });
});
