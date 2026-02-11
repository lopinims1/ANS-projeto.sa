import { useState } from 'react';

export default function Menu() {

    const headerInfos = [
        { title: "Home", link: "/", active: true },
        { title: "About", link: "/about", active: false },
        { title: "Plans", link: "/", active: false },
        { title: "Contact", link: "/", active: false },
    ];
    const [headerInfosActive, setHeaderInfosActive] = useState(headerInfos);

    return (
        <div className="min-h-screen w-screen">
            <header className="flex items-center justify-between bg-[#96DAE3] text-zinc-700 px-10">
                <nav className="flex gap-7">

                    {/* Deixar com font-bold a li selecionada */}
                    {headerInfosActive.map(info => (
                        <ul key={info.title} onClick={(e) => {
                            e.preventDefault(); // Tirar esse prevent depois
                            setHeaderInfosActive(headerInfosActive.map(i => i.title === info.title ?
                                { ...i, active: true } : { ...i, active: false }))
                        }}>

                            {/*Validação de clique na navegação*/}
                            <li className={info.active ? "font-bold" : ""}>
                                <a href={info.link}>{info.title}</a>
                            </li>
                        </ul>
                    ))}
                </nav>

                <div id="afterClickInforms" className="flex">
                    <button className="bg-gray-700 py-3 px-2 rounded-b-lg">
                        <img className="w-8 h-8"
                            src="https://img.icons8.com/?size=100&id=9r19HDmevkSh&format=png&color=96DAE3"
                            alt="" />
                    </button>
                </div>
            </header>

            <main className="bg-[#96DAE3] text-[#31303A] flex items-center px-10">

                <div className='py-10'>
                    <h1 className="title text-6xl font-bold">ANS</h1>
                    <h3 className='mt-2 text-4xl font-bold'>Automatic National Shipping</h3>
                    <div className='flex flex-col gap-8 mt-8 w-150 text-lg'>
                        <p className=''>A ANS - Automatic National Shipping é uma plataforma inteligente desenvolvida para transformar a forma como você encontra, analisa e seleciona produtos para revenda. Utilizando tecnologia de automação e análise de mercado, a ANS conecta você às melhores oportunidades comerciais, identificando produtos com alto potencial de lucro, demanda real e preços competitivos no mercado nacional.</p>
                        <p>Nosso objetivo é simplificar processos, reduzir riscos e tornar o dropshipping e a revenda online mais acessíveis, eficientes e estratégicos para qualquer pessoa que deseja empreender no e-commerce.</p>
                    </div>

                </div>
                    <img className='' src="./public/imgProvisoria.png" alt="" />

            </main>
        </div>
    )
}
