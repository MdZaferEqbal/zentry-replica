import gsap from "gsap";
import Button from "./Button";
import { useRef } from "react";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import React, { useEffect, useState } from "react";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const navbarRef = useRef(null);
  const audioRef = useRef(null);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisibility, setNavVisibility] = useState(true);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setNavVisibility(true);
      navbarRef.current.classList.remove("bg-black", "rounded-lg", "border");
    } else if (currentScrollY > lastScrollY) {
      setNavVisibility(false);
      navbarRef.current.classList.add("bg-black", "rounded-lg", "border");
    } else if (currentScrollY < lastScrollY) {
      setNavVisibility(true);
      navbarRef.current.classList.add("bg-black", "rounded-lg", "border");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navbarRef.current, {
      y: navVisibility ? 0 : -100,
      opacity: navVisibility ? 1 : 0,
      duration: 0.2,
    });
  }, [navVisibility]);

  const toggleAudio = () => {
    setAudioPlaying((prevState) => !prevState);
    setIndicatorActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (audioPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioPlaying]);

  return (
    <div
      ref={navbarRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-0 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a className="cursor-pointer" href="#">
              <img src="/zentry-logo.png" alt="logo" className="w-10 " />
            </a>
            <Button
              id="product-btn"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, key) => (
                <a
                  key={key}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn relative ms-10 font-general text-xs uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer p-3"
              onClick={toggleAudio}
            >
              <audio
                ref={audioRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line h-1 w-px rounded-full b-g-blue-50 transition-all duration-200 ease-in-out  ${
                    indicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
