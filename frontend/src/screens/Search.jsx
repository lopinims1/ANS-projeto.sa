import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react';

const produtos = [
  {
    id: 1,
    nome: "Mouse Gamer RGB Logitech",
    preco: "R$419,90 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "67k",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    nome: "Teclado Mecânico Logitech",
    preco: "R$699,00 (+)",
    precoColor: "text-green-700",
    estrelas: 4,
    likes: "12k",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    nome: "Headset Pro bluetooth",
    preco: "R$499,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "5.3k",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    nome: "Monitor LG Ultragear 180hz",
    preco: "R$799,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "201k",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_817281-MLA107167838581_022026-F.webp",
  },
  {
    id: 5,
    nome: "Iphone 16",
    preco: "R$3.499,00 (+)",
    precoColor: "text-green-700",
    estrelas: 4,
    likes: "88k",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    nome: "PC Gamer Setup",
    preco: "R$8.500,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "134k",
    imageUrl: "https://images2.kabum.com.br/produtos/fotos/sync_mirakl/916592/xlarge/PC-Gamer-Pulse-By-Bluepc-Amd-Ryzen-7-5700x-B450-Geforce-RTX-3050-8GB-16gb-Ddr4-SSD-M-2-PCie-512gb-Fonte-600w-80-Plus-Pgbp-pul124_1770930083.jpg",
  },
  {
    id: 7,
    nome: "Alexa Echo Dot",
    preco: "R$399,00 (+)",
    precoColor: "text-green-700",
    estrelas: 4,
    likes: "33k",
    imageUrl: "https://www.estadao.com.br/recomenda/wp-content/uploads/2024/07/echo-dot-5.jpg.webp",
  },
  {
    id: 8,
    nome: "Monitor 4K 144Hz",
    preco: "R$2.199,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "9.7k",
    imageUrl: "https://m.media-amazon.com/images/I/616NYrEQ6QL._AC_SX679_.jpg",
  },
  {
    id: 9,
    nome: "Webcam Full HD Sony Picture",
    preco: "R$399,00 (+)",
    precoColor: "text-green-700",
    estrelas: 4,
    likes: "512k",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    nome: "GPU RTX 2080",
    preco: "R$3.899,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "420k",
    imageUrl: "https://files.tecnoblog.net/wp-content/uploads/2019/07/nvidia-geforce-rtx-2080-super.jpg",
  },
  {
    id: 11,
    nome: "SSD NVMe 2TB Sandisk",
    preco: "R$1549,99 (+)",
    precoColor: "text-green-700",
    estrelas: 4,
    likes: "17k",
    imageUrl: "https://cdn.awsli.com.br/600x450/25/25449/produto/360987411/5824d9f590c1448d8b8f06b81e1401a9-product-images-9271506-6b6ac64ceded47cf94e31abb-qloh9iwo4g.jpeg",
  },
  {
    id: 12,
    nome: "Controle Dualshock Ps4",
    preco: "R$200,00 (+)",
    precoColor: "text-green-700",
    estrelas: 5,
    likes: "45k",
    imageUrl: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop",
  },
];

