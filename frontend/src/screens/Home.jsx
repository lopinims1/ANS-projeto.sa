import React from "react";
import { Link } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react';

// ✅ FIX 1: Movido para fora do componente — evita recriação a cada render
const ASIDE_ICONS = [
    { image: "Lupa", link: "/search" },
    { image: "Home", link: "/home" },
    { image: "Cart", link: "/cart" },
];

export default function Home() {

    const [activeIndex, setActiveIndex] = useState(1); // Home ativo por padrão
    const [containerOpen, setContainerOpen] = useState(false);

    const [adModalOpen, setAdModalOpen] = useState(false);
    const [connectModalOpen, setConnectModalOpen] = useState(false);
    const [googleConnected, setGoogleConnected] = useState(false);
    const [adForm, setAdForm] = useState({ nome: '', link: '', descricao: '' });
    const [adsList, setAdsList] = useState([]);
    const [adMenuOpen, setAdMenuOpen] = useState(null);

    // Scrollbar customizada
    const scrollRef = useRef(null);
    const trackRef = useRef(null);
    const thumbRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const dragStartScrollTop = useRef(0);
    const scrollTimeout = useRef(null);

    const [thumbStyle, setThumbStyle] = useState({ top: 0, height: 40 });
    const [isScrolling, setIsScrolling] = useState(false);

    const updateThumb = useCallback(() => {
        const el = scrollRef.current;
        const track = trackRef.current;
        if (!el || !track) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        const trackHeight = track.clientHeight;
        const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 40);
        const maxScroll = scrollHeight - clientHeight;
        const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
        const thumbTop = ratio * (trackHeight - thumbHeight);
        setThumbStyle({ top: thumbTop, height: thumbHeight });
    }, []);

    const handleScroll = useCallback(() => {
        updateThumb();
        setIsScrolling(true);
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000);
    }, [updateThumb]);

    // ✅ FIX 2: Removido `adsList` das dependências — evita re-subscribe desnecessário
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateThumb();
        el.addEventListener("scroll", handleScroll, { passive: true });
        const ro = new ResizeObserver(updateThumb);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", handleScroll);
            ro.disconnect();
        };
    }, [handleScroll, updateThumb]);

    // ✅ FIX 3: Atualiza thumb quando adsList muda (separado do efeito de setup)
    useEffect(() => {
        updateThumb();
    }, [adsList, updateThumb]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        isDragging.current = true;
        dragStartY.current = e.clientY;
        dragStartScrollTop.current = scrollRef.current?.scrollTop || 0;
        const onMove = (e) => {
            if (!isDragging.current) return;
            const el = scrollRef.current;
            const track = trackRef.current;
            if (!el || !track) return;
            const delta = e.clientY - dragStartY.current;
            const { scrollHeight, clientHeight } = el;
            const thumbH = Math.max((clientHeight / scrollHeight) * track.clientHeight, 40);
            const maxThumbTop = track.clientHeight - thumbH;
            const scrollRatio = maxThumbTop > 0 ? delta / maxThumbTop : 0;
            el.scrollTop = dragStartScrollTop.current + scrollRatio * (scrollHeight - clientHeight);
        };
        const onUp = () => {
            isDragging.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }, []);

    const onTrackClick = useCallback((e) => {
        if (e.target === thumbRef.current) return;
        const track = trackRef.current;
        const el = scrollRef.current;
        if (!track || !el) return;
        const rect = track.getBoundingClientRect();
        const ratio = (e.clientY - rect.top) / track.clientHeight;
        el.scrollTo({ top: ratio * (el.scrollHeight - el.clientHeight), behavior: "smooth" });
    }, []);

    function handleClick() {
        setContainerOpen(prev => !prev);
    }

    function handlePostarAd() {
        if (!adForm.nome.trim()) return;

        if (typeof adModalOpen === 'number') {
            setAdsList(prev => prev.map(a =>
                a.id === adModalOpen ? { ...a, ...adForm } : a
            ));
        } else {
            setAdsList(prev => [...prev, { ...adForm, id: Date.now(), visualizacoes: 2921, cliques: 281, compras: 12 }]);
        }

        setAdModalOpen(false);
        setAdForm({ nome: '', link: '', descricao: '' });
    }

    // ✅ FIX 4: Caminho de imagem usando /public/ (relativo à raiz do site, não do arquivo)
    const publicImg = (name) => `/${name}.svg`;

    return (
        <div className="bg-[#31303A] h-screen w-screen overflow-hidden flex" onClick={() => setAdMenuOpen(null)}>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .thumb-custom { transition: background 0.3s ease; cursor: grab; }
                .thumb-custom:active { cursor: grabbing; }
                .thumb-custom:hover { background: #96DAE3 !important; }
            `}</style>

            {/* Nav lateral */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-fit self-center py-6 w-16 rounded-r-2xl shrink-0">
                {ASIDE_ICONS.map((item, index) => (
                    <Link key={index} to={item.link} onClick={() => setActiveIndex(index)}>
                        <img
                            src={publicImg(item.image)}
                            alt={item.image}
                            className={`w-7 hover:opacity-100 transition-all duration-300 ${activeIndex === index ? "opacity-100" : "opacity-50"}`}
                        />
                    </Link>
                ))}
            </div>

            {/* Área principal */}
            <div className="flex flex-col flex-1 min-w-0 px-4 gap-4 overflow-y-auto overflow-x-hidden">

                {/* Dropdown do usuário */}
                <div className="flex items-center justify-end shrink-0">
                    <div className="relative">
                        <button onClick={handleClick}
                            className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer
                            transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown" />
                        </button>

                        <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl z-50
                            transition-all duration-300 ease-in-out overflow-hidden
                            ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
                            <div className="flex justify-end px-3 pt-2 pb-2">
                                <button onClick={handleClick} className="text-[#31303A] cursor-pointer">
                                    <img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar" />
                                </button>
                            </div>
                            <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                                <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Conta</Link>
                                <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Configurações</Link>
                                <Link to='/conta' onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                                    Sair
                                    <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" />
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Barra de mercados */}
                <div className="flex items-center gap-4 sm:gap-8 ml-5 flex-wrap text-[#D7D7D7] shrink-0">
                    {["Aliexpress", "Shopee", "Mercado Livre", "Amazon"].map((market, i) => (
                        <label key={market} className={`${i === 0 ? "text-[#96DAE3]" : ""} flex items-center gap-2 cursor-pointer`}>
                            <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3] checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                            <span>{market}</span>
                        </label>
                    ))}
                    <button className="flex justify-center items-center font-medium border-2 border-[#D7D7D7] rounded-sm w-7 h-7 cursor-pointer outline-none text-[#D7D7D7]">
                        <span className="text-xl leading-none mb-1">+</span>
                    </button>
                </div>

                {/* Container cinza principal */}
                <div className="flex flex-col bg-[#49475B] w-full rounded-xl p-3.5 gap-6">

                    {/* Section top cards */}
                    <div className="flex gap-5 w-full flex-wrap">

                        {/* Card Bruto */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col gap-6 font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 px-2 pb-3 min-w-52 flex-1">
                            <div className="flex text-[#31303A] gap-0.5 flex-wrap">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-[3px] text-sm">1 Dia</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 text-sm">3 Dias</span>
                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5 text-sm">2 Semanas</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-[3px] text-sm">1 Mês</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Vendas")} alt="Vendas" className="w-7" /></div>
                                    <span className="text-sm">Vendas: R$2.912,24 <span className="text-[#5FB057]">(+)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Produtos")} alt="Produtos" className="w-7" /></div>
                                    <span className="text-sm">Produtos: R$1.734,86 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Frete")} alt="Frete" className="w-7" /></div>
                                    <span className="text-sm">Frete: R$226,40 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Total")} alt="Total" className="w-7" /></div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$950,98</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Card Líquido */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col gap-6 font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 px-2 pb-3 min-w-52 flex-1">
                            <div className="flex text-[#31303A] gap-0.5 flex-wrap">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-[3px] text-sm">1 Dia</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 text-sm">3 Dias</span>
                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5 text-sm">2 Semanas</span>
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-[3px] text-sm">1 Mês</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Lucros")} alt="Lucros" className="w-7" /></div>
                                    <span className="text-sm">Lucros: R$950,98 <span className="text-[#5FB057]">(+)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Taxas")} alt="Taxas" className="w-7" /></div>
                                    <span className="text-sm">Taxas: R$226,40 <span className="text-[#B93F3F]">(-1%)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src={publicImg("Total")} alt="Total" className="w-7" /></div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$941,47</span></span>
                                </div>
                            </div>
                        </div>

                        {/* ✅ FIX 6: Card Gráfico — flex-[2] + min-w + min-h para não sumir */}
                        <div className="bg-[#31303A] text-[#31303A] flex flex-col font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-2 pb-3 px-2 min-w-[16rem] flex-2 min-h-40">
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

                    {/* ✅ FIX 7: Section bottom — removidas larguras fixas inline, usando classes Tailwind */}
                    <div className="flex flex-wrap gap-5 w-full items-start">

                        {/* GoogleAds */}
                        <div className="flex flex-col gap-2 w-72 shrink-0">
                            {!googleConnected ? (
                                <div
                                    className="bg-no-repeat bg-cover flex flex-col-reverse rounded-xl overflow-hidden"
                                    style={{ backgroundImage: `url(${publicImg("GoogleAds")})`, minHeight: "318px" }}
                                >
                                    <button
                                        onClick={() => setConnectModalOpen(true)}
                                        className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none w-full hover:bg-[#3d30cc] transition-colors"
                                    >
                                        Conectar GoogleAds
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-[#31303A] rounded-xl p-2 flex flex-col gap-2">
                                    {adsList.length > 0 && (
                                        <div className="flex gap-1">
                                            <div
                                                ref={scrollRef}
                                                onScroll={handleScroll}
                                                className="flex flex-col gap-2 hide-scrollbar overflow-y-auto flex-1"
                                                style={{ maxHeight: "240px" }}
                                            >
                                                {adsList.map((ad) => (
                                                    <div key={ad.id} className="bg-[#E5E3FF] rounded-xl flex items-center gap-3 px-3 py-2 shadow-md shrink-0">
                                                        <div className="bg-white rounded-lg w-14 h-14 shrink-0 overflow-hidden flex items-center justify-center">
                                                            <img src={publicImg("Ads")} alt="ad" className="w-12 h-12 object-cover" />
                                                        </div>
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <span className="text-[#31303A] font-semibold text-sm truncate">{ad.nome}</span>
                                                            <div className="flex items-center gap-3 mt-1 text-xs">
                                                                <span className="flex text-[#708BE7] items-center gap-1">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#708BE7">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                    {ad.visualizacoes.toLocaleString('pt-BR')}
                                                                </span>
                                                                <span className="flex text-[#5CAEB8] items-center gap-1">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#5CAEB9">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                                    </svg>
                                                                    {ad.cliques}
                                                                </span>
                                                                <span className="flex text-[#5FB057] items-center gap-1">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#5FB057">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                    {ad.compras}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* 3 pontos */}
                                                        <div className="relative">
                                                            <button
                                                                className="text-[#31303A] hover:opacity-70 bg-[#D3CFFF] transition-opacity cursor-pointer shrink-0 flex flex-col gap-0.5 items-center p-3 px-2 rounded-md"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setAdMenuOpen(adMenuOpen === ad.id ? null : ad.id);
                                                                }}
                                                            >
                                                                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                            </button>

                                                            {adMenuOpen === ad.id && (
                                                                <div
                                                                    className="absolute right-0 top-full mt-1 bg-[#31303A] rounded-xl shadow-2xl z-50 overflow-hidden border border-[#ffffff15]"
                                                                    onClick={e => e.stopPropagation()}
                                                                >
                                                                    <button
                                                                        onClick={() => {
                                                                            setAdForm({ nome: ad.nome, link: ad.link, descricao: ad.descricao });
                                                                            setAdModalOpen(ad.id);
                                                                            setAdMenuOpen(null);
                                                                        }}
                                                                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#E5E3FF] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                        </svg>
                                                                        Editar
                                                                    </button>
                                                                    <div className="h-px bg-[#ffffff15] mx-2" />
                                                                    <button
                                                                        onClick={() => {
                                                                            setAdsList(prev => prev.filter(a => a.id !== ad.id));
                                                                            setAdMenuOpen(null);
                                                                        }}
                                                                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#CE2424] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        Excluir
                                                                    </button>
                                                                    <div className="h-px bg-[#ffffff15] mx-2" />
                                                                    <button
                                                                        onClick={() => setAdMenuOpen(null)}
                                                                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#D7D7D7] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                        </svg>
                                                                        Voltar
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* ✅ FIX 8: Scrollbar customizada agora renderizada no JSX */}
                                            {adsList.length >= 3 && (
                                                <div
                                                    ref={trackRef}
                                                    className="relative flex flex-col items-center py-1 shrink-0 cursor-pointer"
                                                    style={{ width: "10px" }}
                                                    onClick={onTrackClick}
                                                >
                                                    {/* Track */}
                                                    <div className="absolute inset-0 rounded-full bg-[#49475B]" />
                                                    {/* Thumb */}
                                                    <div
                                                        ref={thumbRef}
                                                        className="thumb-custom absolute w-full rounded-full"
                                                        style={{
                                                            top: thumbStyle.top,
                                                            height: thumbStyle.height,
                                                            background: isScrolling ? "#96DAE3" : "#5E5991",
                                                        }}
                                                        onMouseDown={onMouseDown}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* ✅ FIX 9: Botão + agora renderizado */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setAdModalOpen(true); setAdForm({ nome: '', link: '', descricao: '' }); }}
                                        className="bg-[#96DAE3] text-[#31303A] font-bold text-xl rounded-lg py-2 w-full cursor-pointer hover:bg-[#7dccd6] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ✅ FIX 10: Plano — largura fixa substituída por w-56 (Tailwind) */}
                        <div className="bg-[#31303A] text-[#FFFFFF] flex flex-col justify-between font-medium rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] shrink-0 overflow-hidden w-56">
                            <div className="flex flex-col gap-2">
                                <div className="bg-[#E5E3FF] text-[#31303A] text-center p-2 font-semibold">
                                    <span>Plano mensal: 80$</span>
                                </div>
                                <div className="flex flex-col pl-2 pr-2 gap-2">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">a</div>
                                        <div className="flex flex-col">
                                            <p>Temas</p>
                                            <span className="text-[12px]">Seleção de <span className="text-[#D3CFFF]">temas</span> que pode conter na aba de filtros.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">3/4</div>
                                        <div className="flex flex-col">
                                            <p>Produtos</p>
                                            <span className="text-[12px]">Quantidade de <span className="text-[#D3CFFF]">Produtos</span> que pode conter por conta.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">0/3</div>
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

                        {/* ✅ FIX 11: Foto loja — removido ml-auto que causava quebra, usando w-44 */}
                        <div className="flex items-end shrink-0">
                            <div className="bg-[#9997B1] flex flex-col rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] overflow-hidden w-44 h-48">
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

            {/* Modal: Conectar Google Ads */}
            {connectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConnectModalOpen(false)}>
                    <div className="bg-[#31303A] rounded-2xl p-6 flex flex-col gap-5 w-80 shadow-2xl items-center" onClick={e => e.stopPropagation()}>
                        <img src={publicImg("GoogleAds")} alt="Google Ads" className="w-24 rounded-xl" />
                        <div className="text-center">
                            <h2 className="text-[#E5E3FF] font-bold text-lg">Conectar Google Ads</h2>
                            <p className="text-[#D7D7D7] text-sm mt-1">Vincule sua conta do Google Ads para gerenciar seus anúncios diretamente aqui.</p>
                        </div>
                        <button
                            onClick={() => { setGoogleConnected(true); setConnectModalOpen(false); }}
                            className="bg-[#2C2399] text-[#E5E3FF] font-bold py-3 px-6 rounded-xl cursor-pointer hover:bg-[#3d30cc] transition-colors w-full text-sm"
                        >
                            Entrar com Google
                        </button>
                        <button onClick={() => setConnectModalOpen(false)} className="text-[#D7D7D7] text-sm cursor-pointer hover:text-white transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal: Postar AD */}
            {adModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setAdModalOpen(false)}>
                    <div className="bg-[#31303A] rounded-2xl p-6 flex flex-col gap-4 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <input
                            type="text" placeholder="Nomeie o ADD" value={adForm.nome}
                            onChange={e => setAdForm(prev => ({ ...prev, nome: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />
                        <input
                            type="text" placeholder="Link do produto" value={adForm.link}
                            onChange={e => setAdForm(prev => ({ ...prev, link: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />
                        <textarea
                            placeholder="Descrição" value={adForm.descricao} rows={4}
                            onChange={e => setAdForm(prev => ({ ...prev, descricao: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium resize-none"
                        />
                        <button onClick={handlePostarAd} className="bg-[#E5E3FF] text-[#31303A] font-bold py-3 rounded-xl cursor-pointer hover:bg-[#D3CFFF] transition-colors tracking-widest text-sm">
                            {typeof adModalOpen === 'number' ? 'SALVAR EDIÇÃO' : 'POSTAR ADD'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}