import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "https://backend-production-1825.up.railway.app/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                alert("Login berhasil!");

                navigate("/admin");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Gagal login");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleLogin}
                className="bg-slate-900 p-8 rounded-xl w-[400px]"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Login Admin
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded mb-4 text-black"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded mb-4 text-black"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="bg-blue-600 w-full p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>

    );

}