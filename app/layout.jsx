import React from 'react';
import Navbar from '@/components/Navbar';
import '@/assets/styles/global.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Property App | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
