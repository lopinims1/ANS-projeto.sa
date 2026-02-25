import { useState } from 'react';
import { Link } from 'react-router-dom'

import Purse from '../assets/PlansIcons/Purse.svg'
import List from '../assets/PlansIcons/List.svg'
import Models from '../assets/PlansIcons/Models.svg'
import Alert from '../assets/PlansIcons/Alert.svg'
import Foguinho from '../assets/PlansIcons/Foguinho.svg'

import WinIcon from '../assets/OsIcons/WinIcon.svg'
import LinuxIcon from '../assets/OsIcons/LinuxIcon.svg'
import MacIcon from '../assets/OsIcons/MacIcon.svg'

export default function Menu() {
    const headerInfos = [
        { title: "Home", link: "/home", active: false },
        { title: "About", link: "/about", active: false },
        { title: "Plans", link: "/plans", active: false },
        { title: "Contact", link: "/contact", active: false },
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

    const OsIcons = { WinIcon, LinuxIcon, MacIcon };

    const installOs = [
        { title: "Windows", image: "WinIcon" },
        { title: "Linux", image: "LinuxIcon" },
        { title: "Mac", image: "MacIcon" },
    ];

    const planIcons = { Purse, List, Models, Alert, Foguinho };

    const infoPlans = [
        {
            title: "Básico",
            infos: [
                { image: "Purse", text: "Até 2 produtos por conta/loja" },
                { image: "List", text: "Até 1 relatórios por mês" },
                { image: "Models", text: "2 variações de cor" },
                { image: "Foguinho", text: "Lojas em alta (1)" },
            ],
            link: "/",
            btn: "ASSINAR",
            popular: false,
            basic: true,
            premium: false,
        },
        {
            title: "Popular",
            infos: [
                { image: "Purse", text: "Até 4 produtos por conta/loja" },
                { image: "List", text: "Até 3 relatórios por mês" },
                { image: "Models", text: "5 variações de cor, 2 de modelo e 2 extra" },
                { image: "Alert", text: "Alerta de produtos (Com fila)" },
                { image: "Foguinho", text: "Lojas em alta (3)" },
            ],

            link: "/",
            btn: "ASSINAR",
            popular: true,
            basic: false,
            premium: false,
        },
        {
            title: "Premium",
            infos: [
                { image: "Purse", text: "Até 8 produtos por conta/loja" },
                { image: "List", text: "Até 8 relatórios por mês" },
                { image: "Models", text: "8 variações de cor, 5 de modelo e 3 extra" },
                { image: "Alert", text: "Alerta de produtos (Sem fila)" },
                { image: "Foguinho", text: "Lojas em alta (3)" },
            ],
            link: "/",
            btn: "ASSINAR",
            popular: false,
            basic: false,
            premium: true,
        },
    ];


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
                        className={`relative overflow-hidden bg-[#3B3A48] rounded-b-lg flex items-center justify-center
                        duration-600 ${containerOpen ? 'w-48 h-14 px-4' : 'w-14 h-14'}`}>

                        <img id='authIcon' src="https://img.icons8.com/?size=100&id=9r19HDmevkSh&format=png&color=96DAE3"
                            className={`absolute duration-500 
                            ${iconVisible ? 'w-8 h-8 opacity-100' : 'w-0 h-0 opacity-0'}`} />

                        {/* Div de login e registro */}
                        <div id='authTexts' className={`flex items-center gap-1 w-full duration-600 ${containerOpen ? 'scale-100' : 'scale-0'}`}>

                            <Link to='/login' onClick={e => e.stopPropagation()}
                                className="flex-1 text-[#96DAE3] text-base font-normal text-center hover:text-white transition-colors">Sign in</Link>

                            <div className="w-px h-5 bg-[#96DAE3] opacity-50" />

                            <Link to='/register' onClick={e => e.stopPropagation()}
                                className="flex-1 text-[#96DAE3] text-base font-normal text-center hover:text-white transition-colors">Register</Link>
                        </div>
                    </button>
                </div>
            </header>

            <main id='mainBody' className="bg-[#96DAE3] text-[#31303A] flex items-center justify-center px-10 py-10">

                <div className='flex items-center justify-between w-full max-w-7xl'>
                    <div className='flex flex-col'>
                        <h1 className="sansation text-6xl font-bold">ANS</h1>
                        <h3 className='mt-2 text-4xl font-bold'>Automatic National Shipping.</h3>

                        <div className='flex flex-col gap-8 mt-8 w-150 text-lg'>
                            <p className=''>A ANS - Automatic National Shipping é uma plataforma inteligente desenvolvida para transformar a forma como você encontra, analisa e seleciona produtos para revenda. Utilizando tecnologia de automação e análise de mercado, a ANS conecta você às melhores oportunidades comerciais, identificando produtos com alto potencial de lucro, demanda real e preços competitivos no mercado nacional.</p>
                            <p>Nosso objetivo é simplificar processos, reduzir riscos e tornar o dropshipping e a revenda online mais acessíveis, eficientes e estratégicos para qualquer pessoa que deseja empreender no e-commerce.</p>
                        </div>
                    </div>
                    <div className='flex items-center mt-100 gap-5'>
                        {installOs.map(os => (
                            <button id='OsInstallBtn' key={os.image} className='bg-[#3B3A48] rounded-md p-2 w-15 h-15 flex items-center justify-center cursor-pointer shadow-lg shadow-'>
                                <img src={OsIcons[os.image]} alt={os.title} className='w-full h-full object-contain' />
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <img className='w-full' src="./bottomMain.svg" />


            <section className='flex justify-center w-full py-10 h-130 text-white'>
                <div className='flex justify-between w-full max-w-7xl'>

                    <div className='w-full max-w-2xl flex flex-col gap-5 text-lg font-normal'>
                        <p>A ANS Automatic National Shipping é uma plataforma que identifica oportunidades reais de revenda e dropshipping por meio de automação e análise de mercado. O sistema cruza dados de preços, demanda e viabilidade comercial para encontrar produtos com alto potencial de lucro e competitividade no mercado nacional.  </p>
                        <p>Em vez de tentativas aleatórias, a ANS entrega decisões baseadas em dados. A plataforma organiza informações estratégicas, reduz riscos operacionais e otimiza o tempo de quem busca estruturar um negócio de revenda online de forma profissional, escalável e sustentável.</p>
                    </div>

                    <div className='max-w-200'>
                        <img src="../public/MenuPhoto.png" alt="" className='w-full' />
                    </div>
                </div>
            </section>

            <section id='plans' className='flex justify-center w-full  py-10 text-white'>
                <div className='flex items-center justify-center gap-2 w-full max-w-7xl'>
                    {infoPlans.map((plan) => (
                        <div
                            key={plan.title}
                            className={`transition-all duration-300  ${plan.popular ? 'scale-105' : ''}`}>

                            <div className={`flex flex-col justify-between p-6 bg-linear-to-t from-[#1D1C2A] via-[#1d1c2ab6] to-transparent
                            ${plan.popular ? 'min-h-120 w-120 rounded-b-2xl border-gradient' : 'min-h-95 w-95'} ${plan.premium ? 'rounded-r-2xl' : ''} ${plan.basic ? 'rounded-l-2xl' : ''}`}
                            >
                                <ul className='flex flex-col gap-4 mb-6'>
                                    {plan.infos.map((info, i) => (
                                        <li key={i} className={`flex items-center gap-4  text-sm text-[#96DAE3]`}>
                                            <div className='flex items-center justify-center bg-[#96DAE3] rounded-sm p-1'>
                                                <img src={planIcons[info.image]} alt={info.image} className='w-6 h-6' />
                                            </div>
                                            <span className='text-sm font-semibold'>{info.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className='flex flex-col items-center gap-2 mt-auto'>
                                    {plan && (
                                        <a href={plan.link}
                                            className={`w-70 text-center text-xl bg-[#96DAE3] text-[#2a2935] font-bold py-1 rounded-sm duration-400 transition-all ease-in-out
                                                ${plan.popular ? 'opacity-100 hover:opacity-70' : 'opacity-10 hover:opacity-100'}`}>
                                            {plan.btn}
                                        </a>
                                    )}
                                    <h2 className='text-xl font-bold tracking-widest text-[#96DAE3]'>{plan.title.toUpperCase()}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}