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

            <div className="w-full max-w-5xl h-135 m-5 bg-[#3B3A48] rounded-lg border border-[#6A6684] 
            shadow-lg overflow-hidden flex gap-15 px-4 py-3">

                <div className="relative h-full w-100 bg-[#31303A] rounded-lg">
                    {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Imagem ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentImage
                                            ? 'bg-[#96DAE3] w-6'
                                            : 'bg-white/50 w-2 hover:bg-white/75'
                                            }`}
                                    />
                                ))}
                            </div>
                </div>

                <div className="w-100 h-full">
                    <h1 className="poppins mt-10 text-4xl font-light">Log in your account</h1>
                    <form action="">
                        <div className="flex flex-col gap-3 mt-12">

                            <div className="flex flex-col gap-1">
                                <label htmlFor="userEmail" className="ml-2 poppins font-light text-md">E-mail</label>
                                <input className="input-style" id="userEmail" type="email" placeholder="email@gmail.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="userPassword" className="ml-2 poppins font-light text-md">Password</label>
                                <input className="input-style" id="userPassword" type="password" placeholder="password123@!*" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-1 ml-2">
                                <input type="checkbox" name="terms" id="termsBox"
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#4A485B] checked:bg-[#96DAE3]
                                cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-[#31303A] checked:after:text-xs checked:after:left-1 
                                checked:after:-top-0.2" />
                                <label htmlFor="terms" className="poppins text-sm font-light">Remember me</label>
                            </div>
                            <span className="poppins text-sm font-light underline hover:no-underline"><a href="">Forgot my password</a></span>
                        </div>

                        <button type="submit" id="loginBtn" className="bg-[#96DAE3] w-full text-[#31303A] py-2 px-4 mt-10 cursor-pointer hover:opacity-80 btn-style">login</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login