// Dropdown customizado no estilo do site
function CustomSelect({ label, value, onChange, options }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setAberto(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const labelAtivo = options.find(o => o.value === value)?.label || label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setAberto(prev => !prev)}
        className="flex items-center gap-2 px-4 py-1.5 rounded-sm border-2 text-xs font-medium transition-all duration-200 cursor-pointer"
        style={{
          borderColor: '#96DAE3',
          background: value ? '#96DAE3' : 'transparent',
          color: value ? '#31303A' : '#96DAE3',
        }}
      >
        {labelAtivo}
        <span style={{ fontSize: 9, opacity: 0.7 }}>▼</span>
      </button>

      {aberto && (
        <div
          className="absolute left-0 top-9 rounded-sm overflow-hidden"
          style={{ minWidth: '100%', background: '#31303A', border: '2px solid #96DAE3', zIndex: 9999 }}
        >
          {[{ value: '', label }, ...options].map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setAberto(false); }}
              className="px-4 py-2 text-xs cursor-pointer transition-all duration-150"
              style={{ color: value === opt.value ? '#31303A' : '#96DAE3', background: value === opt.value ? '#96DAE3' : 'transparent' }}
              onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = '#96DAE320'; }}
              onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = 'transparent'; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProdutoCard({ produto, onRemover, salvo, onToggleSalvo }) {
  const [voto, setVoto] = useState(null); // 'like' | 'dislike' | null
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="bg-[#96DAE3] rounded-lg p-3 flex flex-col justify-between shadow-md" style={{aspectRatio:"352/377"}}>
      {/* IMAGEM */}
      <div className="relative bg-white rounded-md flex items-center justify-center overflow-hidden" style={{height:"65%"}}>
        {produto.imageUrl ? (
          <img src={produto.imageUrl} alt={produto.nome} className="w-full h-full object-cover rounded-md" />
        ) : (
          <span className="text-gray-400 text-sm">imagem produto</span>
        )}
        {/* Bookmark — contorno vira preenchido ao clicar */}
        <button
          onClick={onToggleSalvo}
          className="absolute top-2 right-2 bg-transparent border-none p-0 cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          {salvo ? <FaBookmark className="text-[#31303A] text-lg" /> : <FaRegBookmark className="text-[#31303A] text-lg" />}
        </button>
      </div>

      {/* INFOS */}
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-black text-sm">{produto.nome}</p>
          <div className="relative">
            <div
              onClick={() => setMenuAberto(prev => !prev)}
              className="border border-black rounded-sm p-0.5 cursor-pointer"
            >
              <FiMoreHorizontal className="text-black text-base" />
            </div>
            {menuAberto && (
              <div className="absolute right-0 top-7 z-50 rounded-md overflow-hidden shadow-xl" style={{minWidth: 195, background: '#31303A'}}>
                <div
                  onClick={onRemover}
                  className="px-4 py-2.5 text-xs cursor-pointer transition-all duration-300"
                  style={{ color: '#96DAE3', letterSpacing: '0.02em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#dc262622'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#96DAE3'; }}
                >
                  Não recomendar este produto
                </div>
              </div>
            )}
          </div>
        </div>
        <p className={`${produto.precoColor} font-semibold text-sm`}>{produto.preco}</p>
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-xs cursor-pointer ${i < produto.estrelas ? "text-gray-700" : "text-gray-300"}`} />
          ))}
        </div>
      </div>

      {/* LIKES + CARRINHO */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          {/* Like — outline vira solid ao clicar, cancela dislike */}
          <div
            onClick={() => setVoto(prev => prev === 'like' ? null : 'like')}
            className="bg-green-600 p-1.5 rounded cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            {voto === 'like'
              ? <BiSolidLike size={20} className="text-white" />
              : <BiLike size={20} className="text-white" />}
          </div>
          {/* Dislike — outline vira solid ao clicar, cancela like */}
          <div
            onClick={() => setVoto(prev => prev === 'dislike' ? null : 'dislike')}
            className="bg-red-600 p-1.5 rounded cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            {voto === 'dislike'
              ? <BiSolidDislike size={20} className="text-white" />
              : <BiDislike size={20} className="text-white" />}
          </div>
        </div>
        {/* Carrinho + número */}
        <div className="flex items-center gap-1 text-green-700">
          <BsCart3 size={16} />
          <span className="text-sm font-bold">{produto.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default function Search() {

  const asideIcons = [
    { image: "Lupa", link: "/search", active: true },
    { image: "Home", link: "/home", active: false },
    { image: "Settings", link: "/settings", active: false },
    { image: "Cart", link: "/cart", active: false },
  ];

  const [asideIconsActive, setAsideIconsActive] = useState(asideIcons);
  const [containerOpen, setContainerOpen] = useState(false);
  const [removidos, setRemovedIds] = useState([]);
  const [query, setQuery] = useState('');
  const [busca, setBusca] = useState('');
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [filtroFavoritados, setFiltroFavoritados] = useState(false);
  const [favoritados, setFavoritados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroPrecoMin, setFiltroPrecoMin] = useState('');
  const [filtroPrecoMax, setFiltroPrecoMax] = useState('');
  const [filtroLucro, setFiltroLucro] = useState('');

  // Mapa de tipo por produto (baseado no id para o exemplo)
  const tipoMap = {
    1: 'Eletrônicos', 2: 'Eletrônicos', 3: 'Eletrônicos', 4: 'Eletrônicos',
    5: 'Eletrônicos', 6: 'Eletrônicos', 7: 'Eletrônicos', 8: 'Eletrônicos',
    9: 'Eletrônicos', 10: 'Eletrônicos', 11: 'Eletrônicos', 12: 'Eletrônicos',
  };

  function parsePreco(str) {
    return parseFloat(str.replace('R$', '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, ''));
  }

  const produtosFiltrados = produtos.filter(p => {
    if (removidos.includes(p.id)) return false;
    if (filtroFavoritados && !favoritados.includes(p.id)) return false;
    if (busca && !p.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    if (filtroTipo && tipoMap[p.id] !== filtroTipo) return false;
    const preco = parsePreco(p.preco);
    if (filtroPrecoMin && preco < parseFloat(filtroPrecoMin)) return false;
    if (filtroPrecoMax && preco > parseFloat(filtroPrecoMax)) return false;
    return true;
  });

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
    <div className="bg-[#31303A] h-screen w-screen overflow-hidden flex">

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .thumb-custom { transition: background 0.3s ease; cursor: grab; }
        .thumb-custom:active { cursor: grabbing; }
        .thumb-custom:hover { background: #96DAE3 !important; }

      `}</style>

      {/* NAV LATERAL */}
      <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-fit self-center py-6 w-16 rounded-r-2xl shrink-0">
        {asideIconsActive.map((item, index) => (
          <Link key={index} to={item.link} onClick={() => {
            setAsideIconsActive(prev => prev.map((el, i) => ({ ...el, active: i === index })))
          }}>
            <img
              src={`../../public/${item.image}.svg`}
              alt={item.image}
              className={`w-7 hover:opacity-100 transition-all duration-300 ${item.active ? "opacity-100" : "opacity-50"}`}
            />
          </Link>
        ))}
      </div>

      {/* COLUNA DIREITA */}
      <div className="flex flex-col flex-1 min-w-0 px-4 pb-4 gap-4 overflow-hidden">

        {/* Dropdown do usuário */}
        <div className="flex items-center justify-end shrink-0">
          <div className="relative">
            <button
              onClick={handleClick}
              className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown" />
            </button>

            <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl z-50 transition-all duration-400 ease-in-out overflow-hidden ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
              <div className="flex justify-end px-3 pt-2 pb-2">
                <button onClick={handleClick} className="text-[#31303A] transition-transform duration-300 cursor-pointer">
                  <img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar" />
                </button>
              </div>
              <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                <Link to='/conta' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Conta</Link>
                <Link to='/conta' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Configurações</Link>
                <li className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Produtos</li>
                <Link to='/conta' className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">
                  Sair
                  <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" />
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* BARRA DE PESQUISA + FILTROS */}
        <div className="flex flex-col gap-2 shrink-0" style={{position:"relative", zIndex: 100}}>
          {/* Linha principal */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setFiltrosAbertos(prev => !prev)}
              className="px-5 py-2 rounded-sm border-2 border-[#96DAE3] text-[#96DAE3] hover:bg-[#96DAE320] transition cursor-pointer shrink-0"
            >
              Filtros {filtrosAbertos ? '−' : '∨'}
            </button>
            <input
              placeholder="Pesquisar..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setBusca(query)}
              className="w-full px-3 py-2 text-[#96DAE3] placeholder-[#96DAE3] bg-transparent border-b-2 border-transparent outline-none focus:border-[#96DAE3] transition-all duration-300"
            />
            <button
              onClick={() => setBusca(query)}
              className="px-5 py-2 rounded-sm border-2 border-[#96DAE3] text-[#96DAE3] hover:bg-[#96DAE320] transition cursor-pointer shrink-0"
            >
              Buscar
            </button>
          </div>

          {/* Painel de filtros */}
          <div
            className="transition-all duration-300 ease-in-out"
            style={{ maxHeight: filtrosAbertos ? '52px' : '0', opacity: filtrosAbertos ? 1 : 0, overflow: 'visible' }}
          >
            <div className="flex gap-2 items-center pt-2">

              {/* Favoritados — toggle pill */}
              <button
                onClick={() => setFiltroFavoritados(prev => !prev)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm border-2 text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: '#96DAE3',
                  background: filtroFavoritados ? '#96DAE3' : 'transparent',
                  color: filtroFavoritados ? '#31303A' : '#96DAE3',
                }}
              >
                <FaBookmark size={10} />
                Favoritados
              </button>

              {/* Tipo */}
              <CustomSelect
                label="Tipo"
                value={filtroTipo}
                onChange={setFiltroTipo}
                options={[
                  { value: 'Eletrônicos', label: 'Eletrônicos' },
                  { value: 'Vestimentas', label: 'Vestimentas' },
                  { value: 'Comidas', label: 'Comidas' },
                  { value: 'Diversos', label: 'Diversos' },
                ]}
              />

              {/* Preço */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 text-xs transition-all duration-200"
                style={{
                  borderColor: '#96DAE3',
                  background: (filtroPrecoMin || filtroPrecoMax) ? '#96DAE310' : 'transparent',
                }}
              >
                <span className="text-[#96DAE3] font-medium">Preço</span>
                <span className="text-[#96DAE3] opacity-50">De</span>
                <input
                  type="number"
                  placeholder="0"
                  value={filtroPrecoMin}
                  onChange={e => setFiltroPrecoMin(e.target.value)}
                  className="bg-transparent text-[#96DAE3] text-xs outline-none w-14 text-center"
                  style={{borderBottom: '1px solid #96DAE360'}}
                />
                <span className="text-[#96DAE3] opacity-50">Até</span>
                <input
                  type="number"
                  placeholder="9999"
                  value={filtroPrecoMax}
                  onChange={e => setFiltroPrecoMax(e.target.value)}
                  className="bg-transparent text-[#96DAE3] text-xs outline-none w-14 text-center"
                  style={{borderBottom: '1px solid #96DAE360'}}
                />
              </div>

              {/* Lucro */}
              <CustomSelect
                label="Lucro"
                value={filtroLucro}
                onChange={setFiltroLucro}
                options={[
                  { value: '+', label: 'Positivo (+)' },
                  { value: '-', label: 'Negativo (−)' },
                ]}
              />

              {/* Limpar */}
              {(filtroFavoritados || filtroTipo || filtroPrecoMin || filtroPrecoMax || filtroLucro) && (
                <button
                  onClick={() => { setFiltroFavoritados(false); setFiltroTipo(''); setFiltroPrecoMin(''); setFiltroPrecoMax(''); setFiltroLucro(''); }}
                  className="px-3 py-1.5 rounded-sm border-2 border-[#96DAE360] text-[#96DAE3] text-xs opacity-50 hover:opacity-100 hover:border-[#96DAE3] transition-all duration-200 cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="flex-1 min-h-0 border-2 border-[#96DAE3] rounded-sm p-6 flex gap-3 overflow-hidden">
          <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtosFiltrados.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} onRemover={() => setRemovedIds(prev => [...prev, produto.id])} salvo={favoritados.includes(produto.id)} onToggleSalvo={() => setFavoritados(prev => prev.includes(produto.id) ? prev.filter(id => id !== produto.id) : [...prev, produto.id])} />
              ))}
            </div>
          </div>

          {/* SCROLLBAR CUSTOMIZADA */}
          <div className="flex flex-col items-center gap-2 py-1 shrink-0" style={{ width: "20px" }}>
            <div
              ref={trackRef}
              onClick={onTrackClick}
              style={{ flex: 1, width: "2px", background: "#ffffff18", borderRadius: "2px", position: "relative", cursor: "pointer" }}
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
              width: "4px", height: "4px", borderRadius: "50%",
              background: progress >= 99 ? "#96DAE3" : "#ffffff20",
              transition: "background 0.4s ease", flexShrink: 0,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}