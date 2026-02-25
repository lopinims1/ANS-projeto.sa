import { BsCart3, BsTrash3, BsPlusLg, BsX, BsImage } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FiPackage, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useCart } from './cart-content/CartContent';

const TIPOS = ['Eletrônicos', 'Vestimentas', 'Comidas', 'Diversos'];

function fmt(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function ModalCriarProduto({ onFechar, onSalvar }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [tipo, setTipo] = useState('');
  const [estrelas, setEstrelas] = useState(5);
  const [imagemUrl, setImagemUrl] = useState(null);
  const inputImgRef = useRef(null);

  function handleImagem(e) {
    const file = e.target.files[0];
    if (file) setImagemUrl(URL.createObjectURL(file));
  }

  function handleSalvar() {
    if (!nome.trim() || !preco) return;
    onSalvar({
      id: Date.now(),
      nome,
      preco: parseFloat(preco),
      precoVenda: parseFloat(precoVenda) || parseFloat(preco) * 1.5,
      tipo: tipo || 'Diversos',
      estrelas,
      quantidade: 1,
      imageUrl: imagemUrl || null,
      criado: true,
    });
    onFechar();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: '#00000080' }} onClick={onFechar}>
      <div className="rounded-xl shadow-2xl flex flex-col gap-5 p-6 w-full" style={{ maxWidth: 520, background: '#3C3A47', border: '2px solid #96DAE340' }} onClick={e => e.stopPropagation()}>

        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-base">Crie seu produto</p>
          <button onClick={onFechar} className="text-white opacity-40 hover:opacity-100 transition cursor-pointer"><BsX size={20} /></button>
        </div>

        {/* Foto */}
        <div onClick={() => inputImgRef.current.click()} className="rounded-lg flex items-center justify-center cursor-pointer overflow-hidden group relative" style={{ height: 160, background: '#2E2D37', border: '2px dashed #96DAE340' }}>
          {imagemUrl
            ? <img src={imagemUrl} alt="preview" className="w-full h-full object-cover" />
            : <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-70 transition"><BsImage size={28} className="text-white" /><p className="text-white text-xs">Clique para adicionar foto</p></div>}
          {imagemUrl && <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" style={{ background: '#00000060' }}><p className="text-white text-xs">Trocar foto</p></div>}
        </div>
        <input ref={inputImgRef} type="file" accept="image/*" onChange={handleImagem} className="hidden" />

        {/* Nome */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-xs opacity-60">Nome do produto</p>
          <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Tênis Nike Air Max" className="rounded-md px-4 py-2.5 text-sm text-white outline-none placeholder:opacity-30" style={{ background: '#2E2D37' }} />
        </div>

        {/* Preços */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <p className="text-white text-xs opacity-60">Preço de custo (R$)</p>
            <input type="number" value={preco} onChange={e => setPreco(e.target.value)} placeholder="0,00" className="rounded-md px-4 py-2.5 text-sm text-white outline-none placeholder:opacity-30" style={{ background: '#2E2D37' }} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <p className="text-xs opacity-60" style={{ color: '#96DAE3' }}>Preço de venda (R$)</p>
            <input type="number" value={precoVenda} onChange={e => setPrecoVenda(e.target.value)} placeholder="0,00" className="rounded-md px-4 py-2.5 text-sm outline-none placeholder:opacity-30" style={{ background: '#2E2D37', color: '#96DAE3' }} />
          </div>
        </div>

        {/* Tipo */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-xs opacity-60">Tipo</p>
          <div className="flex gap-2 flex-wrap">
            {TIPOS.map(t => (
              <button key={t} onClick={() => setTipo(t)} className="px-3 py-1 rounded-sm border text-xs transition-all duration-150 cursor-pointer" style={{ borderColor: '#96DAE3', background: tipo === t ? '#96DAE3' : 'transparent', color: tipo === t ? '#31303A' : '#96DAE3' }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Estrelas */}
        <div className="flex flex-col gap-1.5">
          <p className="text-white text-xs opacity-60">Avaliação</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <FaStar key={i} size={18} onClick={() => setEstrelas(i)} className="cursor-pointer transition-colors duration-100" style={{ color: i <= estrelas ? '#96DAE3' : '#ffffff20' }} />
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={onFechar} className="px-5 py-2 rounded-sm text-sm text-white opacity-40 hover:opacity-70 transition cursor-pointer">Cancelar</button>
          <button onClick={handleSalvar} disabled={!nome.trim() || !preco} className="px-6 py-2 rounded-sm text-sm font-semibold transition-all duration-200 cursor-pointer" style={{ background: nome.trim() && preco ? '#96DAE3' : '#96DAE330', color: nome.trim() && preco ? '#31303A' : '#96DAE360' }}>
            Adicionar ao cart
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onRemover, onQtd }) {
  const lucro = (item.precoVenda - item.preco) * item.quantidade;
  const margem = item.preco > 0 ? (((item.precoVenda - item.preco) / item.preco) * 100).toFixed(0) : 0;

  return (
    <div className="flex gap-4 p-4 rounded-lg items-center transition-all duration-200 group" style={{ background: '#3C3A47' }}>
      <div className="rounded-md overflow-hidden shrink-0 flex items-center justify-center" style={{ width: 80, height: 80, background: '#2E2D37' }}>
        {item.imageUrl ? <img src={item.imageUrl} alt={item.nome} className="w-full h-full object-cover" /> : <BsImage size={24} className="text-white opacity-20" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white text-sm truncate">{item.nome}</p>
          {item.criado && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#96DAE320', color: '#96DAE3' }}>Criado</span>}
        </div>
        <p className="text-xs mt-0.5" style={{ color: '#96DAE380' }}>{item.tipo}</p>
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => <FaStar key={i} size={9} style={{ color: i < (item.estrelas || 0) ? '#96DAE380' : '#ffffff15' }} />)}
        </div>
      </div>

      <div className="text-center shrink-0" style={{ minWidth: 90 }}><p className="text-xs opacity-50 text-white">Custo</p><p className="text-sm font-medium text-white">{fmt(item.preco)}</p></div>
      <div className="text-center shrink-0" style={{ minWidth: 90 }}><p className="text-xs opacity-50 text-white">Venda</p><p className="text-sm font-semibold" style={{ color: '#96DAE3' }}>{fmt(item.precoVenda)}</p></div>
      <div className="text-center shrink-0" style={{ minWidth: 90 }}><p className="text-xs opacity-50 text-white">Lucro</p><p className="text-sm font-bold text-green-400">{fmt(lucro)}</p><p className="text-xs text-green-500">+{margem}%</p></div>

      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => onQtd(item.id, item.quantidade - 1)} className="w-6 h-6 rounded border flex items-center justify-center text-sm font-bold cursor-pointer" style={{ borderColor: '#96DAE360', color: '#96DAE3' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#96DAE3'} onMouseLeave={e => e.currentTarget.style.borderColor = '#96DAE360'}>−</button>
        <span className="text-white text-sm font-medium w-4 text-center">{item.quantidade}</span>
        <button onClick={() => onQtd(item.id, item.quantidade + 1)} className="w-6 h-6 rounded border flex items-center justify-center text-sm font-bold cursor-pointer" style={{ borderColor: '#96DAE360', color: '#96DAE3' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#96DAE3'} onMouseLeave={e => e.currentTarget.style.borderColor = '#96DAE360'}>+</button>
      </div>

      <button onClick={() => onRemover(item.id)} className="shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1.5 rounded" style={{ color: '#dc2626' }} onMouseEnter={e => e.currentTarget.style.background = '#dc262220'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <BsTrash3 size={15} />
      </button>
    </div>
  );
}

export default function Cart() {
  const { itensCart, removerDoCart, atualizarQtd } = useCart();
  const [produtosCriados, setProdutosCriados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [containerOpen, setContainerOpen] = useState(false);
  const asideIcons = [
    { image: "Lupa", link: "/search", active: false },
    { image: "Home", link: "/home", active: false },
    { image: "Cart", link: "/cart", active: true },
  ];
  const [asideIconsActive, setAsideIconsActive] = useState(asideIcons);

  const todosItens = [...itensCart, ...produtosCriados.filter(p => !itensCart.find(i => i.id === p.id))];

  function removerItem(id) {
    removerDoCart(id);
    setProdutosCriados(prev => prev.filter(p => p.id !== id));
  }

  function atualizarItem(id, qtd) {
    if (itensCart.find(i => i.id === id)) { atualizarQtd(id, qtd); }
    else {
      if (qtd < 1) return setProdutosCriados(prev => prev.filter(p => p.id !== id));
      setProdutosCriados(prev => prev.map(p => p.id === id ? { ...p, quantidade: qtd } : p));
    }
  }

  const totalCusto = todosItens.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  const totalVenda = todosItens.reduce((acc, p) => acc + (p.precoVenda ?? p.preco) * p.quantidade, 0);
  const totalLucro = totalVenda - totalCusto;
  const margemMedia = totalCusto > 0 ? ((totalLucro / totalCusto) * 100).toFixed(1) : 0;

  const scrollRef = useRef(null); const trackRef = useRef(null); const thumbRef = useRef(null);
  const isDragging = useRef(false); const dragStartY = useRef(0); const dragStartScrollTop = useRef(0); const scrollTimeout = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ top: 0, height: 40 }); const [isScrolling, setIsScrolling] = useState(false); const [progress, setProgress] = useState(0);

  const updateThumb = useCallback(() => {
    const el = scrollRef.current; const track = trackRef.current; if (!el || !track) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const thumbHeight = Math.max((clientHeight / scrollHeight) * track.clientHeight, 40);
    const maxScroll = scrollHeight - clientHeight; const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setThumbStyle({ top: ratio * (track.clientHeight - thumbHeight), height: thumbHeight });
    setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
  }, []);

  const handleScroll = useCallback(() => { updateThumb(); setIsScrolling(true); clearTimeout(scrollTimeout.current); scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000); }, [updateThumb]);

  useEffect(() => {
    const el = scrollRef.current; if (!el) return; updateThumb();
    el.addEventListener("scroll", handleScroll, { passive: true });
    const ro = new ResizeObserver(updateThumb); ro.observe(el);
    return () => { el.removeEventListener("scroll", handleScroll); ro.disconnect(); };
  }, [handleScroll, updateThumb]);

  const onMouseDown = useCallback((e) => {
    e.preventDefault(); isDragging.current = true; dragStartY.current = e.clientY; dragStartScrollTop.current = scrollRef.current?.scrollTop || 0;
    const onMove = (e) => {
      if (!isDragging.current) return; const el = scrollRef.current; const track = trackRef.current; if (!el || !track) return;
      const delta = e.clientY - dragStartY.current; const { scrollHeight, clientHeight } = el;
      const thumbH = Math.max((clientHeight / scrollHeight) * track.clientHeight, 40);
      el.scrollTop = dragStartScrollTop.current + (delta / (track.clientHeight - thumbH)) * (scrollHeight - clientHeight);
    };
    const onUp = () => { isDragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  }, []);

  const onTrackClick = useCallback((e) => {
    if (e.target === thumbRef.current) return; const track = trackRef.current; const el = scrollRef.current; if (!track || !el) return;
    el.scrollTo({ top: ((e.clientY - track.getBoundingClientRect().top) / track.clientHeight) * (el.scrollHeight - el.clientHeight), behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#31303A] h-screen w-screen overflow-hidden flex">
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.thumb-custom{transition:background 0.3s ease;cursor:grab}.thumb-custom:active{cursor:grabbing}.thumb-custom:hover{background:#96DAE3!important}`}</style>

      {modalAberto && <ModalCriarProduto onFechar={() => setModalAberto(false)} onSalvar={p => setProdutosCriados(prev => [...prev, p])} />}

      {/* NAV LATERAL */}
      <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-fit self-center py-6 w-16 rounded-r-2xl shrink-0">
        {asideIconsActive.map((item, index) => (
          <Link key={index} to={item.link} onClick={() => setAsideIconsActive(prev => prev.map((el, i) => ({ ...el, active: i === index })))}>
            <img src={`../../public/${item.image}.svg`} alt={item.image} className={`w-7 hover:opacity-100 transition-all duration-300 ${item.active ? "opacity-100" : "opacity-50"}`} />
          </Link>
        ))}
      </div>

      <div className="flex flex-col flex-1 min-w-0 px-4 pb-4 gap-4 overflow-hidden">

        {/* Dropdown */}
        <div className="flex items-center justify-end shrink-0">
          <div className="relative">
            <button onClick={() => setContainerOpen(p => !p)} className={`bg-[#96DAE3] rounded-b-lg w-10 h-5 flex items-center justify-center cursor-pointer transition-all duration-300 ${containerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <img src="https://img.icons8.com/?size=100&id=4GrGB5l93HFc&format=png&color=31303A" className="w-4 h-4" alt="Dropdown" />
            </button>
            <div className={`absolute right-0 top-0 bg-[#96DAE3] rounded-b-xl z-50 transition-all ease-in-out overflow-hidden ${containerOpen ? 'max-h-60 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
              <div className="flex justify-end px-3 pt-2 pb-2"><button onClick={() => setContainerOpen(false)} className="text-[#31303A] cursor-pointer"><img src="https://img.icons8.com/?size=100&id=39787&format=png&color=000000" className="w-4 h-4" alt="Fechar" /></button></div>
              <ul className="flex flex-col px-5 gap-2 text-sm text-[#31303A] font-medium whitespace-nowrap">
                <Link to='/conta' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Conta</Link>
                <Link to='/conta' className="hover:translate-x-1 transition-transform duration-200 cursor-pointer">Configurações</Link>
                <Link to='/conta' className="flex items-center gap-2 text-[#CE2424] hover:translate-x-1 transition-transform duration-200 cursor-pointer pb-2">Sair <img src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=CE2424" className="w-4" alt="Sair" /></Link>
              </ul>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-4 shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <BsCart3 size={18} style={{ color: '#96DAE3' }} />
            <span className="text-white font-semibold text-sm">Minha Seleção</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#96DAE320', color: '#96DAE3' }}>{todosItens.length} produto{todosItens.length !== 1 ? 's' : ''}</span>
          </div>

          <button onClick={() => setModalAberto(true)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm border-2 text-xs font-medium transition-all duration-200 cursor-pointer" style={{ borderColor: '#96DAE3', color: '#96DAE3', background: 'transparent' }} onMouseEnter={e => { e.currentTarget.style.background = '#96DAE3'; e.currentTarget.style.color = '#31303A'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#96DAE3'; }}>
            <BsPlusLg size={10} /> Crie seu produto
          </button>

          <div className="flex gap-3 ml-auto flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-sm border" style={{ borderColor: '#96DAE340', background: '#96DAE308' }}><FiDollarSign size={13} className="text-white opacity-50" /><div><p className="text-white opacity-40 text-xs leading-none">Custo total</p><p className="text-white text-sm font-semibold">{fmt(totalCusto)}</p></div></div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-sm border" style={{ borderColor: '#96DAE340', background: '#96DAE308' }}><FiPackage size={13} style={{ color: '#96DAE3' }} /><div><p className="opacity-40 text-xs leading-none" style={{ color: '#96DAE3' }}>Receita estimada</p><p className="text-sm font-semibold" style={{ color: '#96DAE3' }}>{fmt(totalVenda)}</p></div></div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-sm border" style={{ borderColor: '#16a34a40', background: '#16a34a08' }}><FiTrendingUp size={13} className="text-green-400" /><div><p className="text-green-400 opacity-60 text-xs leading-none">Lucro estimado</p><p className="text-green-400 text-sm font-bold">{fmt(totalLucro)}</p></div></div>
            <div className="flex items-center px-4 py-2 rounded-sm border" style={{ borderColor: '#16a34a40', background: '#16a34a08' }}><div><p className="text-green-400 opacity-60 text-xs leading-none">Margem média</p><p className="text-green-400 text-sm font-bold">+{margemMedia}%</p></div></div>
          </div>
        </div>

        {/* LISTA */}
        <div className="flex-1 min-h-0 border-2 border-[#96DAE3] rounded-sm flex gap-3 overflow-hidden">
          {todosItens.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 opacity-30">
              <BsCart3 size={48} className="text-white" />
              <p className="text-white text-sm">Nenhum produto selecionado</p>
              <Link to="/search" className="text-xs mt-1" style={{ color: '#96DAE3' }}>Voltar para busca →</Link>
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto overflow-x-hidden p-4">
                <div className="flex gap-4 px-4 pb-2 mb-1 border-b" style={{ borderColor: '#96DAE320' }}>
                  <div style={{ width: 80 }} className="shrink-0" /><div className="flex-1" />
                  <div className="text-xs opacity-40 text-white text-center shrink-0" style={{ minWidth: 90 }}>Custo</div>
                  <div className="text-xs opacity-40 text-white text-center shrink-0" style={{ minWidth: 90 }}>Venda</div>
                  <div className="text-xs opacity-40 text-white text-center shrink-0" style={{ minWidth: 90 }}>Lucro</div>
                  <div className="text-xs opacity-40 text-white text-center shrink-0" style={{ minWidth: 90 }}>Qtd</div>
                  <div style={{ width: 34 }} className="shrink-0" />
                </div>
                <div className="flex flex-col gap-2">
                  {todosItens.map(item => <CartItem key={item.id} item={item} onRemover={removerItem} onQtd={atualizarItem} />)}
                </div>
                <div className="flex justify-end mt-6 pb-2">
                  <button className="px-6 py-2.5 rounded-sm border-2 font-semibold text-sm transition-all duration-200 cursor-pointer" style={{ borderColor: '#96DAE3', color: '#31303A', background: '#96DAE3' }} onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#96DAE3'; }} onMouseLeave={e => { e.currentTarget.style.background = '#96DAE3'; e.currentTarget.style.color = '#31303A'; }}>
                    Exportar Seleção
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 py-4 pr-2 shrink-0" style={{ width: 20 }}>
                <div ref={trackRef} onClick={onTrackClick} style={{ flex: 1, width: 2, background: "#ffffff18", borderRadius: 2, position: "relative", cursor: "pointer" }}>
                  <div ref={thumbRef} onMouseDown={onMouseDown} className="thumb-custom" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: `${thumbStyle.top}px`, height: `${thumbStyle.height}px`, width: 3, background: isScrolling ? "#96DAE3" : "#96DAE380", borderRadius: 3, userSelect: "none" }} />
                </div>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: progress >= 99 ? "#96DAE3" : "#ffffff20", transition: "background 0.4s ease", flexShrink: 0 }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}