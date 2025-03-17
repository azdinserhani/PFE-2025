import React from "react";
import InputField from "../../components/Auth/InputField";
import ButtonAuth from "../../components/Auth/Button";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div className="relative">
      <img src="/auth.jpg" alt="" className="h-screen w-screen object-cover " />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent flex items-center  ">
        <div className="bg-white w-[400px] flex flex-col absolute left-[25%] p-4 rounded-sm  shadow-lg shadow-white gap-4 items-start">
          <img src="/vite.svg" alt="" className="h-12 " />
          <h2 className="font-bold text-2xl">Signup</h2>
          <form action="" className="flex flex-col gap-3 w-full">
            <InputField
              placeholder={"your name"}
              type={"text"}
              id={"name"}
              label={"Your name"}
            />
            <InputField
              placeholder={"name@exemple.com"}
              type={"email"}
              id={"email"}
              label={"Email Address:"}
            />
            <InputField
              placeholder={"password"}
              type={"password"}
              id={"pass"}
              label={" Password:"}
            />
            <InputField
              placeholder={"Confirm password"}
              type={"password"}
              id={"conPass"}
              label={"Confirm Password:"}
            />

            <ButtonAuth label={"Sign Up"} />
          </form>
          <p className="text-center text-gray-400 w-full">
            Already have an account ?
            <span className="text-purple-500 font-semibold cursor-pointer">
              { " " }
              <Link to={"/signin"}>
              Sign In
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
