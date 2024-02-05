/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setIsLogin(status);
    setError(null);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/${endpoint}`, {
        email,
        password,
      });

      if (response.data?.error) {
        // console.log(response.data.error);
        setError("Something Went Wrong!!!");
      } else if (
        response.data.message === "User does not exist!!" ||
        response.data.message === "Login failed!!!"
      ) {
        setError("Email or Password incorrect!!");
        return;
      } else {
        // console.log(response.data);
        setError("");
        setCookie("Email", response.data.email);
        setCookie("AuthToken", response.data.token);

        window.location.reload();
      }
    } catch (error) {
      console.log("ERROR :: Login :: Signin ", error);
    }
  };

  return (
    <div className="flex-inline flex-wrap   p-12   h-max mx-auto  bg-transparent shadow-2xl  ">
      <div className="w-full p-3">
        <form className="flex flex-col p-4  justify-center items-center flex-wrap shrink w-full">
          <h1 className="text-3xl font-extrabold text-sky-200 pb-4 font-serif ">
            {isLogin ? "Please Log in" : "Please sign up!"}
          </h1>
          <input
            required
            type="email"
            placeholder="email"
            className="w-full bg-slate-900 m-2 p-1  rounded-lg placeholder:text-white text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type=" password"
            placeholder="password"
            className="bg-slate-900 m-2 w-full p-1 rounded-lg shadow-lg placeholder:text-white text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password "
              placeholder="confirm password"
              className="w-full bg-slate-900 m-2 p-1  rounded-lg placeholder:text-white text-white"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="bg-green-300 p-1 m-1 w-full rounded-lg border-green-600 border hover:bg-green-400"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p className="text-red-600 font-bold">{error}</p>}
        </form>

        <div className="flex justify-betweep-1 gap-3 rounded">
          <button
            className="w-full bg-blue-500 rounded-xl shadow hover:bg-blue-600"
            onClick={() => viewLogin(false)}
          >
            SignUp
          </button>
          <button
            className="w-full bg-blue-500 p-2 rounded-xl shadow hover:bg-blue-600"
            onClick={() => viewLogin(true)}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
