import React from "react";
import InputField from "../../components/Auth/InputField";
import ButtonAuth from "../../components/Auth/Button";
import { Link, Links } from "react-router";

const Login = () => {
  return (
    <div className="relative">
      <img src="/auth.jpg" alt="" className="h-screen w-screen object-cover " />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent flex items-center  ">
        <div className="bg-white w-[400px] flex flex-col absolute left-[25%] p-4 rounded-sm  shadow-lg shadow-white gap-4 items-start">
          <img src="/vite.svg" alt="" className="h-12 " />
          <h2 className="font-bold text-2xl">Login</h2>
          <form action="" className="flex flex-col gap-3 w-full">
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

            <p className="text-right text-gray-400 hover:text-purple-500 cursor-pointer duration-300">
              <Link to={"/forgetPassword"}>Forget password ?</Link>
            </p>
            <ButtonAuth label={"Login"} />
          </form>
          <p className="text-center text-gray-400 w-full">
            Don't have an account ?{" "}
            <span className="text-purple-500 font-semibold cursor-pointer">
              {" "}
              <Link to={"/signup"}>Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
