import { render, screen } from '@testing-library/react';
import Page from './pages/index';

describe('テストを', () => {
  it('書け！', () => {
    render(<Page />);
    expect(screen.getAllByText('World!')).toBeTruthy();
  });
});
