import { useState } from "react";
import { LoginUser, RegisterUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../assets/BackButton";

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await LoginUser({ email, password });

        login(res.data.token, res.data.user);

        alert("Login successful");

        // role-based redirect
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user");
        }

      } else {
        await RegisterUser({ username, email, password });

        alert("Account created");

        setIsLogin(true);
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
        <BackButton/>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-7">
      {/* Dynamic Header */}
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-900">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
      </div>

      {!isLogin && (
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Username</label>
          <input
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
      )}

      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1">Email Address</label>
        <input
          placeholder="johndoe@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
          required
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1">Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-200 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
          required
        />
      </div>

      <button className="bg-black text-white py-2.5 w-full rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors pt-2">
        {isLogin ? "Sign In" : "Register"}
      </button>

      <p
        className="text-center text-xs text-gray-500 cursor-pointer hover:text-black hover:underline transition-colors pt-1"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </p>
    </form>
    </div>
  );
};

export default Auth;