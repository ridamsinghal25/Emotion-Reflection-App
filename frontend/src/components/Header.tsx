import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold text-gray-900">MoodMirror</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="space-x-8">
            <Link to="/emotions">
              <Button variant="ghost">
                <span className="relative z-10">Emotions</span>
              </Button>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="flex justify-end items-center p-4 gap-4 h-16 ">
            <div className="hidden md:flex gap-3">
              <SignedOut>
                <SignInButton>
                  <Button type="button" variant="outline">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button type="button">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <SignedOut>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                <svg
                  className="h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <SignedOut>
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="pt-4 pb-2 border-t border-gray-200 mt-4 flex flex-col gap-2">
                  <SignInButton>
                    <Button type="button" variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button type="button" className="w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </SignedOut>
        )}
      </div>
    </header>
  );
}
