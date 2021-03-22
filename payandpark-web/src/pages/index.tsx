import React, { useRef } from "react";
import { FiShoppingCart, FiClock, FiSmartphone } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { RiCarLine, RiMoneyEuroCircleLine } from "react-icons/ri";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import AppImage from "../assets/mobile.svg";
// import Image2 from "../assets/multiple.png";

const Landing: React.FC = () => {
  const learnMoreRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <NavBar />

      <div className="w-full flex-1">
        <div
          className="flex items-end bg-cover bg-center w-ful h-40 md:h-420px text-white"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1536483227150-9c0a50b89baf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80)`,
          }}
        ></div>

        <div className="w-full flex flex-col justify-center items-center mt-4 md:mt-16 px-2 select-none">
          <h1 className="font-bold justify-center mt-6 md:mt-0 text-2xl md:text-6xl">
            A easy way to park
          </h1>

          <div className="hidden md:block">
          <p className="flex font-normal items-center justify-center tracking-widest  md:mt-2 text-xs md:text-lg">
            The Easy Parking System eliminates the need for physical money.
          </p>
          <p className="flex font-normal items-center justify-center  tracking-widest  md:mt-0 text-xs md:text-lg">
            It is the easiest way to park your vehicle without having to move.
          </p>
          <p className="flex font-normal items-center justify-center  tracking-widest  md:mt-0 text-xs md:text-lg">
            Buy hours of parking through your mobile in our app.
          </p>
          </div>
          <div className="block md:hidden">
          <p className="flex font-normal items-center justify-center text-center mt-4 tracking-widest  md:mt-2 text-xs md:text-lg">
            The Easy Parking System eliminates the need for physical money.It is the easiest way to park your vehicle without having to move.Buy hours of parking through your mobile in our app.
          </p>

          </div>
          {/* <p className="font-normal items-center justify-center  tracking-widest text-xs md:text-lg">
          euismod felis, ut mollis lacus vulputate in. Nulla facilisis sem nec
          lacinia placerat.
        </p> */}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center my-12 md:my-32">
          <div className="w-full md:w-1/2 select-none w-40 h-auto">
            <img
              className="flex float-right mr-10 hidden md:block"
              src={AppImage}
              alt="mobile_image"
            />
          </div>

          <div className="flex flex-col w-full md:w-1/2   md:mr-10 select-none ">
            <h2 className="flex justify-center md:justify-start text-2xl mt-8 md:mt-0  md:text-3xl font-bold">
              Why use the Pay and Park?
            </h2>
            <h3 className="hidden md:block flex justify-center md:justify-start md:text-xl px-6 md:px-0 font-medium text-purple-200">
              Want to know why to use the Pay and Park system,
              <br /> what forms of payment or other questions?
            </h3>
            <p className="block md:hidden flex font-normal items-center justify-center text-center mt-4 tracking-widest  md:mt-2 text-xs md:text-lg px-4 mb-10">
              Want to know why to use the Pay and Park system, what forms of payment or other questions?
            </p>

            <div className="max-w-lg mt-2 md:mt-10"> 
              <div className="h-auto grid grid-cols-1 md:grid-cols-3 mt-4">
                <div className="flex flex-col items-center text-purple-300">
                  <FiClock size={64} />
                  <p className="flex justify-center text-black text-base font-bold my-8">
                    Faster
                  </p>
                </div>
                <div className="flex flex-col items-center text-purple-300">
                  <FiSmartphone size={64} />
                  <p className="flex justify-center text-black text-base font-bold my-8">
                    All digital
                  </p>
                </div>
                <div className="flex flex-col items-center text-purple-300">
                  <RiMoneyEuroCircleLine size={64} />
                  <p className="flex justify-center text-black text-base font-bold my-8">
                    more practical
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center mt-6 ">
                  <Button className="transition duration-500 ease-in-out bg-purple-200 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 text-white text-base focus:outline-none " 
                      onClick={() => 
                      { learnMoreRef.current && learnMoreRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }}
                  >
                    Learn More
                  </Button>
                  <Button className="transition duration-500 ease-in-out bg-purple-200 h-12 w-48 rounded-3xl border-none px-2 mx-4  mt-1 hover:bg-purple-300 text-white text-base focus:outline-none ">
                    Download our app
                  </Button>
              </div>
            </div>
            {/* <div className="h-40 grid grid-cols-3 grid-flow-col mr-16">
              <FiClock size={64} />
              <p className="flex justify-start col-2 items-center font-bold">
                Faster
              </p>
              <FiSmartphone size={64} />
              <p className="flex justify-start items-center font-bold">
                All digital
              </p>
              <RiMoneyEuroCircleLine size={64} />
              <p className="flex justify-start items-center font-bold">
                more practical
              </p>
            </div> */}
            {/* <p className="flex items-center justify-center md: justify-start mt-10 leading-5 tracking-widest max-w-lg text-xs md:text-lg px-6 md:px-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et scelerisque velit, in scelerisque neque. Phasellus dignissim lorem molestie libero placerat scelerisque. Aenean ac lacus imperdiet, suscipit dolor eget, varius ipsum. Nam consectetur ante vitae tempor malesuada. Etiam vestibulum, quam sit amet euismod tristique, ex metus euismod turpis, eu lobortis nisl eros id urna. Proin ullamcorper, nisl quis maximus convallis, est sapien tincidunt nunc, sit amet mattis velit magna molestie turpis. </p> */}
            
          </div>
        </div>

        <div ref={learnMoreRef} className="flex flex-col bg-purple-100 w-auto h-auto my-20 md:mx-48 py-10 px-10 justify-center items-center rounded-lg">
          <h1 className="font-bold justify-center text-2xl md:text-3xl mb-6">
            See how easy to use Pay and Park
          </h1>

          <div className="h-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center text-purple-300">
              <FaWpforms size={64} />
              <p className="flex justify-center text-black text-base font-bold my-8">
                Make your registration
              </p>
              <p className="flex justify-center text-black text-center  text-base ">
                Use our website or download the app from your smartphone's app
                store and create your registration. It's simple and fast!
              </p>
            </div>
            <div className="flex flex-col items-center text-purple-300">
              <FiShoppingCart size={64} />
              <p className="flex justify-center text-black text-base font-bold my-8">
                Buy Credits
              </p>
              <p className="flex justify-center text-black text-center text-base ">
                Through the app or website, you can buy in advance the amount
                you want in credits, so when you need to park, just allocate!
              </p>
            </div>
            <div className="flex flex-col items-center text-purple-300">
              <RiCarLine size={64} />
              <p className="flex justify-center text-black text-base font-bold my-8">
                Park Easily
              </p>

              <p className="flex justify-center text-black text-center text-base">
                After buying the credits, find a regular spot, use the app and
                ... done! Just park!
              </p>
            </div>
          </div>

          {/* <div className="h-64 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex justify-center items-center text-purple-300">
              <FaWpforms size={64} />
            </div>
            <div className="flex justify-center items-center text-purple-300">
              <FiShoppingCart size={64} />
            </div>
            <div className="flex justify-center items-center text-purple-300">
              <RiCarLine size={64} />
            </div>
            <p className="flex justify-center  text-base font-bold">
              Make your registration
            </p>
            <p className="flex justify-center  text-base font-bold">
              Buy Credits
            </p>
            <p className="flex justify-center  text-base font-bold">
              Park Easily
            </p>
            <p className="flex justify-center text-center  text-base ">
              Use our website or download the app from your smartphone's app store and create your registration. It's simple and fast!
            </p>
            <p className="flex justify-center text-center text-base ">
              Through the app or website, you can buy in advance the amount you want in credits, so when you need to park, just allocate!
            </p>
            <p className="flex justify-center text-center text-base">
              After buying the credits, find a regular spot, use the app and ... done! Just park!
            </p>
          </div> */}

          {/* <div className="w-1/2 hidden md:block">
            <img className="float-right mr-10" src={Image2} alt="" />
          </div>
          <div className="w-full md:w-1/2 justify-center items-center mr-0  md:mr-10">
            <h2 className="text-3xl font-bold">Lorem ipsum Typography</h2>
            <p className="text-base md:text-md mt-10 leading-5 tracking-widest max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              et scelerisque velit, in scelerisque neque. Phasellus dignissim
              lorem molestie libero placerat scelerisque. Aenean ac lacus
              imperdiet, suscipit dolor eget, varius ipsum. Nam consectetur ante
              vitae tempor malesuada. Etiam vestibulum, quam sit amet euismod
              tristique, ex metus euismod turpis, eu lobortis nisl eros id urna.
              Proin ullamcorper, nisl quis maximus convallis, est sapien
              tincidunt nunc, sit amet mattis velit magna molestie turpis.{" "}
            </p>
          </div> */}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
