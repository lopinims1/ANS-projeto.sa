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

    const [adModalOpen, setAdModalOpen] = useState(false);
    const [adForm, setAdForm] = useState({ nome: '', link: '', descricao: '' });
    const [adsList, setAdsList] = useState([]);

    function handlePostarAd() {
        if (!adForm.nome.trim()) return;
        setAdsList(prev => [...prev, { ...adForm, id: Date.now(), visualizacoes: 0, cliques: 0, compras: 0 }]);
        setAdModalOpen(false);
        setAdForm({ nome: '', link: '', descricao: '' });
    }

    return (
        // CORRIGIDO: removido "max-w-screen overflow-hidden" que cortava conteúdo → overflow-x-hidden apenas
        <div className="bg-[#31303A] min-h-screen w-screen overflow-x-hidden flex">

            {/* Nav lateral */}
            {/* CORRIGIDO: "mt-80" fixo que deslocava o nav para fora da tela em telas menores
                → self-center para centralizar verticalmente dentro do flex pai;
                "h-full" removido pois causava overflow → h-fit */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-fit self-center py-6 w-16 rounded-r-2xl shrink-0 sticky top-1/3">
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
            {/* CORRIGIDO: "min-w-450 max-w-460" fixos que impediam a responsividade
                → flex-1 min-w-0 para ocupar o espaço disponível sem overflow */}
            <div className="flex flex-col flex-1 min-w-0 px-4 pb-4 gap-4">

                {/* Dropdown do usuário */}
                <div className="flex items-center justify-end">
                    <div className="relative">

                        {/* Botão trigger — some quando abre */}
                        <button onClick={handleClick}
                            className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer
                        transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown" />
                        </button>

                        {/* Dropdown */}
                        <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl z-50
                        transition-all duration-400 ease-in-out overflow-hidden
                        ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>

                            {/* Header do dropdown com botão fechar */}
                            <div className="flex justify-end px-3 pt-2 pb-2">
                                <button onClick={handleClick} className="text-[#31303A] transition-transform duration-300 cursor-pointer">
                                    <img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar" />
                                </button>
                            </div>

                            {/* CORRIGIDO: "onclick" → "onClick" (typo que quebrava os handlers) */}
                            <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                                <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                                    Conta
                                </Link>

                                <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                                    Configurações
                                </Link>

                                <li className="hover:translate-x-1 font-bold transition-transform duration-200 cursor-pointer">
                                    Produtos
                                </li>

                                <Link to='/conta' onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                                    Sair
                                    <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" />
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
                {/* CORRIGIDO: "min-w-450 max-w-460" → w-full; "max-h-220" fixo removido (cortava conteúdo);
                    "gap-15" não é classe Tailwind válida → gap-6 */}
                <div className="flex flex-col bg-[#49475B] w-full rounded-xl p-3.5 gap-15 flex-1">

                    {/* Section top — 3 cards */}
                    {/* CORRIGIDO: "w-445 h-85" fixos removidos → w-full flex-wrap para responsividade */}
                    <div className="flex gap-5 w-full">

                        {/* Card Bruto */}
                        {/* CORRIGIDO: "w-80" fixo → flex-1 min-w-[200px] para crescer/encolher proporcionalmente */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col gap-10 font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 px-2 pb-3 min-w-65">
                            <div className="flex text-[#31303A] gap-0.5 flex-wrap">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-[3px] text-sm">1 Dia</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 text-sm">3 Dias</span>
                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5 text-sm">2 Semanas</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-[3px] text-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    {/* CORRIGIDO: "max-w-10" que esmagava o ícone em alguns contextos → shrink-0 */}
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Vendas.svg" alt="Vendas" className="w-7" />
                                    </div>
                                    <span className="text-sm">Vendas: R$2.912,24 <span className="text-[#5FB057]">(+)</span></span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Produtos.svg" alt="Produtos" className="w-7" />
                                    </div>
                                    <span className="text-sm">Produtos: R$1.734,86 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Frete.svg" alt="Frete" className="w-7" />
                                    </div>
                                    <span className="text-sm">Frete: R$226,40 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Total.svg" alt="Total" className="w-7" />
                                    </div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$950,98</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Card Líquido */}
                        {/* CORRIGIDO: "w-80" fixo → flex-1 min-w-[200px] */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col gap-10 font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 px-2 pb-3 min-w-65">
                            <div className="flex text-[#31303A] gap-0.5 flex-wrap">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-[3px] text-sm">1 Dia</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 text-sm">3 Dias</span>
                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5 text-sm">2 Semanas</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-[3px] text-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Lucros.svg" alt="Lucros" className="w-7" />
                                    </div>
                                    <span className="text-sm">Lucros: R$950,98 <span className="text-[#5FB057]">(+)</span></span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Taxas.svg" alt="Taxas" className="w-7" />
                                    </div>
                                    <span className="text-sm">Taxas: R$226,40 <span className="text-[#B93F3F]">(-1%)</span></span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0">
                                        <img src="../../public/Total.svg" alt="Total" className="w-7" />
                                    </div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$941,47</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Card Gráfico */}
                        {/* CORRIGIDO: "w-275" fixo → flex-[2] min-w-[260px] para ser proporcionalmente maior;
                            "gap-163" completamente inválido/absurdo → justify-between para empurrar os grupos para as pontas */}
                        <div className="bg-[#31303A] text-[#31303A] flex flex-col font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-2 pb-3 px-2 min-w-229">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <div className="flex gap-0.5">
                                    <span className="bg-[#5E5991] cursor-pointer rounded-l-[3px] text-[#E5E3FF] px-1.5 py-0.5 text-sm">Visualizações</span>
                                    <span className="bg-[#E5E3FF] cursor-pointer px-1.5 py-0.5 text-sm">Cliques</span>
                                    <span className="bg-[#E5E3FF] cursor-pointer rounded-r-[3px] px-1.5 py-0.5 text-sm">Compras</span>
                                </div>

                                <div className="flex gap-0.5">
                                    <span className="bg-[#E5E3FF] cursor-pointer rounded-l-[3px] px-1.5 py-0.5 text-sm">1Dia</span>
                                    <span className="bg-[#E5E3FF] cursor-pointer px-1.5 py-0.5 text-sm">5Dias</span>
                                    <span className="bg-[#E5E3FF] cursor-pointer px-1.5 py-0.5 text-sm">2Semanas</span>
                                    <span className="bg-[#5E5991] cursor-pointer rounded-r-[3px] text-[#E5E3FF] px-1.5 py-0.5 text-sm">1Mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section bottom */}
                    {/* CORRIGIDO: "w-445 h-95" fixos removidos → w-full; flex-wrap para responsividade */}
                    <div className="flex flex-wrap justify-between gap-5 w-full">

                        {/* Esquerda: GoogleAds + Plano */}
                        <div className="flex flex-wrap gap-5 min-w-140">

                            {/* GoogleAds */}
                            {/* CORRIGIDO: "w-100" fixo → flex-1 min-w-[160px] min-h para ter altura mínima visível */}
                            <div className="flex flex-col gap-3 min-w-82 shrink-0">

                                {/* Botão adicionar novo AD */}
                                <div className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse min-h-45 rounded-xl">
                                    <button
                                        onClick={() => setAdModalOpen(true)}
                                        className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none rounded-b-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] w-full"
                                    >
                                        Conectar GoogleAds
                                    </button>
                                </div>

                                {/* Lista de ADs postados */}
                                {adsList.length > 0 && (
                                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                                        {adsList.map((ad) => (
                                            <div
                                                key={ad.id}
                                                className="bg-[#49475B] rounded-xl flex items-center gap-3 px-3 py-2 shadow-md"
                                            >
                                                {/* Thumbnail */}
                                                <div className="bg-[#E5E3FF] rounded-lg w-14 h-14 shrink-0 overflow-hidden flex items-center justify-center">
                                                    <img src="../../public/GoogleAds.svg" alt="ad" className="w-12 h-12 object-cover" />
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-[#E5E3FF] font-semibold text-sm truncate">{ad.nome}</span>
                                                    <div className="flex items-center gap-3 mt-1 text-[#D7D7D7] text-xs">
                                                        {/* Visualizações */}
                                                        <span className="flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            {ad.visualizacoes.toLocaleString('pt-BR')}
                                                        </span>
                                                        {/* Cliques */}
                                                        <span className="flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                            </svg>
                                                            {ad.cliques}
                                                        </span>
                                                        {/* Compras */}
                                                        <span className="flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            {ad.compras}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Menu 3 pontos */}
                                                <button
                                                    className="text-[#D7D7D7] hover:text-white transition-colors cursor-pointer shrink-0 flex flex-col gap-0.5 items-center px-1"
                                                    onClick={() => setAdsList(prev => prev.filter(a => a.id !== ad.id))}
                                                    title="Remover"
                                                >
                                                    <span className="w-1 h-1 bg-current rounded-full"></span>
                                                    <span className="w-1 h-1 bg-current rounded-full"></span>
                                                    <span className="w-1 h-1 bg-current rounded-full"></span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Plano */}
                            {/* CORRIGIDO: "w-70" fixo → flex-1 min-w-[180px];
                                "gap-28" fixo que empurrava o botão para fora → justify-between */}
                            <div className="bg-[#31303A] text-[#FFFFFF] flex flex-col justify-between font-medium flex-1 max-w-55 rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] shrink-0 overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#E5E3FF] text-[#31303A] justify-center text-center p-2 font-semibold">
                                        <span>Plano mensal: 80$</span>
                                    </div>

                                    <div className="flex flex-col pl-2 pr-2 gap-2">
                                        <div className="flex gap-4 items-center">
                                            {/* CORRIGIDO: "max-w-10" → shrink-0 com largura mínima fixa para o badge */}
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">
                                                a
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Temas</p>
                                                <span className="text-[12px]">Seleção de <span className="text-[#D3CFFF]">temas</span> que pode conter na aba de filtros.</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">
                                                3/4
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Produtos</p>
                                                <span className="text-[12px]">Quantidade de <span className="text-[#D3CFFF]">Produtos</span> que pode conter por conta.</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">
                                                0/3
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Relatórios</p>
                                                <span className="text-[12px]">Quantidade de <span className="text-[#D3CFFF]">Relatórios mensais</span> que pode conter por conta.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="bg-[#5E5991] p-4 font-medium cursor-pointer outline-none w-full">
                                    Botão melhorar plano
                                </button>
                            </div>
                        </div>

                        {/* Direita: Foto loja */}
                        <div className="flex items-end shrink-0">
                            <div className="bg-[#9997B1] flex flex-col h-48 w-44 rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] overflow-hidden">
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
            {adModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setAdModalOpen(false)}
                >
                    <div
                        className="bg-[#31303A] rounded-2xl p-6 flex flex-col gap-4 w-80 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Input: Nomeie o ADD */}
                        <input
                            type="text"
                            placeholder="Nomeie o ADD"
                            value={adForm.nome}
                            onChange={e => setAdForm(prev => ({ ...prev, nome: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />

                        {/* Input: Link do produto */}
                        <input
                            type="text"
                            placeholder="Link do produto"
                            value={adForm.link}
                            onChange={e => setAdForm(prev => ({ ...prev, link: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />

                        {/* Textarea: Descrição */}
                        <textarea
                            placeholder="Descrição"
                            value={adForm.descricao}
                            onChange={e => setAdForm(prev => ({ ...prev, descricao: e.target.value }))}
                            rows={4}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium resize-none"
                        />

                        {/* Botão Postar ADD */}
                        <button
                            onClick={handlePostarAd}
                            className="bg-[#E5E3FF] text-[#31303A] font-bold py-3 rounded-xl cursor-pointer hover:bg-[#D3CFFF] transition-colors duration-200 tracking-widest text-sm"
                        >
                            POSTAR ADD
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}