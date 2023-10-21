import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
import { checkState } from '../Store/Variables';
function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const setLogin = useSetRecoilState(checkState);
  return (
    <>
      <div className="bg-[#080E26] sticky top-0 z-20 px-4">
        <div className="text-white lg:flex lg:justify-between lg:items-center lg:w-[65%] py-4 lg:mx-auto">
          <div className="flex justify-between items-center overflow-hidden">
            <Link href="/">
              <Image className="h-[76px] w-[75px] lg:h-[75px] lg:w-[85px] cursor-pointer" src="/PostPilot.png" alt="" width={76} height={76} />
            </Link>
            {mobileNav ? (
              <i className="fa-solid fa-xmark lg:hidden visible text-[24px]" onClick={() => {
                setMobileNav(false);
              }}></i>

            ) : (
              <i className="fa-solid fa-bars lg:hidden visible text-[24px]" onClick={() => {
                setMobileNav(true);
              }}></i>

            )}
          </div>
          <div className="lg:flex gap-6 px-9 text-[16px] font-[500] lg:visible hidden">
            <Link href="/">Home</Link>
            <p className=" cursor-pointer">About Us</p>
            <p
              className=" cursor-pointer"
              onClick={() => {
                const navbar = document.getElementById("demo_section"); // Assuming 'navbar' is the id of your navbar element
                const navbarPosition = navbar.offsetTop;

                // Scroll to the navbar position
                window.scrollTo({
                  top: navbarPosition,
                  behavior: "smooth", // Smooth scrolling animation
                });
              }}
            >
              Demo
            </p>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contactus">Contact</Link>
          </div>
          <div className="lg:flex flex-row gap-5 lg:visible hidden">
            <button
              className="text-[20px] font-[300] underline underline-offset-8"
              onClick={() => {
                setLogin({
                  isSignUpOpen: false,
                  isLoginOpen: true,
                });
              }}
            >
              Login
            </button>

            <button
              className="aai-gradient-outline-btn"
              onClick={() => {
                setLogin({
                  isLoginOpen: false,
                  isSignUpOpen: true,
                });
              }}
            >
              Signup
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar