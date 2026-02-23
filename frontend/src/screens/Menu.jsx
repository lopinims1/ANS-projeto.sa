import { useState } from 'react';
import { Link } from 'react-router-dom'

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

    const infoPlans = [
        {
            title: "Básico",
            infos: [
                { icon: "", text: "Até 2 produtos por conta/loja" },
                { icon: "", text: "Até 1 relatórios por mês" },
                { icon: "", text: "2 variações de cor" },
                { icon: "", text: "Lojas em alta (1)" },
            ],
            link: "/",
            btn: "ASSINAR",
            popular: false,
        },
        {
            title: "Popular",
            infos: [
                { icon: "", text: "Até 4 produtos por conta/loja" },
                { icon: "", text: "Até 3 relatórios por mês" },
                { icon: "", text: "5 variações de cor, 2 de modelo e 2 extra" },
                { icon: "", text: "Alerta de produtos (Com fila)" },
                { icon: "", text: "Lojas em alta (3)" },
            ],
            link: "/",
            btn: "ASSINAR",
            popular: true,
        },
        {
            title: "Premium",
            infos: [
                { icon: "", text: "Até 8 produtos por conta/loja" },
                { icon: "", text: "Até 8 relatórios por mês" },
                { icon: "", text: "8 variações de cor, 5 de modelo e 3 extra" },
                { icon: "", text: "Alerta de produtos (Sem fila)" },
                { icon: "", text: "Lojas em alta (3)" },
            ],
            link: "/",
            btn: "ASSINAR",
            popular: false,
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

                            <Link to='/register' onClick={e => e.stopPropagation()}
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

            <section className='flex justify-center w-full py-10 h-130 text-white'>
                <div className='flex justify-between w-full max-w-7xl'>

                    <div className='w-full max-w-2xl flex flex-col gap-5 text-lg font-normal'>
                        <p>A ANS Automatic National Shipping é uma plataforma que identifica oportunidades reais de revenda e dropshipping por meio de automação e análise de mercado. O sistema cruza dados de preços, demanda e viabilidade comercial para encontrar produtos com alto potencial de lucro e competitividade no mercado nacional.  </p>
                        <p>Em vez de tentativas aleatórias, a ANS entrega decisões baseadas em dados. A plataforma organiza informações estratégicas, reduz riscos operacionais e otimiza o tempo de quem busca estruturar um negócio de revenda online de forma profissional, escalável e sustentável.</p>
                    </div>
                </div>
            </section>

            <section id='plans' className='flex justify-center w-full  py-10 text-white'>
                <div className='flex items-center justify-center gap-2 w-full max-w-7xl'>
                    {infoPlans.map((plan) => (
                        <div
                            key={plan.title}
                            style={{
                                background: plan.popular ? 'linear-gradient(to top, #1D1C2A, transparent) border-2 border-[#96DAE3]' : 'linear-gradient(to top, #3f3e4d, transparent)',
                                padding: '2px',
                                borderRadius: '1rem',
                            }}
                            className={`transition-all duration-300 ${plan.popular ? 'scale-105 shadow-[0_0_30px_rgba(150,218,227,0.2)]' : ''}`}
                        >
                            <div className={`flex flex-col justify-between rounded-2xl p-6 bg-linear-to-t from-[#1D1C2A] via-[#1d1c2aa1] to-transparent
                            ${plan.popular ? 'min-h-105 w-105' : 'min-h-95 w-95'}`}
                            >
                                <ul className='flex flex-col gap-4 mb-6'>
                                    {plan.infos.map((info, i) => (
                                        <li key={i} className='flex items-center gap-3 text-sm text-[#96DAE3]'>
                                            <span className='text-base'>{info.icon}</span>
                                            <span className='text-sm font-semibold'>{info.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className='flex flex-col items-center gap-2 mt-auto'>
                                    {plan.popular && (
                                        <a href={plan.link}
                                            className='w-full text-center bg-[#96DAE3] text-[#2a2935] font-bold py-2 rounded-md hover:brightness-110 transition-all'>
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