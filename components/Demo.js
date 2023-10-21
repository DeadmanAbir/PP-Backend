import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import { checkState } from '../Store/Variables';
function Demo() {
  const setLogin=useSetRecoilState(checkState);


  return (
    <div
      className="bg-[url('/service-1.jpeg')] text-white"
      id="demo_section"
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-center lg:px-0 px-6 py-20 lg:py-28">
        <div className="">
        
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/pqlVewAm-4Q?si=d61_FpMycJ7DXGbA"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-full h-[210px] lg:w-[560px] lg:h-[315px]  rounded-lg"
          ></iframe>
        </div>
        <div className="lg:w-[35%] flex flex-col gap-6 lg:gap-8">
          <h1 className="lg:text-[48px] text-[36px] font-[700] leading-[56px]">
            Create Content in Single Click with AI Power
          </h1>
          <p className="lg:text-[18px] text-[16px] font-[400] leading-[28px]">
            Give our AI a few descriptions and we all automatically create blog
            articles, product descriptions and more for you within just few
            second.
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faCircleCheck} />
              <p className="text-[18px] font-[400] leading-[27px]">
                Country Citizenship
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faCircleCheck} />

              <p>Settling In Country</p>
            </div>
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faCircleCheck} />

              <p>Entering & Leaving From Country</p>
            </div>
          </div>
          <button
            className="aai-gradient-outline-btn w-44"
            onClick={() => {
              const navbar = document.getElementById("cta_form-03-690461"); // Assuming 'navbar' is the id of your navbar element
              const navbarPosition = navbar.offsetTop;

              // Scroll to the navbar position
              window.scrollTo({
                top: navbarPosition,
                behavior: "smooth", // Smooth scrolling animation
              });
              setLogin({
                isSignUpOpen: true,
                isLoginOpen: false,
              });
            }}
          >
            <a href="#cta_form-03-690461" target="_self">
              {" "}
              Get Started
            </a>
          </button>
        </div>
      </div>
    </div>

  )
}

export default Demo