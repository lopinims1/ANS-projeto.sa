import { useState, useRef, useCallback, useEffect } from 'react';
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

    //  Scrollbar 
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
    // fim Scrollbar 

    return (
        <div className="min-h-screen max-w-screen overflow-x-hidden bg-[#3B3A48]">

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .thumb-custom { transition: background 0.3s ease; cursor: grab; }
                .thumb-custom:active { cursor: grabbing; }
                .thumb-custom:hover { background: #96DAE3 !important; }
            `}</style>

            <header className="flex items-center justify-center bg-[#96DAE3] text-zinc-700 px-10">
                <div className='flex items-center justify-between w-full max-w-7xl'>

                    <nav className="flex gap-7">
                        {headerInfosActive.map(info => (
                            <ul key={info.title} onMouseEnter={() => {
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

                    <button id='authBtn' onClick={handleClick}
                        className={`relative overflow-hidden bg-gray-700 rounded-b-lg flex items-center justify-center
                        duration-600 ${containerOpen ? 'w-48 h-14 px-4' : 'w-14 h-14'}`}>

                        <img id='authIcon' src="https://img.icons8.com/?size=100&id=9r19HDmevkSh&format=png&color=96DAE3"
                            className={`absolute duration-500 
                            ${iconVisible ? 'w-8 h-8 opacity-100' : 'w-0 h-0 opacity-0'}`} />

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

            {/* ÁREA SCROLLÁVEL + SCROLLBAR CUSTOMIZADA */}
            <div className="flex h-[calc(100vh-56px)]">

                {/* Conteúdo com scroll oculto */}
                <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto">

                    <main id='mainBody' className="bg-[#96DAE3] text-[#31303A] flex items-center justify-center px-10 py-10">
                        <div className='flex items-center justify-between max-w-7xl'>
                            <div className='flex flex-col'>
                                <h1 className="sansation text-6xl font-bold">ANS</h1>
                                <h3 className='mt-2 text-4xl font-bold'>Automatic National Shipping.</h3>
                                <div className='flex flex-col gap-8 mt-8 w-150 text-lg'>
                                    <p>A ANS - Automatic National Shipping é uma plataforma inteligente desenvolvida para transformar a forma como você encontra, analisa e seleciona produtos para revenda. Utilizando tecnologia de automação e análise de mercado, a ANS conecta você às melhores oportunidades comerciais, identificando produtos com alto potencial de lucro, demanda real e preços competitivos no mercado nacional.</p>
                                    <p>Nosso objetivo é simplificar processos, reduzir riscos e tornar o dropshipping e a revenda online mais acessíveis, eficientes e estratégicos para qualquer pessoa que deseja empreender no e-commerce.</p>
                                </div>
                            </div>
                            <img className='mt-15 w-[45%]' src="./imgProvisoria.png" alt="" />
                        </div>
                    </main>

                    <img className='w-full' src="./bottomMain.svg" />

                    <section className='w-full min-h-screen bg-[#3B3A48]' />

                </div>

                {/* SCROLLBAR CUSTOMIZADA */}
                <div className="flex flex-col items-center gap-2 py-3" style={{ width: "24px" }}>
                    <div
                        ref={trackRef}
                        onClick={onTrackClick}
                        style={{
                            flex: 1,
                            width: "2px",
                            borderRadius: "2px",
                            position: "relative",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            ref={thumbRef}
                            onMouseDown={onMouseDown}
                            className="thumb-custom"
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                top: `${thumbStyle.top}px`,
                                height: `${thumbStyle.height}px`,
                                width: "3px",
                                background: isScrolling ? "#96DAE3" : "#96DAE380",
                                borderRadius: "3px",
                                userSelect: "none",
                            }}
                        />
                    </div>
                </div>
                {/* FIM SCROLLBAR */}

            </div>
        </div>
    )
}