import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";
import BackgroundAnimation from "./components/BackgroundAnimation";

function Layout() {

    const location = useLocation();

    const isAdminPage =
        location.pathname === "/admin" ||
        location.pathname === "/login";

    return (

        <>
            <BackgroundAnimation />

            <div className="flex flex-col min-h-screen relative z-10">

                {!isAdminPage && <Navbar />}

                <main className="flex-grow">

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/projects"
                            element={<Projects />}
                        />

                        <Route
                            path="/contact"
                            element={<Contact />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </main>

                {!isAdminPage && <Footer />}

            </div>

        </>

    );

}

export default function App() {

    return (

        <BrowserRouter>
            <Layout />
        </BrowserRouter>

    );

}