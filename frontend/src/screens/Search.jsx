import { BiLike, BiDislike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react';

export default function Search() {

  const asideIcons = [
    { image: "Lupa", link: "/search", active: true },
    { image: "Home", link: "/home", active: false },
    { image: "Settings", link: "/settings", active: false },
  ];

  const [asideIconsActive, setAsideIconsActive] = useState(asideIcons);
  const [containerOpen, setContainerOpen] = useState(false);

  // Scrollbar state
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

  function handleClick() {
    setContainerOpen(prev => !prev);
  }

  return (
    // Tela inteira, nada vaza pra fora
    <div className="bg-[#31303A] h-screen w-screen overflow-hidden flex">

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .thumb-custom { transition: background 0.3s ease; cursor: grab; }
        .thumb-custom:active { cursor: grabbing; }
        .thumb-custom:hover { background: #96DAE3 !important; }
      `}</style>

      {/* NAV LATERAL — altura natural, centralizada verticalmente */}
      <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-fit self-center py-6 w-16 rounded-r-2xl shrink-0">
        {asideIconsActive.map((item, index) => (
          <Link key={index} to={item.link} onClick={() => {
            setAsideIconsActive(prev => prev.map((el, i) => ({
              ...el,
              active: i === index
            })))
          }}>
            <img
              src={`../../public/${item.image}.svg`}
              alt={item.image}
              className={`w-7 hover:opacity-100 transition-all duration-300 ${item.active ? "opacity-100" : "opacity-50"}`}
            />
          </Link>
        ))}
      </div>

      {/* COLUNA DIREITA — ocupa o espaço restante, sem overflow */}
      <div className="flex flex-col flex-1 min-w-0 px-4 pb-4 gap-4 overflow-hidden">

        {/* Dropdown do usuário */}
        <div className="flex items-center justify-end shrink-0">
          <div className="relative">
            <button
              onClick={handleClick}
              className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer
                transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown" />
            </button>

            <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl z-50
                transition-all duration-400 ease-in-out overflow-hidden
                ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
              <div className="flex justify-end px-3 pt-2 pb-2">
                <button onClick={handleClick} className="text-[#31303A] transition-transform duration-300 cursor-pointer">
                  <img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar" />
                </button>
              </div>
              <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                <Link to='/conta' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Conta</Link>
                <Link to='/config' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Configurações</Link>
                <li className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Produtos</li>
                <Link to='/conta' className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                  Sair
                  <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" />
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className="flex gap-4 items-center shrink-0">
          <button className="px-5 py-2 rounded-sm border-2 border-[#96DAE3] text-[#96DAE3] hover:bg-[#96DAE320] transition cursor-pointer shrink-0">
            Filtros
          </button>
          <input
            placeholder="Pesquisar..."
            className="w-full px-3 py-2 text-[#96DAE3] placeholder-[#96DAE3] bg-transparent border-b-2 border-transparent outline-none focus:border-[#96DAE3] transition-all duration-300"
          />
        </div>

        {/* CONTAINER DO GRID — cresce para preencher o espaço restante, overflow isolado aqui */}
        <div className="flex-1 min-h-0 border-2 border-[#96DAE3] rounded-sm p-6 flex gap-3 overflow-hidden">

          {/* Área scrollável — scroll vertical apenas aqui, scrollbar nativa oculta */}
          <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {/* CARD COMPLETO */}
              <div className="bg-[#B6B3D6] rounded-lg p-3 flex flex-col justify-between aspect-square shadow-md">
                <div className="relative bg-white rounded-md h-[55%] flex items-center justify-center">
                  <span className="text-gray-400 text-sm">imagem produto</span>
                  <IoSettingsOutline className="absolute top-2 right-2 text-gray-500 text-lg cursor-pointer" />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-black text-sm">Nome dado ao AD</p>
                    <FiMoreHorizontal className="text-gray-600 text-lg cursor-pointer" />
                  </div>
                  <p className="text-green-700 font-semibold text-sm">R$213,86 (+)</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-gray-700 text-xs cursor-pointer" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <div className="bg-green-600 p-1.5 rounded">
                      <BiLike size={20} className="cursor-pointer text-white" />
                    </div>
                    <div className="bg-red-600 p-1.5 rounded">
                      <BiDislike size={20} className="cursor-pointer text-white" />
                    </div>
                  </div>
                  <span className="text-green-700 text-sm font-bold">134k</span>
                </div>
              </div>

              {/* QUADRADOS RESTANTES */}
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg aspect-square" />
              ))}

            </div>
          </div>

          {/* SCROLLBAR CUSTOMIZADA */}
          <div className="flex flex-col items-center gap-2 py-1 shrink-0" style={{ width: "20px" }}>
            <div
              ref={trackRef}
              onClick={onTrackClick}
              style={{
                flex: 1,
                width: "2px",
                background: "#ffffff18",
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
            <div style={{
              width: "4px", height: "4px",
              borderRadius: "50%",
              background: progress >= 99 ? "#96DAE3" : "#ffffff20",
              transition: "background 0.4s ease",
              flexShrink: 0,
            }} />
          </div>

        </div>
      </div>
    </div>
  );
}