import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthPage from '../src/app/pages/login/page';
import { AuthProvider } from "../src/context/AuthContext";
import { createMockRouter } from 'next-router-mock'; // You can use next-router-mock package
import { RouterContext } from 'next-router-mock'; // Import RouterContext from next-router-mock

jest.mock('next/router', () => require('next-router-mock')); // Mock the next/router

describe('AuthPage Component', () => {
  test('renders without crashing', () => {
    // Render the AuthPage component wrapped in AuthProvider and RouterContext
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AuthProvider>
          <AuthPage />
        </AuthProvider>
      </RouterContext.Provider>
    );

    // Check if the title for login is displayed
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
