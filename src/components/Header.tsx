"use client";
import React, { useState, useEffect } from "react";

// components
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        header
          ? "py-4 bg-white shadow-lg dark:bg-accent"
          : "py-4 dark:bg-background"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-white"}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            {/* nav */}
            <Nav
              containerStyles="hidden md:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all"
              underlineStyles="absolute bottom-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeToggler />
            {/* mobile nav */}
            <div className="md:hidden">
              <MobileNav />
            </div>{" "}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
