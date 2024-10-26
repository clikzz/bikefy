import { Bike } from 'lucide-react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Íconos de sol y luna
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado del tema

  // Sincronizar el tema con localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Cambiar entre modo claro y oscuro
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <header className="absolute px-4 lg:px-6 h-14 flex items-center w-full">
        <Link className="flex items-center justify-center" href="/">
          <Bike className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Nombre</span>
        </Link>
        <nav className="ml-auto flex items-center">
          {/* Botón de cambio de tema alineado a la derecha */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full ml-4 focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            {isDarkMode ? (
              <FiSun className="text-foreground" size={24} />
            ) : (
              <FiMoon className="text-foreground" size={24} />
            )}
          </button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
