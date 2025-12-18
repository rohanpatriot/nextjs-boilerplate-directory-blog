import Link from 'next/link';
import { directoryConfig } from '@/config/directory.config';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-heading font-semibold">
            {directoryConfig.name}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
