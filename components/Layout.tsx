import { ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="text-3xl transform group-hover:scale-110 transition-transform">📈</div>
                <span className="text-xl font-black gradient-text">
                  Stock Signals
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/#features" 
                className="nav-link"
              >
                Features
              </Link>
              <Link 
                href="/#pricing" 
                className="nav-link"
              >
                Pricing
              </Link>
              <Link 
                href="/blog" 
                className="nav-link"
              >
                Blog
              </Link>

              {isLoading ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-200 to-secondary-200 animate-pulse"></div>
              ) : user ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 transition-all group">
                    <img
                      src={user.picture || '/default-avatar.png'}
                      alt={user.name || 'User'}
                      className="w-9 h-9 rounded-full ring-2 ring-primary-400 ring-offset-2 group-hover:ring-primary-500 transition-all"
                    />
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right bg-white rounded-2xl shadow-glow ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={`${
                                active ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                              } group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors mt-2`}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/api/auth/logout"
                              className={`${
                                active ? 'bg-red-50 text-red-700' : 'text-gray-700'
                              } group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors`}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign Out
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center gap-3">
                  <a href="/api/auth/login" className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                    Sign In
                  </a>
                  <a href="/api/auth/login" className="btn-primary">
                    Get Started
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary-600 p-2 rounded-lg hover:bg-white/50 transition-all"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <div className="md:hidden border-t border-white/20 bg-white/80 backdrop-blur-xl">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                href="/#features"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl font-medium transition-all"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl font-medium transition-all"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl font-medium transition-all"
              >
                Blog
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-4 py-2 flex items-center gap-3">
                      <img
                        src={user.picture || '/default-avatar.png'}
                        alt={user.name || 'User'}
                        className="w-10 h-10 rounded-full ring-2 ring-primary-400"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl font-medium transition-all"
                  >
                    Dashboard
                  </Link>
                  <a
                    href="/api/auth/logout"
                    className="block px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
                  >
                    Sign Out
                  </a>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                  <a
                    href="/api/auth/login"
                    className="block btn-primary text-center"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        </Transition>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">📈</span>
                <h3 className="text-xl font-black gradient-text">Stock Signals</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Making stock trading simple and accessible for everyone.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#features" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
                    <span>→</span> Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Stock Signals. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ for traders worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
