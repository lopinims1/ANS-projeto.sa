import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Login() {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800&h=600&fit=crop'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center bg-[#31303A] text-[#EDF5F6]">

            <div className="w-full max-w-5xl h-135 bg-[#3B3A48] rounded-lg border border-[#6A6684] 
        shadow-lg overflow-hidden flex gap-10 px-4 py-3">

                <div className="h-full w-100 bg-[#31303A] rounded-lg">
                </div>

                <div className="w-100">
                    <h1 className="poppins text-4xl font-light">Log in your account</h1>
                    <form action="">
                        <div className="flex flex-col gap-5 mt-10">
                                <label htmlFor="userEmail">E-mail</label>
                                <input className="input-style" id="userEmail" type="email" placeholder="E-mail" />

                                <label htmlFor="userPassword">Password</label>
                                <input className="input-style" id="userPassword" type="password" placeholder="Password" />
                            
                        </div>
                        <div>
                            <input type="checkbox" name="terms" id="termsBox" />
                            <label htmlFor="terms">Remember me</label>
                        </div>

                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login