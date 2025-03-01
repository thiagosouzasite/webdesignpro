import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon, BellIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-blue-600 font-bold text-xl cursor-pointer">WebDesignPro</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/dashboard">
              <span className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none">
              <BellIcon className="h-6 w-6" />
            </button>
            
            <div className="ml-3 relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                  <span className="text-sm font-medium">WD</span>
                </div>
              </div>
            </div>
            
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/dashboard">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Dashboard</span>
            </Link>
            <Link href="/leads">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Leads</span>
            </Link>
            <Link href="/clientes">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Clientes</span>
            </Link>
            <Link href="/projetos">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Projetos</span>
            </Link>
            <Link href="/orcamentos">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Orçamentos</span>
            </Link>
            <Link href="/produtos">
              <span className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Produtos</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 