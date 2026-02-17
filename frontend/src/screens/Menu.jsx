import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Menu() {
    const headerInfos = [
        { title: "Home", link: "/home", active: true },
        { title: "About", link: "/about", active: false },
        { title: "Plans", link: "/", active: false },
        { title: "Contact", link: "/", active: false },
    ];
    const [headerInfosActive, setHeaderInfosActive] = useState(headerInfos);
    const [iconVisible, setIconVisible] = useState(true);
    const [containerOpen, setContainerOpen] = useState(false);

    function handleClick() {
        if (!containerOpen) {
            setIconVisible(false);
            setTimeout(() => setContainerOpen(true), 350);
        } else {
            setContainerOpen(false);
            setTimeout(() => setIconVisible(true), 350);
        }
    }

    return (
        <div className="min-h-screen max-w-screen overflow-x-hidden bg-[#3B3A48]">
            
            <header className="flex items-center justify-center bg-[#96DAE3] text-zinc-700 px-10">
                <div className='flex items-center justify-between w-full max-w-7xl'>

                <nav className="flex gap-7">

                    {/* Font bold em cada item com active true */}
                    {headerInfosActive.map(info => (
                        <ul key={info.title} onClick={() => {
                             
                            setHeaderInfosActive(headerInfosActive.map(i =>
                                i.title === info.title ? { ...i, active: true } : { ...i, active: false }
                            ));
                        }}>
                            <li className={info.active ? "font-bold" : ""}>
                                <a href={info.link}>{info.title}</a>
                            </li>
                        </ul>
                    ))}
                </nav>

                {/* Animação do botão de login e registro */}
                <button id='authBtn' onClick={handleClick}
                    className={`relative overflow-hidden bg-gray-700 rounded-b-lg flex items-center justify-center
                        duration-600 ${containerOpen ? 'w-48 h-14 px-4' : 'w-14 h-14'}`}>

                    <img id='authIcon' src="https://img.icons8.com/?size=100&id=9r19HDmevkSh&format=png&color=96DAE3"
                        className={`absolute duration-500 
                            ${iconVisible ? 'w-8 h-8 opacity-100' : 'w-0 h-0 opacity-0'}`} />

                    {/* Div de login e registro */}
                    <div id='authTexts' className={`flex items-center gap-1 w-full duration-600 ${containerOpen ? 'scale-100' : 'scale-0'}`}>

                        <Link to='/login' onClick={e => e.stopPropagation()}
                            className="flex-1 text-[#96DAE3] text-base font-normal text-center hover:text-white transition-colors">Sign in</Link>

                        <div className="w-px h-5 bg-[#96DAE3] opacity-50" />

                        <Link to='/register'onClick={e => e.stopPropagation()}
                            className="flex-1 text-[#96DAE3] text-base font-normal text-center hover:text-white transition-colors">Register</Link>
                    </div>
                </button>
                            </div>
            </header>

            <main id='mainBody' className="bg-[#96DAE3] text-[#31303A] flex items-center justify-center px-10 py-10">

                <div className='flex items-center justify-between max-w-7xl'>
                    <div className='flex flex-col'>
                        <h1 className="sansation text-6xl font-bold">ANS</h1>
                        <h3 className='mt-2 text-4xl font-bold'>Automatic National Shipping.</h3>
                        
                        <div className='flex flex-col gap-8 mt-8 w-150 text-lg'>
                            <p className=''>A ANS - Automatic National Shipping é uma plataforma inteligente desenvolvida para transformar a forma como você encontra, analisa e seleciona produtos para revenda. Utilizando tecnologia de automação e análise de mercado, a ANS conecta você às melhores oportunidades comerciais, identificando produtos com alto potencial de lucro, demanda real e preços competitivos no mercado nacional.</p>
                            <p>Nosso objetivo é simplificar processos, reduzir riscos e tornar o dropshipping e a revenda online mais acessíveis, eficientes e estratégicos para qualquer pessoa que deseja empreender no e-commerce.</p>
                        </div>
                    </div>
                    <img className='mt-15 w-[45%]' src="./imgProvisoria.png" alt="" />
                </div>
            </main>
            <img className='w-full' src="./bottomMain.svg" />

            <section className='w-full min-h-screen'>

            </section>
        </div>
    )
}
