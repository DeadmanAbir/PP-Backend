import Image from "next/image";
const Card = () => {
    return (
      <div className="bg-[url('/card-bg.jpeg')] py-28 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row justify-center px-5 lg:px-0 lg:py-12 lg:pl-20 rounded-3xl text-white">
          <div className="lg:w-[28%] lg:pr-[-50px] border-2 bg-[#111629] border-gray-500 lg:py-10 px-6 py-8 lg:px-16 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
            <Image src="/Add-User.svg" alt="" width={40} height={40} />
            <h1 className="text-[24px] font-[700] leading-[28.8px] text-start py-4">
              Select post niece
            </h1>
            <p className="text-[18px] font-[400] text-gray-500">
              Simply choose a niece from available list to write content.
            </p>
          </div>
          <div className="lg:w-[28%] lg:border-r-0 bg-[#111629] px-6 py-8 lg:border-l-0 border-2 border-gray-500 lg:py-10 lg:px-12">
            <Image src="/Home.svg" alt="" width={40} height={40} />
            <h1 className="text-[24px] font-[700] leading-[28.8px] text-start py-4">
              Select the intensity
            </h1>
            <p className="text-[18px] font-[400] text-gray-500">
              Provide our AI content writer with few sentences.
            </p>
          </div>
          <div className="lg:w-[28%] lg:pr-[-50px] bg-[#111629] border-2 border-gray-500 px-6 py-8 lg:py-10 lg:px-16 rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
            <Image src="/Wallet.svg" alt="" width={40} height={40} />
            <h1 className="text-[24px] font-[700] leading-[28.8px] text-start py-4">
              Generate and post quality content
            </h1>
            <p className="text-[18px] font-[400] text-gray-500">
              Our powerful AI tools will generate content in few second
            </p>
          </div>
        </div>
      </div>
    );
  
   
  };
  
  export default Card;