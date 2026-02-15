import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [currentImage, setCurrentImage] = useState(0);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);


  const images = [
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800&h=600&fit=crop'
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Conta criada!");
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
        <Link to='/login'
          className="text-[#FFFFFF] text-base font-light opacity-80 hover:opacity-100 transition-all duration-300">login</Link>
        <Link to='/register'
          className="text-[#FFFFFF] text-base font-light underline underline-offset-8 decoration-[#96DAE3] hover:opacity-80 transition-all duration-300">register</Link>
      </div>

      <div className="w-full max-w-5xl h-140 m-5 bg-transparent rounded-sm border-2 border-[#96dae379] shadow-lg overflow-hidden flex gap-8 pr-7 px-4 py-3">

        <div className="relative h-full w-full max-w-md bg-[#31303A] rounded-sm">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Imagem ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover rounded-sm transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button key={index} onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentImage ? 'bg-[#96DAE3] w-6' : 'bg-white/50 w-2 hover:bg-white/75'}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-full">
          <h1 className="poppins mt-10 text-4xl font-light">Create an account</h1>
          <form action="">
            <div className="flex flex-col gap-3 mt-12">
              <div className="flex gap-4">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-light text-sm ml-2" htmlFor="userName">First name</label>
                  <input className="names-style" id="userName" type="text" placeholder="Name" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label className="font-light text-sm ml-2" htmlFor="userLastName">Last name</label>
                  <input className="names-style" id="userLastName" type="text" placeholder="Last name" />
                </div>
              </div>
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
              <div className="flex items-center gap-1 ml-1">
                <input type="checkbox" name="terms" id="termsBox"
                  className="w-4 h-4 appearance-none rounded-xs bg-[#4A485B] checked:bg-[#96DAE3] cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-[#31303A] checked:after:text-xs checked:after:left-1 checked:after:-top-0.2" />
                <label htmlFor="terms" className="poppins text-xs font-light">I agree with the <a className="underline hover:no-underline text-[#96DAE3]" href="/terms">terms and conditions</a></label>
              </div>
              <span className="poppins text-xs font-light mr-1">Already have an account? <a className="underline hover:no-underline text-[#96DAE3]" href="/login">Login</a></span>
            </div>

            <button type="submit" className="bg-[#96DAE3] w-full text-[#31303A] py-2 px-4 mt-10 cursor-pointer hover:opacity-80 btn-style">create account</button>
          </form>
        </div>
      </div>
    </div>
  )
}