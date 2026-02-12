// export default function Register() {
//   return (
//     <div>
//       <h1>Register</h1>
//       {/* Add your registration form here */}
//     </div>
//   );
// }

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Conta criada!");
  }

  return (
    <div>
      <h1>Register</h1>
      {/* Add your registration form here */}

      {/* apenas adicionando, sem remover nada pfvr miguel */}
      <input name="firstName" placeholder="First name" onChange={handleChange} />
      <input name="lastName" placeholder="Last name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />

      <button onClick={handleRegister}>Create account</button>
    </div>

  );
}


// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

// function Login() {
//     const [currentImage, setCurrentImage] = useState(0);

//     const images = [
//         'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
//         'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=600&fit=crop',
//         'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800&h=600&fit=crop'
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImage((prev) => (prev + 1) % images.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="min-h-screen max-w-screen flex items-center justify-center bg-[#31303A] text-[#EDF5F6]">

//             <div className="w-full max-w-5xl h-135 bg-[#3B3A48] rounded-lg border border-[#6A6684] 
//         shadow-lg overflow-hidden flex gap-10 px-4 py-3">

//                 <div className="h-full w-sm bg-[#31303A] rounded-lg">
//                 </div>

//                 <div>
//                     <h1 className="poppins text-4xl font-light">Create an account</h1>
//                     <form action="">
//                         <div className="flex flex-col gap-5 mt-10">
//                             <div className="flex gap-4">

//                                 <div className="flex flex-col gap-2">
//                                     <label className="font-light text-sm ml-2" htmlFor="userName">First name</label>
//                                     <input className="names-style" id="userName" type="text" placeholder="Name" />
//                                 </div>

//                                 <div className="flex flex-col gap-2">
//                                     <label className="font-light text-sm ml-2" htmlFor="userLastName">Last name</label>
//                                     <input className="names-style" id="userLastName" type="text" placeholder="Last name" />
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="userEmail">E-mail</label>
//                                 <input className="input-style" id="userEmail" type="email" placeholder="E-mail" />

//                                 <label htmlFor="userPassword">Password</label>
//                                 <input className="input-style" id="userPassword" type="password" placeholder="Password" />
//                             </div>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="terms" id="termsBox" />
//                             <label htmlFor="terms">I agree to the terms and conditions</label>
//                         </div>

//                         <button>Create account</button>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Login
