import { useState } from "react";
import { login } from "../../services/authService";

export const LoginComponent = () => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(user, password);
            window.location.href = "/dashboard";
        } catch (err) {
            alert("Login failed");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="w-full max-w-md bg-white p-8 rounded-lg shadow" onSubmit={handleLogin}>
                <div className="flex mb-10">
                    <img src="./src/assets/logogyc.png" className="h-20" alt="Logo" />
                </div>
                <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
                <p className="text-center text-gray-600 mb-6">
                    Ingresa tu correo y contraseña para ingresar.
                </p>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="name@mail.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mb-4"
                >
                    SIGN IN
                </button>

                {/* <div className="flex justify-between items-center text-sm text-gray-700">
                    <a href="#" className="font-medium">
                        Forgot Password
                    </a>
                </div> */}
            </form>
        </div>
    );
}
