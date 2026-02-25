import React from "react";
import { Link } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react';

export default function Home() {

    const asideIcons = [
        { image: "Lupa", link: "/search", active: false },
        { image: "Home", link: "/home", active: true },
        { image: "Cart", link: "/cart", active: false },
    ];

    const [asideIconsActive, setAsideIconsActive] = useState(asideIcons);
    const [containerOpen, setContainerOpen] = useState(false);
    const [adModalOpen, setAdModalOpen] = useState(false);
    const [connectModalOpen, setConnectModalOpen] = useState(false);
    const [googleConnected, setGoogleConnected] = useState(false);
    const [adForm, setAdForm] = useState({ nome: '', link: '', descricao: '' });
    const [adsList, setAdsList] = useState([]);
    const [adMenuOpen, setAdMenuOpen] = useState(null);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

    const scrollRef = useRef(null);
    const trackRef = useRef(null);
    const thumbRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const dragStartScrollTop = useRef(0);
    const scrollTimeout = useRef(null);

    const [thumbStyle, setThumbStyle] = useState({ top: 0, height: 40 });
    const [isScrolling, setIsScrolling] = useState(false);
    const [progress, setProgress] = useState(0);

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
        const prog = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        setThumbStyle({ top: thumbTop, height: thumbHeight });
        setProgress(prog);
    }, []);

    const handleScroll = useCallback(() => {
        updateThumb();
        setIsScrolling(true);
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000);
    }, [updateThumb]);

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
    }, [handleScroll, updateThumb, adsList]);

    useEffect(() => {
        const els = [document.documentElement, document.body];
        els.forEach(el => {
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.margin = '0';
            el.style.padding = '0';
            el.style.overflow = 'hidden';
        });
        const root = document.getElementById('root');
        if (root) {
            root.style.width = '100%';
            root.style.height = '100%';
            root.style.overflow = 'hidden';
        }

        const blockScrollZoom = (e) => { if (e.ctrlKey) e.preventDefault(); };
        const blockKeyZoom = (e) => {
            if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0'))
                e.preventDefault();
        };
        const blockGesture = (e) => e.preventDefault();

        window.addEventListener('wheel', blockScrollZoom, { passive: false });
        window.addEventListener('keydown', blockKeyZoom);
        window.addEventListener('gesturestart', blockGesture);
        window.addEventListener('gesturechange', blockGesture);

        return () => {
            els.forEach(el => { el.style.width = ''; el.style.height = ''; el.style.overflow = ''; });
            if (root) { root.style.width = ''; root.style.height = ''; root.style.overflow = ''; }
            window.removeEventListener('wheel', blockScrollZoom);
            window.removeEventListener('keydown', blockKeyZoom);
            window.removeEventListener('gesturestart', blockGesture);
            window.removeEventListener('gesturechange', blockGesture);
        };
    }, []);

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

    return (
        /*
         * Root: 100% of the locked #root element.
         * position:relative anchors ALL absolute children (sidebar, dropdown).
         * overflow:hidden is the hard stop — nothing leaks outside this box.
         */
        <div
            onClick={() => setAdMenuOpen(null)}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                background: '#31303A',
                position: 'relative',
            }}
        >
            <style>{`
                /* ── scrollbar helpers ── */
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                /* ── custom scrollbar thumb ── */
                .thumb-custom { transition: background 0.3s ease; cursor: grab; }
                .thumb-custom:active { cursor: grabbing; }
                .thumb-custom:hover { background: #96DAE3 !important; }

                /* ── period selector buttons ── */
                .period-btn {
                    background: #E5E3FF;
                    color: #31303A;
                    cursor: pointer;
                    padding: 2px 6px;
                    font-size: 0.75rem;
                    line-height: 1.25rem;
                    white-space: nowrap;
                    user-select: none;
                }
                .period-btn:first-child { border-radius: 3px 0 0 3px; }
                .period-btn:last-child  { border-radius: 0 3px 3px 0; }
                .period-btn.active      { background: #5E5991; color: #E5E3FF; }

                /* ── metric tab buttons ── */
                .metric-btn {
                    background: #E5E3FF;
                    color: #31303A;
                    cursor: pointer;
                    padding: 2px 6px;
                    font-size: 0.75rem;
                    line-height: 1.25rem;
                    white-space: nowrap;
                    user-select: none;
                }
                .metric-btn:first-child { border-radius: 3px 0 0 3px; }
                .metric-btn:last-child  { border-radius: 0 3px 3px 0; }
                .metric-btn.active      { background: #5E5991; color: #E5E3FF; }

                /*
                 * ── Main scrollable column ──
                 * flex:1 + min-width:0 → takes remaining space without overflowing.
                 * overflow-y:auto      → vertical scroll when content is taller than viewport.
                 * overflow-x:hidden    → no horizontal scroll / leakage.
                 * padding-left:84px    → clears the 64px sidebar + breathing room.
                 * box-sizing:border-box → padding counted inside the element width.
                 */
                .main-scroll-area {
                    flex: 1;
                    min-width: 0;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 8px 16px 16px 84px;
                    box-sizing: border-box;
                }
                .main-scroll-area::-webkit-scrollbar { display: none; }
                .main-scroll-area { -ms-overflow-style: none; scrollbar-width: none; }

                /* ── top cards row ── */
                .top-section {
                    display: flex;
                    gap: 14px;
                    width: 100%;
                    flex-wrap: wrap;
                    align-items: stretch;
                }

                /* financial cards */
                .finance-card {
                    background: #31303A;
                    color: #E5E3FF;
                    font-weight: 700;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    border-radius: 8px;
                    box-shadow: 4px 9px 20px rgba(0,0,0,0.30);
                    padding: 12px 8px 12px 20px;
                    flex: 1 1 180px;
                    min-width: 0;
                    box-sizing: border-box;
                }

                /* graph card — takes remaining width */
                .graph-card {
                    background: #31303A;
                    display: flex;
                    flex-direction: column;
                    border-radius: 8px;
                    box-shadow: 4px 9px 20px rgba(0,0,0,0.30);
                    padding: 8px 8px 12px;
                    flex: 2 1 200px;
                    min-width: 0;
                    box-sizing: border-box;
                }

                /* ── bottom section ── */
                .bottom-section {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 14px;
                    width: 100%;
                    align-items: flex-start;
                }

                /* Google Ads panel */
                .google-ads-card {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1 1 240px;
                    min-width: 0;
                    max-width: 420px;
                    box-sizing: border-box;
                }

                /* plan card */
                .plan-card {
                    background: #31303A;
                    color: #FFFFFF;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-weight: 500;
                    border-radius: 12px;
                    box-shadow: 4px 9px 20px rgba(0,0,0,0.30);
                    overflow: hidden;
                    flex: 0 1 220px;
                    min-width: 0;
                    box-sizing: border-box;
                }

                /* store photo card */
                .store-photo-card {
                    background: #9997B1;
                    display: flex;
                    flex-direction: column;
                    border-radius: 12px;
                    box-shadow: 4px 9px 20px rgba(0,0,0,0.30);
                    overflow: hidden;
                    width: 176px;
                    height: 192px;
                    flex-shrink: 0;
                    margin-left: auto;   /* push to right on wide screens */
                    align-self: flex-end;
                }

                /* ── responsive ── */
                @media (max-width: 860px) {
                    .google-ads-card  { max-width: 100%; }
                    .store-photo-card { margin-left: 0; align-self: auto; }
                }
                @media (max-width: 540px) {
                    .main-scroll-area { padding-left: 72px; padding-right: 8px; }
                    .finance-card,
                    .graph-card       { flex: 1 1 100%; }
                    .plan-card        { flex: 1 1 100%; max-width: 100%; }
                    .store-photo-card { width: 100%; height: auto; }
                }
            `}</style>

            {/* ── Lateral sidebar ─────────────────────────────────────────────────
                absolute, vertically centred, z-50 so it floats above content.    */}
            <div
                style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
                className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 py-6 w-16 rounded-r-2xl"
            >
                {asideIconsActive.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        onClick={() => setAsideIconsActive(prev => prev.map((el, i) => ({ ...el, active: i === index })))}
                    >
                        <img
                            src={`../../public/${item.image}.svg`}
                            alt={item.image}
                            className={`w-7 hover:opacity-100 transition-all duration-300 ${item.active ? "opacity-100" : "opacity-50"}`}
                        />
                    </Link>
                ))}
            </div>

            {/* ── Top-right dropdown ───────────────────────────────────────────────
                position:absolute top:0 right:0 inside the root div.
                The collapsed <button> and the expanded <div> both live here so
                the panel fans out downward from the exact same anchor point.      */}
            <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 50 }}>
                {/* collapsed trigger pill */}
                <button
                    onClick={handleClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '20px',
                        background: '#96DAE3',
                        borderRadius: '0 0 8px 8px',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'opacity 0.3s',
                        opacity: containerOpen ? 0 : 1,
                        pointerEvents: containerOpen ? 'none' : 'auto',
                    }}
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A"
                        style={{ width: '16px', height: '16px' }}
                        alt="Dropdown"
                    />
                </button>

                {/* expanded panel — absolutely stacked on top of the trigger */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: '#96DAE3',
                        borderRadius: '0 0 12px 12px',
                        overflow: 'hidden',
                        maxHeight: containerOpen ? '240px' : '0px',
                        opacity: containerOpen ? 1 : 0,
                        transition: 'max-height 0.3s ease, opacity 0.3s ease',
                        boxShadow: containerOpen ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px' }}>
                        <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#31303A' }}>
                            <img
                                src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000"
                                style={{ width: '16px', height: '16px' }}
                                alt="Fechar"
                            />
                        </button>
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 8px', gap: '8px', fontSize: '14px', color: '#31303A', fontWeight: 500, whiteSpace: 'nowrap', listStyle: 'none', margin: 0 }}>
                        <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Conta</Link>
                        <Link to='/conta' onClick={e => e.stopPropagation()} className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Configurações</Link>
                        <Link to='/conta' onClick={e => e.stopPropagation()} className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                            Sair
                            <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" />
                        </Link>
                    </ul>
                </div>
            </div>

            {/* ── Main scrollable content ──────────────────────────────────────── */}
            <div className="main-scroll-area">

                <div style={{ height: '8px', flexShrink: 0 }} />

                {/* Marketplace filter bar */}
                <div className="flex items-center gap-6 text-[#D7D7D7] overflow-x-auto hide-scrollbar pb-1 pl-10" style={{ flexShrink: 0 }}>
                    <label className="text-[#96DAE3] flex items-center gap-2 cursor-pointer shrink-0">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3] checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Aliexpress</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3] checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Shopee</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3] checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Mercado Livre</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3] checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Amazon</span>
                    </label>
                    <button className="flex justify-center items-center font-medium border-2 border-[#D7D7D7] rounded-sm w-7 h-7 cursor-pointer outline-none text-[#D7D7D7] shrink-0">
                        <span className="text-xl leading-none mb-1">+</span>
                    </button>
                </div>

                {/* ── Main grey container ── */}
                <div
                    className="bg-[#49475B] w-full rounded-xl p-3.5 mt-4"
                    style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}
                >

                    {/* Top section */}
                    <div className="top-section">

                        {/* Card Bruto */}
                        <div className="finance-card">
                            <div className="flex gap-0.5 flex-wrap">
                                <span className="period-btn">1 Dia</span>
                                <span className="period-btn">3 Dias</span>
                                <span className="period-btn active">2 Semanas</span>
                                <span className="period-btn">1 Mês</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Vendas.svg" alt="Vendas" className="w-7" /></div>
                                    <span className="text-sm">Vendas: R$2.912,24 <span className="text-[#5FB057]">(+)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Produtos.svg" alt="Produtos" className="w-7" /></div>
                                    <span className="text-sm">Produtos: R$1.734,86 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Frete.svg" alt="Frete" className="w-7" /></div>
                                    <span className="text-sm">Frete: R$226,40 <span className="text-[#B93F3F]">(-)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Total.svg" alt="Total" className="w-7" /></div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$950,98</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Card Líquido */}
                        <div className="finance-card">
                            <div className="flex gap-0.5 flex-wrap">
                                <span className="period-btn">1 Dia</span>
                                <span className="period-btn">3 Dias</span>
                                <span className="period-btn active">2 Semanas</span>
                                <span className="period-btn">1 Mês</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Lucros.svg" alt="Lucros" className="w-7" /></div>
                                    <span className="text-sm">Lucros: R$950,98 <span className="text-[#5FB057]">(+)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Taxas.svg" alt="Taxas" className="w-7" /></div>
                                    <span className="text-sm">Taxas: R$226,40 <span className="text-[#B93F3F]">(-1%)</span></span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0"><img src="../../public/Total.svg" alt="Total" className="w-7" /></div>
                                    <span className="text-sm">Total: <span className="text-[#5FB057]">R$941,47</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Card Gráfico */}
                        <div className="graph-card">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <div className="flex gap-0.5 flex-wrap">
                                    <span className="metric-btn active">Visualizações</span>
                                    <span className="metric-btn">Cliques</span>
                                    <span className="metric-btn">Compras</span>
                                </div>
                                <div className="flex gap-0.5 flex-wrap">
                                    <span className="period-btn">1Dia</span>
                                    <span className="period-btn">5Dias</span>
                                    <span className="period-btn">2Semanas</span>
                                    <span className="period-btn active">1Mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="bottom-section">

                        {/* GoogleAds */}
                        <div className="google-ads-card">
                            {!googleConnected ? (
                                <div
                                    className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse rounded-xl overflow-hidden"
                                    style={{ minHeight: '417px' }}
                                >
                                    <button
                                        onClick={() => setConnectModalOpen(true)}
                                        className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none w-full hover:bg-[#3d30cc] transition-colors"
                                    >
                                        Conectar GoogleAds
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-[#31303A] rounded-xl p-2 flex flex-col gap-2" style={{ minHeight: '417px' }}>
                                    <div className="flex gap-1" style={{ maxHeight: adsList.length >= 5 ? '325px' : 'none' }}>
                                        <div
                                            ref={scrollRef}
                                            onScroll={handleScroll}
                                            className="flex flex-col gap-2 flex-1 hide-scrollbar"
                                            style={{ overflowY: adsList.length >= 3 ? 'auto' : 'visible' }}
                                        >
                                            {adsList.map((ad) => (
                                                <div key={ad.id} className="bg-[#E5E3FF] rounded-xl flex items-center gap-3 px-3 py-2 shadow-md shrink-0">
                                                    <div className="bg-white rounded-lg w-14 h-14 shrink-0 overflow-hidden flex items-center justify-center">
                                                        <img src="../../public/Ads.svg" alt="ad" className="w-12 h-12 object-cover" />
                                                    </div>
                                                    <div className="flex flex-col flex-1 min-w-0">
                                                        <span className="text-[#31303A] font-semibold text-sm truncate">{ad.nome}</span>
                                                        <div className="flex items-center gap-3 mt-1 text-xs">
                                                            <span className="flex text-[#708BE7] items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#708BE7"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                                {ad.visualizacoes.toLocaleString('pt-BR')}
                                                            </span>
                                                            <span className="flex text-[#5CAEB8] items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#5CAEB9"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
                                                                {ad.cliques}
                                                            </span>
                                                            <span className="flex text-[#5FB057] items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#5FB057"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                                {ad.compras}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="text-[#31303A] hover:opacity-70 bg-[#D3CFFF] transition-opacity cursor-pointer shrink-0 flex flex-col gap-0.5 items-center p-3 px-2 rounded-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const rect = e.currentTarget.getBoundingClientRect();
                                                            setMenuPos({ top: rect.bottom + 4, left: rect.right - 130 });
                                                            setAdMenuOpen(adMenuOpen === ad.id ? null : ad.id);
                                                        }}
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                    </button>
                                                </div>
                                            ))}
                                            {adsList.length < 3 && (
                                                <button
                                                    onClick={() => setAdModalOpen(true)}
                                                    className="bg-[#96DAE3] hover:bg-[#7ecdd6] transition-colors rounded-xl h-12 flex items-center justify-center text-[#31303A] text-2xl font-bold cursor-pointer w-full shrink-0"
                                                >+</button>
                                            )}
                                        </div>
                                        {adsList.length >= 3 && (
                                            <div className="flex flex-col items-center gap-2 py-1 shrink-0" style={{ width: '20px' }}>
                                                <div
                                                    ref={trackRef}
                                                    onClick={onTrackClick}
                                                    style={{ flex: 1, width: '2px', background: '#ffffff18', borderRadius: '2px', position: 'relative', cursor: 'pointer' }}
                                                >
                                                    <div
                                                        ref={thumbRef}
                                                        onMouseDown={onMouseDown}
                                                        className="thumb-custom"
                                                        style={{
                                                            position: 'absolute',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            top: `${thumbStyle.top}px`,
                                                            height: `${thumbStyle.height}px`,
                                                            width: '3px',
                                                            background: isScrolling ? '#96DAE3' : '#96DAE380',
                                                            borderRadius: '3px',
                                                            userSelect: 'none',
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: progress >= 99 ? '#96DAE3' : '#ffffff20', transition: 'background 0.4s ease', flexShrink: 0 }} />
                                            </div>
                                        )}
                                    </div>
                                    {adsList.length >= 3 && (
                                        <button
                                            onClick={() => setAdModalOpen(true)}
                                            className="bg-[#96DAE3] hover:bg-[#7ecdd6] transition-colors rounded-xl h-12 flex items-center justify-center text-[#31303A] text-2xl font-bold cursor-pointer w-full shrink-0 mt-auto"
                                        >+</button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Plano */}
                        <div className="plan-card">
                            <div className="flex flex-col gap-2">
                                <div className="bg-[#E5E3FF] text-[#31303A] text-center p-2 font-semibold">
                                    <span>Plano mensal: 80$</span>
                                </div>
                                <div className="flex flex-col pl-2 pr-2 gap-2">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">a</div>
                                        <div className="flex flex-col"><p>Temas</p><span className="text-[12px]">Seleção de <span className="text-[#D3CFFF]">temas</span> que pode conter na aba de filtros.</span></div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">3/4</div>
                                        <div className="flex flex-col"><p>Produtos</p><span className="text-[12px]">Quantidade de <span className="text-[#D3CFFF]">Produtos</span> que pode conter por conta.</span></div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg shrink-0 text-[#31303A] text-sm min-w-9 text-center">0/3</div>
                                        <div className="flex flex-col"><p>Relatórios</p><span className="text-[12px]">Quantidade de <span className="text-[#D3CFFF]">Relatórios mensais</span> que pode conter por conta.</span></div>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-[#5E5991] p-4 font-medium cursor-pointer outline-none w-full">Botão melhorar plano</button>
                        </div>

                        {/* Foto loja */}
                        <div className="store-photo-card">
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-[#000000]">Foto loja</p>
                            </div>
                            <button className="bg-[#5E5991] text-[#FFFFFF] font-medium p-3 cursor-pointer outline-none w-full">Acessar loja</button>
                        </div>
                    </div>
                </div>

                <div style={{ height: '16px', flexShrink: 0 }} />
            </div>

            {/* ── 3-dot context menu ─────────────────────────────────────────────── */}
            {adMenuOpen !== null && (
                <div
                    className="fixed z-[100] bg-[#31303A] rounded-xl shadow-2xl overflow-hidden border border-[#ffffff15]"
                    style={{ top: menuPos.top, left: menuPos.left, minWidth: '130px' }}
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={() => {
                            const ad = adsList.find(a => a.id === adMenuOpen);
                            setAdForm({ nome: ad.nome, link: ad.link, descricao: ad.descricao });
                            setAdModalOpen(adMenuOpen);
                            setAdMenuOpen(null);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#E5E3FF] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Editar
                    </button>
                    <div className="h-px bg-[#ffffff15] mx-2" />
                    <button
                        onClick={() => { setAdsList(prev => prev.filter(a => a.id !== adMenuOpen)); setAdMenuOpen(null); }}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#CE2424] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Excluir
                    </button>
                    <div className="h-px bg-[#ffffff15] mx-2" />
                    <button
                        onClick={() => setAdMenuOpen(null)}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-[#D7D7D7] hover:bg-[#49475B] transition-colors cursor-pointer text-sm whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Voltar
                    </button>
                </div>
            )}

            {/* ── Modal: Conectar Google Ads ──────────────────────────────────────── */}
            {connectModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setConnectModalOpen(false)}
                >
                    <div
                        className="bg-[#31303A] rounded-2xl p-6 flex flex-col gap-5 w-80 shadow-2xl items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <img src="../../public/GoogleAds.svg" alt="Google Ads" className="w-24 rounded-xl" />
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
                        <button
                            onClick={() => setConnectModalOpen(false)}
                            className="text-[#D7D7D7] text-sm cursor-pointer hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* ── Modal: Postar / Editar AD ───────────────────────────────────────── */}
            {adModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => { setAdModalOpen(false); setAdForm({ nome: '', link: '', descricao: '' }); }}
                >
                    <div
                        className="bg-[#31303A] rounded-2xl p-6 flex flex-col gap-4 w-80 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            type="text"
                            placeholder="Nomeie o ADD"
                            value={adForm.nome}
                            onChange={e => setAdForm(prev => ({ ...prev, nome: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />
                        <input
                            type="text"
                            placeholder="Link do produto"
                            value={adForm.link}
                            onChange={e => setAdForm(prev => ({ ...prev, link: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium"
                        />
                        <textarea
                            placeholder="Descrição"
                            value={adForm.descricao}
                            rows={4}
                            onChange={e => setAdForm(prev => ({ ...prev, descricao: e.target.value }))}
                            className="bg-[#E5E3FF] text-[#31303A] placeholder-[#31303A]/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5E5991] text-sm font-medium resize-none"
                        />
                        <button
                            onClick={handlePostarAd}
                            className="bg-[#E5E3FF] text-[#31303A] font-bold py-3 rounded-xl cursor-pointer hover:bg-[#D3CFFF] transition-colors tracking-widest text-sm"
                        >
                            {typeof adModalOpen === 'number' ? 'SALVAR EDIÇÃO' : 'POSTAR ADD'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}