import React from "react";
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Home() {

    const asideIcons = [
        { image: "Lupa", link: "/search", active: false },
        { image: "Home", link: "/home", active: true },
        { image: "Foguinho", link: "/trending", active: false },
        { image: "Settings", link: "/settings", active: false },
    ];

    const [asideIconsActive, setAsideIconsActive] = useState(asideIcons);
    const [containerOpen, setContainerOpen] = useState(false);
    const [iconVisible, setIconVisible] = useState(true);


    function handleClick() {
        setContainerOpen(prev => !prev);
    }

    return (
        <div className="bg-[#31303A] min-h-screen w-screen max-w-screen overflow-hidden flex">

            {/* Nav lateral */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-full mt-80 py-6 w-16 rounded-r-2xl ">
                {asideIconsActive.map((item, index) => (
                    <Link key={index} to={item.link} onClick={() => {
                        setAsideIconsActive(prev => prev.map((el, i) => ({
                            ...el,
                            active: i === index
                        })))
                    }}>
                        <img src={`../../public/${item.image}.svg`} alt={item.image} className={`w-7 hover:opacity-100 transition-all duration-300 ${item.active ? "opacity-100" : "opacity-50"}`} />
                    </Link>
                ))}
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-col flex-1 min-w-450 max-w-460 px-4 pb-4 gap-4">

                {/* Setinha */}
                {/* Dropdown do usuário */}
                <div className="flex items-center justify-end">
                    <div className="relative">

                        {/* Botão trigger — some quando abre */}
                        <button onClick={handleClick}
                        className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer
                        transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            
                            <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown"/>

                        </button>

                        {/* Dropdown */}
                        <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl
                        transition-all duration-400 ease-in-out overflow-hidden
                        ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>

                            {/* Header do dropdown com botão fechar */}
                            <div className="flex justify-end px-3 pt-2 pb-2">
                                <button onClick={handleClick} className="text-[#31303A] transition-transform duration-300 cursor-pointer">

                                    <img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar"/>
                                </button>
                            </div>

                            <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                                <Link to='/conta' onclick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                                    Conta
                                </Link>

                                <Link to='/config' onclick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                                     Configurações
                                </Link>

                                <li className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                                    Produtos
                                </li>

                                <Link to='/conta' onclick={e => e.stopPropagation()} className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                                    Sair
                                    <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair"/>
                                </Link>   
                            </ul>
                        </div>
                    </div>
                </div>

                  {/* Barra de mercados */}
                <div className="flex items-center gap-8 ml-5 flex-wrap text-[#D7D7D7]">
                    <label className="text-[#96DAE3] flex items-center gap-2 cursor-pointer">
                        <input type="checkbox"
                        className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]"/>
                        <span>Aliexpress</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Shopee</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Mercado Livre</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Amazon</span>
                    </label>
                    <button className="flex justify-center items-center font-medium border-2 border-[#D7D7D7] rounded-sm w-7 h-7 cursor-pointer outline-none text-[#D7D7D7]">
                        <span className="text-xl leading-none mb-1">+</span>
                    </button>
                </div>

                {/* Container cinza principal */}
                <div className="flex flex-col bg-[#49475B] max-h-220 min-w-450 max-w-460 rounded-xl p-3.5 gap-15 flex-1">

                    {/* Section top — 3 cards */}
                    <div className="flex gap-5 w-445 h-85">

                        {/* Bruto */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex gap-10 flex-col font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 pl-2 w-80">
                            <div className="flex text-[#31303A] gap-0.5">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-sm">1 Dia</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5">3 Dias</span>

                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5">2 Semanas</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/Vendas.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Vendas: R$2.912,24 <span className="text-[#5FB057]">(+)</span> </span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/Produtos.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Produtos: R$1.734,86 <span className="text-[#B93F3F]">(-)</span> </span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/Frete.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Frete: R$226,40 <span className="text-[#B93F3F]">(-)</span> </span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/Total.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Total: <span className="text-[#5FB057]">R$950,98</span> </span>
                                </div>
                            </div>
                        </div>

                        {/* Líquido */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col gap-10 font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 pl-2 w-80">
                            <div className="flex text-[#31303A] gap-0.5">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-sm">1 Dia</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5">3 Dias</span>

                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5">2 Semanas</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Lucros: R$950,98 <span className="text-[#5FB057]">(+)</span> </span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Taxas: R$226,40 <span className="text-[#B93F3F]">(-1%)</span> </span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                        <img src="../../public/Total.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span>Total: <span className="text-[#5FB057]">R$941,47</span> </span>
                                </div>
                            </div>
                        </div>

                        {/* Gráfico */}
                        <div className="bg-[#31303A] text-[#31303A] flex flex-col font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-2 w-275">
                            <div className="flex gap-163">
                                <div className="flex gap-0.5 pl-5">
                                    <span className="bg-[#5E5991] cursor-pointer rounded-l-lg text-[#E5E3FF]">Visualizações</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">Cliques</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">Compras</span>
                                </div>

                                <div className="flex gap-0.5">
                                    <span className="bg-[#E5E3FF] cursor-pointer">1Dia</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">5Dias</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">2Semanas</span>

                                    <span className="bg-[#5E5991] cursor-pointer rounded-r-lg text-[#E5E3FF]">1Mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section bottom */}
                    <div className="flex justify-between w-445 h-95 mt-5">

                        {/* Esquerda: GoogleAds + Plano */}
                        <div className="flex gap-5">

                            {/* GoogleAds */}
                            <div className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse w-100 rounded-xl shrink-0">
                                <button className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none rounded-b-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] w-full">
                                    Conectar GoogleAds
                                </button>
                            </div>

                            {/* Plano */}
                            <div className="bg-[#31303A] text-[#FFFFFF] flex gap-28 flex-col font-medium w-70 rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] shrink-0 overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#E5E3FF] text-[#31303A] justify-center text-center p-2 font-semibold">
                                        <span>Plano mensal: 80$</span>
                                    </div>
                                    
                                    <div className="flex flex-col pl-2 gap-3">
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10 text-[#31303A]">
                                                3/4
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Temas</p>
                                                <span className="text-[12px]">Seleção de <span className="text-[#D3CFFF]">temas</span> que pode conter na aba de filtros.</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10 text-[#31303A]">
                                                3/4
                                            </div>
                                            <span>Produtos</span>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10 text-[#31303A]">
                                                0/3
                                            </div>
                                            <span>Relatórios</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="bg-[#5E5991] p-4 font-medium cursor-pointer outline-none w-full">
                                    Botão melhorar plano
                                </button>
                            </div>

                        </div>

                        {/* Direita: Foto loja */}
                        <div className="flex items-end">
                            <div className="bg-[#9997B1] flex flex-col h-48 w-44 rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] overflow-hidden shrink-0">
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-[#000000]">Foto loja</p>
                                </div>
                                <button className="bg-[#5E5991] text-[#FFFFFF] font-medium p-3 cursor-pointer outline-none w-full">
                                    Acessar loja
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}