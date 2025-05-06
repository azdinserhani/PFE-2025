import React, { useState } from "react";
import { Link } from "react-router";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiUser
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/ApiCalls";

// Add this CSS at the top of the file
const errorAnimation = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-animation {
  animation: shake 0.5s ease-in-out, slideDown 0.3s ease-out;
}

.field-error-animation {
  animation: slideDown 0.2s ease-out;
}
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { error } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: "",
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // First Name validation
    if (!user.firstName.trim()) {
      tempErrors.firstName = "First name is required";
      isValid = false;
    } else if (user.firstName.length < 2) {
      tempErrors.firstName = "First name is too short";
      isValid = false;
    }

    // Last Name validation
    if (!user.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
      isValid = false;
    } else if (user.lastName.length < 2) {
      tempErrors.lastName = "Last name is too short";
      isValid = false;
    }

    // Email validation
    if (!user.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!user.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(user.password)) {
      tempErrors.password = "Password must contain at least one number";
      isValid = false;
    }

    // Terms validation
    if (!acceptTerms) {
      tempErrors.terms = "You must accept the terms and conditions";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      registerUser(dispatch, user);
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const renderFieldError = (error) => {
    if (!error) return null;
    return (
      <div
        className="flex items-center gap-1 mt-1 text-sm field-error-animation"
        style={ { color: theme.error } }
      >
        <FiAlertCircle size={ 14 } />
        <span>{ error }</span>
      </div>
    );
  };

  return (
    <>
      <style>{ errorAnimation }</style>
      <div
        className="min-h-screen flex"
        style={ { backgroundColor: theme.background } }
      >
        {/* Left side - Theme colored background with image */ }
        <div
          className="hidden md:flex md:flex-col md:w-1/2 text-white p-10 relative overflow-hidden"
          style={ {
            background: `linear-gradient(to bottom, ${theme.primary}dd, ${theme.primary}ff)`,
          } }
        >
          <div className="flex flex-col h-full justify-between z-10 relative">
            {/* Top section */ }
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBookOpen size={ 40 } color={ theme.primary } />
                <h1 className="text-3xl font-bold tracking-widest">EdClub</h1>
              </div>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition duration-300"
                style={ { backgroundColor: `${theme.cardBg}20` } }
              >
                Back to website <FiArrowRight size={ 14 } />
              </Link>
            </div>

            {/* Bottom section */ }
            <div>
              <h2 className="text-3xl font-bold leading-tight mb-6">
                Capturing Moments,
                <br />
                Creating Memories
              </h2>

              {/* Pagination dots */ }
              <div className="flex gap-2 mt-4">
                <div
                  className="w-6 h-1 rounded-full"
                  style={ { backgroundColor: `${theme.cardBg}40` } }
                ></div>
                <div
                  className="w-6 h-1 rounded-full"
                  style={ { backgroundColor: `${theme.cardBg}40` } }
                ></div>
                <div
                  className="w-6 h-1 rounded-full"
                  style={ { backgroundColor: theme.cardBg } }
                ></div>
              </div>
            </div>
          </div>

          {/* Background image overlay */ }
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
            style={ { backgroundImage: "url('/auth-bg.jpg')" } }
          ></div>
        </div>

        {/* Right side - Form */ }
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1
                className="text-4xl font-bold mb-3"
                style={ { color: theme.text } }
              >
                Create an account
              </h1>
              <p style={ { color: theme.secondary } }>
                Already have an account?
                <Link
                  to="/signin"
                  className="hover:underline ml-1 font-medium"
                  style={ { color: theme.primary } }
                >
                  Log in
                </Link>
              </p>
            </div>

            <form onSubmit={ handleSubmit } className="space-y-5">
              { error && (
                <div
                  className="p-4 rounded-md text-sm flex items-center gap-2 error-animation"
                  style={ {
                    backgroundColor: `${theme.error}15`,
                    color: theme.error,
                    border: `1px solid ${theme.error}30`,
                    boxShadow: `0 2px 4px ${theme.error}10`,
                  } }
                >
                  <FiAlertCircle size={ 18 } />
                  <span className="font-medium">{ error }</span>
                </div>
              ) }

              {/* Name fields side by side */ }
              <div className="flex gap-4">
                <div className="w-1/2">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={ user.firstName }
                      onChange={ handleChange }
                      placeholder="First name"
                      className={ `w-full rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 transition duration-300 ${errors.firstName ? "border-2 error-animation" : ""
                        }` }
                      style={ {
                        backgroundColor: theme.cardBg,
                        color: theme.text,
                        borderColor: errors.firstName ? theme.error : theme.border,
                      } }
                    />
                    <FiUser
                      className={ `absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.firstName ? "error-animation" : ""}` }
                      size={ 20 }
                      style={ { color: errors.firstName ? theme.error : theme.secondary } }
                    />
                  </div>
                  { renderFieldError(errors.firstName) }
                </div>
                <div className="w-1/2">
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={ user.lastName }
                      onChange={ handleChange }
                      placeholder="Last name"
                      className={ `w-full rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 transition duration-300 ${errors.lastName ? "border-2 error-animation" : ""
                        }` }
                      style={ {
                        backgroundColor: theme.cardBg,
                        color: theme.text,
                        borderColor: errors.lastName ? theme.error : theme.border,
                      } }
                    />
                    <FiUser
                      className={ `absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.lastName ? "error-animation" : ""}` }
                      size={ 20 }
                      style={ { color: errors.lastName ? theme.error : theme.secondary } }
                    />
                  </div>
                  { renderFieldError(errors.lastName) }
                </div>
              </div>

              {/* Email field */ }
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={ user.email }
                    onChange={ handleChange }
                    placeholder="Email"
                    className={ `w-full rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 transition duration-300 ${errors.email ? "border-2 error-animation" : ""
                      }` }
                    style={ {
                      backgroundColor: theme.cardBg,
                      color: theme.text,
                      borderColor: errors.email ? theme.error : theme.border,
                    } }
                  />
                  <FiMail
                    className={ `absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.email ? "error-animation" : ""}` }
                    size={ 20 }
                    style={ { color: errors.email ? theme.error : theme.secondary } }
                  />
                </div>
                { renderFieldError(errors.email) }
              </div>

              {/* Password field with visibility toggle */ }
              <div>
                <div className="relative">
                  <input
                    type={ showPassword ? "text" : "password" }
                    name="password"
                    value={ user.password }
                    onChange={ handleChange }
                    placeholder="Create a password"
                    className={ `w-full rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 transition duration-300 ${errors.password ? "border-2 error-animation" : ""
                      }` }
                    style={ {
                      backgroundColor: theme.cardBg,
                      color: theme.text,
                      borderColor: errors.password ? theme.error : theme.border,
                    } }
                  />
                  <button
                    type="button"
                    onClick={ () => setShowPassword(!showPassword) }
                    className={ `absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.password ? "error-animation" : ""}` }
                    style={ { color: errors.password ? theme.error : theme.secondary } }
                  >
                    { showPassword ? <FiEyeOff size={ 20 } /> : <FiEye size={ 20 } /> }
                  </button>
                </div>
                { renderFieldError(errors.password) }
              </div>

              {/* Terms checkbox */ }
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={ acceptTerms }
                    onChange={ () => {
                      setAcceptTerms(!acceptTerms);
                      if (errors.terms) {
                        setErrors({ ...errors, terms: "" });
                      }
                    } }
                    className={ `w-4 h-4 rounded border focus:ring-offset-0 ${errors.terms ? "error-animation" : ""}` }
                    style={ {
                      borderColor: errors.terms ? theme.error : theme.border,
                      backgroundColor: acceptTerms ? theme.primary : theme.cardBg,
                    } }
                  />
                </div>
                <div className="ml-2">
                  <label
                    htmlFor="terms"
                    className="text-sm"
                    style={ { color: errors.terms ? theme.error : theme.text } }
                  >
                    I agree to the{ " " }
                    <a
                      href="#"
                      className="hover:underline"
                      style={ { color: theme.primary } }
                    >
                      Terms & Conditions
                    </a>
                  </label>
                  { renderFieldError(errors.terms) }
                </div>
              </div>

              {/* Submit button */ }
              <button
                type="submit"
                disabled={ loading }
                className="w-full py-3 rounded-md font-medium transition duration-300"
                style={ {
                  backgroundColor: theme.primary,
                  color: theme.cardBg,
                  opacity: loading ? 0.7 : 1,
                } }
              >
                { loading ? "Creating account..." : "Create account" }
              </button>

              {/* Social login divider */ }
              <div className="flex items-center my-6">
                <div
                  className="flex-grow h-px"
                  style={ { backgroundColor: theme.border } }
                ></div>
                <span className="px-3 text-sm" style={ { color: theme.secondary } }>
                  Or register with
                </span>
                <div
                  className="flex-grow h-px"
                  style={ { backgroundColor: theme.border } }
                ></div>
              </div>

              {/* Social login buttons */ }
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition duration-300"
                  style={ {
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                  } }
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition duration-300"
                  style={ {
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                  } }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 384 512"
                    style={ { fill: theme.text } }
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
