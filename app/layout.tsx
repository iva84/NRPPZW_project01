import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import LinkCard from '@/components/LinkCard';
import { getSession } from '@auth0/nextjs-auth0';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tournaments scedule',
  description: 'Tournaments scedule'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="navbar">
            {session ? (
              <LinkCard path="/api/auth/logout" label="Logout" />
            ) : (
              <LinkCard path="/api/auth/login" label="Login" />
            )}
          </div>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
