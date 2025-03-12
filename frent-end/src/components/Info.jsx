import { FaLongArrowAltRight } from "react-icons/fa";

const Info = () => {
  return (
    <div className="flex h-[80vh]">
      <div className="flex-1/2 relative flex items-center">
        <img
          src="/Info1.jpg"
          alt=""
          className="h-[500px] w-[380px] object-cover rounded-2xl shadow-2xl"
        />
        <img
          src="/Info2.jpg"
          alt=""
          className="h-[192px] w-[192px] object-cover rounded-2xl shadow-2xl absolute top-[380px] left-[332px]"
        />
      </div>
      <div className="flex-1/2 flex justify-center flex-col gap-7">
        <h3 className="text-4xl font-bold">
          Access to Learning <br /> Anytime & Anyware
        </h3>
        <p className="text-gray-500 font-bold">
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like).
        </p>
        <div className="grid grid-cols-2 gap-3 text-gray-400 font-semibold">
          <li>Easy Learning</li>
          <li>Easy Learning</li>
          <li>Affordable</li>
          <li>World Class</li>
        </div>
        <button className="flex  items-center justify-center bg-purple-300 w-1/3 text-purple-900 font-semibold gap-2 rounded-md cursor-pointer px-10 py-4 hover:bg-purple-500 hover:text-white duration-300 hover:rotate-3">
          Learn more <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default Info;
