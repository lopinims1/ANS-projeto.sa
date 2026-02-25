import { Link } from 'react-router-dom'
import { useState, useRef } from 'react';

export default function Conta() {
    const [foto, setFoto] = useState(null);
    const inputFotoRef = useRef(null);

    // Estados do endereço (preenchidos pelo ViaCEP)
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numeroEnd, setNumeroEnd] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cepErro, setCepErro] = useState('');
    const [cepCarregando, setCepCarregando] = useState(false);

    async function buscarCep(valor) {
        const apenasNumeros = valor.replace(/\D/g, '');
        // Formata com máscara enquanto digita
        const formatado = apenasNumeros.length > 5
            ? apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5, 8)
            : apenasNumeros;
        setCep(formatado);
        setCepErro('');

        if (apenasNumeros.length === 8) {
            setCepCarregando(true);
            try {
                const res = await fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);
                const data = await res.json();
                if (data.erro) {
                    setCepErro('CEP não encontrado.');
                    setEstado(''); setCidade(''); setBairro(''); setRua('');
                } else {
                    setEstado(data.uf || '');
                    setCidade(data.localidade || '');
                    setBairro(data.bairro || '');
                    setRua(data.logradouro || '');
                }
            } catch {
                setCepErro('Erro ao buscar CEP.');
            } finally {
                setCepCarregando(false);
            }
        }
    }

    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) setFoto(URL.createObjectURL(file));
    }

    return (
        // Página inteira
        <div className="bg-[#31303A] min-h-screen w-screen overflow-x-hidden flex flex-col p-8 gap-4">

            {/* Seta de voltar — canto superior esquerdo */}
            <div>
                <div className='bg-[#3C3A47] flex justify-center rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] p-3 w-14 cursor-pointer'>
                    <button onClick={() => window.history.back()} className='cursor-pointer'>
                        <img src="../public/Voltar.svg" alt="Voltar" className='w-4.5' />
                    </button>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="bg-[#3C3A47] text-[#FFFFFF] text-lg font-medium rounded-2xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] flex w-full p-3 gap-8">

                {/* Menu lateral */}
                <div className="flex flex-col gap-3 pt-4 shrink-0">
                    <button className="bg-[#2E2D37] py-2 px-6 rounded-md cursor-pointer">Minha conta</button>
                    <Link to="/">
                        <button className="bg-[#2E2D37] py-2 px-6 rounded-md cursor-pointer w-full">Sair</button>
                    </Link>
                </div>

                {/* Divisor */}
                <div className="border border-[#96DAE3] self-stretch shrink-0" />

                {/* Formulário */}
                <div className="flex flex-col flex-1 gap-6 pt-2 pl-2 min-w-0">

                    {/* E-mail */}
                    <div className="flex flex-col gap-1.5">
                        <p className="pl-1 text-sm">E-mail</p>
                        <input type="email" placeholder="seuemail@gmail.com" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                    </div>

                    <div className="flex gap-6">
                        {/* Campos à esquerda */}
                        <div className="flex flex-col gap-5 flex-1 max-w-230">

                            {/* Nome + Sobrenome */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Nome</p>
                                    <input type="text" placeholder="Yuri" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Sobrenome</p>
                                    <input type="text" placeholder="Alberto" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                            </div>

                            {/* Número + Cartão */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Número</p>
                                    <input type="text" placeholder="(48) 99999-9999" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Cartão vinculado</p>
                                    <div className="relative">
                                        <img src="../public/Cartao.svg" alt="Mastercard" className="absolute mx-2 top-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none" />
                                        <input type="text" placeholder="4532 8901 2247 5619" className="bg-[#2E2D37] rounded-md p-3 pl-13 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                    </div>
                                </div>
                            </div>

                            {/* CEP */}
                            <div className="flex gap-4 items-end">
                                <div className="flex flex-col gap-1.5" style={{maxWidth: 160}}>
                                    <p className="pl-1 text-sm">CEP</p>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="00000-000"
                                            maxLength={9}
                                            value={cep}
                                            onChange={e => buscarCep(e.target.value)}
                                            className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                        />
                                    </div>
                                    {cepErro && <p className="text-red-400 text-xs ml-1">{cepErro}</p>}
                                        {cepCarregando && (
                                            <span className="ml-1 text-[#96DAE3] text-xs animate-pulse">Buscando...</span>
                                        )}
                                </div>
                            </div>

                            {/* Estado + Cidade + Bairro — preenchidos pelo ViaCEP */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Estado</p>
                                    <input value={estado} onChange={e => setEstado(e.target.value)} type="text" placeholder="SP" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Cidade</p>
                                    <input value={cidade} onChange={e => setCidade(e.target.value)} type="text" placeholder="São Paulo" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Bairro</p>
                                    <input value={bairro} onChange={e => setBairro(e.target.value)} type="text" placeholder="Centro" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                            </div>

                            {/* Rua + Número + Complemento */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Rua</p>
                                    <input value={rua} onChange={e => setRua(e.target.value)} type="text" placeholder="Rua das Flores" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5" style={{maxWidth: 110}}>
                                    <p className="pl-1 text-sm">Número</p>
                                    <input value={numeroEnd} onChange={e => setNumeroEnd(e.target.value)} type="text" placeholder="123" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Complemento</p>
                                    <input value={complemento} onChange={e => setComplemento(e.target.value)} type="text" placeholder="Apto 4" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full" />
                                </div>
                            </div>

                        </div>

                        {/* Foto de perfil */}
                        <div className="flex flex-col gap-2 shrink-0" style={{width: 200}}>
                            <p className="pl-1 text-sm">Foto de perfil</p>

                            {/* Área da foto — clica para trocar */}
                            <div
                                onClick={() => inputFotoRef.current.click()}
                                className="bg-[#2E2D37] rounded-md cursor-pointer overflow-hidden flex items-center justify-center relative group"
                                style={{height: 200}}
                            >
                                {foto ? (
                                    <img src={foto} alt="Perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="../public/User.svg" alt="Perfil" className="w-24 opacity-40" />
                                )}

                                {/* Overlay ao hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{background:'#00000060'}}>
                                    <span className="text-white text-xs font-medium">Trocar foto</span>
                                </div>
                            </div>

                            <input
                                ref={inputFotoRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFoto}
                                className="hidden"
                            />

                            {foto && (
                                <button
                                    onClick={() => setFoto(null)}
                                    className="text-xs text-[#96DAE3] opacity-60 hover:opacity-100 transition cursor-pointer text-center"
                                >
                                    Remover foto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Botão salvar */}
                    <div className="flex justify-end pb-2">
                        <button className="bg-[#96DAE3] text-[#31303A] font-semibold text-sm px-8 py-2.5 rounded-md cursor-pointer hover:opacity-90 transition">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}