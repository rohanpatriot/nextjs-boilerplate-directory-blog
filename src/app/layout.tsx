import type { Metadata } from 'next';
import { Cormorant_Garamond, Nunito } from 'next/font/google';
import { cn } from '@/lib/utils';
import { generateBaseMetadata } from '@/lib/metadata';
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/structured-data';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const fontHeading = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
});

const fontBody = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = generateBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <JsonLd
          data={[generateOrganizationSchema(), generateWebSiteSchema()]}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: 'bg-card border-border text-card-foreground shadow-editorial-lg',
                title: 'font-heading font-medium',
                description: 'text-muted-foreground text-caption',
                actionButton: 'bg-primary text-primary-foreground',
                cancelButton: 'bg-muted text-muted-foreground',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
