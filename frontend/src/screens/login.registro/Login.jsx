import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

function Login() {
    const [currentImage, setCurrentImage] = useState(0);

    const { login } = useAuth()
    const navigate = useNavigate()

    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const images = [
        './public/mulherImg.png',
        './public/mulherImg2.png',
    ];

    function handleChange(e) {
        setError("")
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const result = await login(form)
        setLoading(false)
        if (!result.success) { setError(result.error); return }
        navigate("/home")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (vantaRef.current && window.VANTA && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.TOPOLOGY({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    color: 0x96DAE3,
                    backgroundColor: 0x31303A,
                });;
            }
        }, 0);

        return () => {
            clearTimeout(timer);
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return (
        <div ref={vantaRef} className="min-h-screen max-w-screen flex flex-col items-center justify-center text-[#EDF5F6]">

            <div className="flex gap-4 max-w-5xl w-full ml-15">
                <Link to='/login' onClick={e => e.stopPropagation()}
                    className="text-[#FFFFFF] text-base font-light underline underline-offset-8 decoration-[#96DAE3] hover:opacity-80 transition-all duration-300">login</Link>
                <Link to='/register' onClick={e => e.stopPropagation()}
                    className="text-[#FFFFFF] text-base font-light opacity-80 hover:opacity-100 transition-all duration-300">register</Link>
            </div>

            <div className="w-full max-w-5xl h-140 m-5 bg-[#3B3A48] rounded-sm border-2 border-[#6a6684ae] 
            shadow-lg overflow-hidden flex gap-8 pr-7 px-4 py-3">

                <div className="relative h-full w-full max-w-md bg-[#31303A] rounded-sm">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Imagem ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover rounded-sm transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'
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

                <div className="w-full h-full">
                    <h1 className="poppins mt-10 text-4xl font-light">Log in your account</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3 mt-12">

                            <div className="flex flex-col gap-1">
                                <label htmlFor="userEmail" className="ml-2 poppins font-light text-md">E-mail</label>
                                <input className="input-style" id="userEmail" name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@gmail.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="userPassword" className="ml-2 poppins font-light text-md">Password</label>
                                <input className="input-style" id="userPassword" name="password" value={form.password} onChange={handleChange} type="password" placeholder="password123@!*" />
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
                            <span className="poppins text-sm font-light underline hover:no-underline text-[#96DAE3]"><a href="">Forgot my password</a></span>
                        </div>

                        <button type="submit" id="loginBtn" disabled={loading} className={`bg-[#96DAE3] w-full text-[#31303A] py-2 px-4 mt-15 cursor-pointer hover:opacity-80 btn-style disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'logging in...' : 'login'}`}>login</button>

                        {error && (
                            <p className="mt-5 text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded px-3 py-2">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login