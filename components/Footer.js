// import BiLogoFacebook from "react-icons/fa";
import Image from "next/image";
const Footer = () => {
    return (
      <div className="bg-[url('/footer-bg.jpeg')] text-white lg:pt-44">
        <div className="flex flex-col lg:w-[70%] mx-auto">
          <div className="flex lg:flex-row flex-col lg:items-center lg:px-0 px-6 lg:justify-evenly">
            <div className="flex flex-col gap-6 lg:w-[30%]">
              <Image
                src="/PostPilot.png"
                alt=""
                width={100}
                height={100}
              />
              <p className="text-[18px] font-[400] leading-[27px]">
                We provide one-stop solutions for all IT items; your bliss is just
                a click away. Star Tech trusts in quality client
              </p>
              <div className="flex gap-5">
                <div className="bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f text-gray-400"></i>
                  </a>
                </div>
                <div className="bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter text-gray-400"></i>
                  </a>
                </div>
                <div className="bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram text-gray-400"></i>
                  </a>
                </div>
                <div className="bg-gray-800 rounded-full w-10 h-10 flex justify-center items-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube text-gray-400"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col my-10 lg:my-0 gap-5">
              <h1 className="text-[24px] font-[700] leading-[34px]">Links</h1>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Home
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Service
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Pricing
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                About US
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Feature
              </p>
            </div>
            <div className="flex flex-col my-8 lg:my-0 gap-5">
              <h1 className="text-[24px] font-[700] leading-[34px]">Artworks</h1>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                3D Artworks
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Photography
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                PriFlat Illustrationcing
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Intro Videos
              </p>
            </div>
            <div className="flex flex-col my-8 lg:my-0 gap-5">
              <h1 className="text-[24px] font-[700] leading-[34px]">Community</h1>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Global Partners
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Forum
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Virtual World
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Community
              </p>
              <p className="text-[16px] font-[400] leading-[24px] hover:text-orange-400">
                Brand Assets
              </p>
            </div>
          </div>
          <div className="text-center lg:py-20 py-10">
            <hr className="py-2 text-gray-600" />
            <p className="text-[18px] font-[400] leading-[28px]">
              Copyright @2023 Aai inc.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;