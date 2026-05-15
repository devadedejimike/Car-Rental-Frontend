import { useState } from "react";
import { LoginUser, RegisterUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
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
        await RegisterUser({ name, email, password });

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
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      {!isLogin && (
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />

      <button className="bg-black text-white px-4 py-2 w-full">
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        className="text-center cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create account" : "Login instead"}
      </p>
    </form>
  );
};

export default Auth;