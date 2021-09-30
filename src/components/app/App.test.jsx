import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('tests rendered behavior of App component', () => {
    const { container } = render(<App />);
    expect(container).not.toBeEmptyDOMElement;

    const display = screen.getByLabelText('display');
    expect(display).toHaveStyle({ 'background-color': '#ff0000' });

    const colorPicker = screen.getByLabelText('color-picker');
    fireEvent.change(colorPicker, '#00FF00');
    waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#00ff00' });
    });

    const undoButton = screen.getByText('undo');
    fireEvent.click(undoButton);
    waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#ff0000' });
    });

    const redoButton = screen.getByText('redo');
    fireEvent.click(redoButton);
    waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#00ff00' });
    });

  });
});
