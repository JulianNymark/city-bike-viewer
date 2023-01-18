import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('zoom buttons', () => {
  render(<App />);
  const zoomIn = screen.getByRole('button', { name: 'Zoom in' });
  const zoomOut = screen.getByRole('button', { name: 'Zoom out' });
  expect(zoomIn).toBeInTheDocument();
  expect(zoomOut).toBeInTheDocument();
});

test('leaflet attribution link', () => {
  render(<App />);
  const link = screen.getByRole('link', { name: 'A JS library for interactive maps' });
  expect(link).toBeInTheDocument();
});

// test that updateStationState works? (is called from a refresh button, on interval...)