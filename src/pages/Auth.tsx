import { useState } from "react";
import { LoginUser, RegisterUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";


const Auth = () => {
    const {login} = useAuth()

    const[ isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(isLogin){
                const data = await LoginUser({email, password})
                login(data.data.token, data.data.user)
                alert('User Login Successfully')
            }else{
                await RegisterUser({name, email, password});
                alert("Account Created Successfully")
                setIsLogin(true)
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {!isLogin && <input 
                    type="text"
                    value={name}
                    placeholder="Name"
                    className="border py-1 px-2"
                    onChange={(e) => setName(e.target.value)} 
                />}
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    className="border py-1 px-2"
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    value={password}
                    placeholder="Password"
                    className="border py-1 px-2"
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" className="border px-2 py-1">Submit</button>
                <p
                    className="text-sm text-center cursor-pointer"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Register"
                        : "Already have an account? Login"}
                </p>
            </form>
        </div>
    );
};

export default Auth;