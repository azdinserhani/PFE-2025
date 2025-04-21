import InputField from "../Auth/InputField";
import ButtonAuth from "../Auth/Button";
const Message = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-1/2 m-5">
        <img
          src="/pman.svg"
          alt="Person illustration"
          className="w-[643px] h-[643px]"
        />
      </div>      
      <div className="flex flex-1/2 flex-col ">
        <form
          action=""
          className="w-[60%] flex flex-col gap-4 p-3 border border-gray-200 rounded-2xl"
        >
          <div className="mb-10">
            <h2 className="font-bold text-3xl">Get in touch !</h2>
          </div>
          <div className="flex gap-3 w-full ">
            <InputField
              label={"Your Name :"}
              placeholder={"Your Name :"}
              id={"name"}
              type={"text"}
            />

            <InputField
              label={"Your Email:"}
              placeholder={"Email:"}
              id={"email"}
              type={"email"}
            />
          </div>
          <div className="w-full">
            <InputField
              label={"Your Question:"}
              placeholder={"subject"}
              id={"question"}
              type={"text"}
            />
          </div>
          <textarea
            name="Comm"
            id=""
            className="my-3  h-20 focus:border-b-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500  border border-gray-200 rounded-lg p-3"
            placeholder="Your Comment"
          ></textarea>
          <ButtonAuth label={"Send message"} />
        </form>
      </div>
    </div>
  );
};

export default Message;
