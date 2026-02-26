import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function Conta() {
    const { user, logout } = useAuth();
    const [foto, setFoto] = useState(null);
    const inputFotoRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');

    // Estados do formulário
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numeroEnd, setNumeroEnd] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cepErro, setCepErro] = useState('');
    const [cepCarregando, setCepCarregando] = useState(false);

    // Carrega os dados do usuário quando a página abre
    useEffect(() => {
        if (user) {
            carregarPerfil();
        }
    }, [user]);

    async function carregarPerfil() {
        try {
            setEmail(user.email);

            // Pega nome do metadata se não tiver na tabela ainda
            if (user.user_metadata?.firstName) {
                setFirstName(user.user_metadata.firstName);
            }
            if (user.user_metadata?.lastName) {
                setLastName(user.user_metadata.lastName);
            }

            // Busca o resto dos dados da tabela profiles
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Erro ao carregar perfil:', error);
                return;
            }

            if (data) {
                // Se tiver nome na tabela, sobrescreve o do metadata
                setFirstName(data.first_name || user.user_metadata?.firstName || '');
                setLastName(data.last_name || user.user_metadata?.lastName || '');
                setPhone(data.phone || '');
                setCardNumber(data.card_number || '');
                setCep(data.cep || '');
                setEstado(data.estado || '');
                setCidade(data.cidade || '');
                setBairro(data.bairro || '');
                setRua(data.rua || '');
                setNumeroEnd(data.numero || '');
                setComplemento(data.complemento || '');
                setFoto(data.avatar_url || null);
            }
        } catch (err) {
            console.error('Erro:', err);
        }
    }

    async function salvarPerfil() {
        setLoading(true);
        setSucesso('');
        setErro('');

        try {
            const profileData = {
                user_id: user.id,
                first_name: firstName,
                last_name: lastName,
                phone,
                card_number: cardNumber,
                cep,
                estado,
                cidade,
                bairro,
                rua,
                numero: numeroEnd,
                complemento,
                avatar_url: foto,
                updated_at: new Date().toISOString(),
            };

            // Tenta atualizar primeiro, se não existir, insere
            const { error } = await supabase
                .from('profiles')
                .upsert(profileData, { onConflict: 'user_id' });

            if (error) throw error;

            setSucesso('Perfil salvo com sucesso!');
            setTimeout(() => setSucesso(''), 3000);
        } catch (err) {
            console.error('Erro ao salvar:', err);
            setErro('Erro ao salvar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    async function buscarCep(valor) {
        const apenasNumeros = valor.replace(/\D/g, '');
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

    function formatarTelefone(valor) {
        const apenasNumeros = valor.replace(/\D/g, '');

        if (apenasNumeros.length <= 10) {
            // Formato: (48) 9999-9999
            return apenasNumeros
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            // Formato: (48) 99999-9999
            return apenasNumeros
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .slice(0, 15); // limita o tamanho
        }
    }

    function formatarCartao(valor) {
        const apenasNumeros = valor.replace(/\D/g, '');
        return apenasNumeros
            .replace(/(\d{4})(?=\d)/g, '$1 ')
            .slice(0, 19);
    }

    function handleFoto(e) {
        const file = e.target.files[0];
        if (file) {
            // Por enquanto só guarda a URL local
            // Para upload real no Supabase Storage, precisa de mais código
            setFoto(URL.createObjectURL(file));
        }
    }

    async function handleLogout() {
        await logout();
        window.location.href = '/login';
    }

    return (
        <div className="bg-[#31303A] min-h-screen w-screen overflow-x-hidden flex flex-col p-8 gap-4">

            {/* Seta de voltar */}
            <div>
                <div className='bg-[#3C3A47] flex justify-center rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] p-3 w-14 cursor-pointer hover:bg-[#96DAE3] transition-all duration-300'>
                    <button onClick={() => window.history.back()} className='cursor-pointer'>
                        <img src="../public/Voltar.svg" alt="Voltar" className='w-4.5' />
                    </button>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="bg-[#3C3A47] text-[#FFFFFF] text-lg font-medium rounded-2xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] flex w-full p-3 py-5 gap-8">


                {/* Menu lateral */}
                <div className="flex flex-col gap-3 pt-4 shrink-0">
                    <button className="bg-[#2E2D37] py-2 px-6 rounded-md hover:bg-[#96DAE3] hover:text-[#31303A] cursor-pointer transition-all duration-500">
                        Minha conta
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-[#2E2D37] py-2 px-6 rounded-md hover:bg-[#96DAE3] hover:text-[#31303A] cursor-pointer transition-all duration-500 w-full"
                    >
                        Sair
                    </button>
                </div>

                {/* Divisor */}
                <div className="border border-[#96DAE3] self-stretch shrink-0" />


                {/* Formulário */}
                <div className="flex flex-col flex-1 gap-4 pt-2 pl-2 min-w-0">
                    

                    {/* Mensagens de sucesso/erro */}
                    {sucesso && (
                        <div className="bg-[#96dae36a] border-2 border-[#96DAE3] text-[#31303A] px-4 py-2 rounded-md text-sm">
                            {sucesso}
                        </div>
                    )}
                    {erro && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md text-sm">
                            {erro}
                        </div>
                    )}

                    {/* E-mail */}
                    <div className="flex flex-col gap-1.5">
                        <p className="pl-1 text-sm">E-mail</p>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="bg-[#2E2D37] rounded-md p-3 pl-5 text-sm outline-none w-full max-w-4xl opacity-60 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 pl-1">O e-mail não pode ser alterado</p>
                    </div>

                    <div className="flex justify-between">
                        {/* Campos à esquerda */}
                        <div className="flex flex-col gap-5 flex-1 max-w-4xl">

                            {/* Nome + Sobrenome */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Nome</p>
                                    <input
                                        type="text"
                                        placeholder="Yuri"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-gray-200 text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Sobrenome</p>
                                    <input
                                        type="text"
                                        placeholder="Alberto"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="bg-[#2E2D37] rounded-md p-3 pl-5 text-gray-200 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                            </div>

                            {/* Número + Cartão */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Número</p>
                                    <input
                                        type="text"
                                        placeholder="(48) 99999-9999"
                                        value={phone}
                                        onChange={e => setPhone(formatarTelefone(e.target.value))}
                                        maxLength={15}
                                        className="bg-[#2E2D37] rounded-md p-3 pl-5 text-gray-200 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Cartão vinculado</p>
                                    <div className="relative">
                                        <img src="../public/Cartao.svg" alt="Mastercard" className="absolute mx-2 top-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="4532 8901 2247 5619"
                                            value={cardNumber}
                                            onChange={e => setCardNumber(formatarCartao(e.target.value))}
                                            maxLength={19}
                                            className="bg-[#2E2D37] text-gray-200 rounded-md p-3 pl-13 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CEP */}
                            <div className="flex gap-4 items-end">
                                <div className="flex flex-col gap-1.5" style={{ maxWidth: 160 }}>
                                    <p className="pl-1 text-sm">CEP</p>
                                    <input
                                        type="text"
                                        placeholder="00000-000"
                                        maxLength={9}
                                        value={cep}
                                        onChange={e => buscarCep(e.target.value)}
                                        className="bg-[#2E2D37] rounded-md p-3 pl-5 text-gray-200 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                    {cepErro && <p className="text-red-400 text-xs ml-1">{cepErro}</p>}
                                    {cepCarregando && (
                                        <span className="ml-1 text-[#96DAE3] text-xs animate-pulse">Buscando...</span>
                                    )}
                                </div>
                            </div>

                            {/* Estado + Cidade + Bairro */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Estado</p>
                                    <input
                                        value={estado}
                                        onChange={e => setEstado(e.target.value)}
                                        type="text"
                                        placeholder="SP"
                                        className="bg-[#2E2D37] text-gray-200 rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Cidade</p>
                                    <input
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                        type="text"
                                        placeholder="São Paulo"
                                        className="bg-[#2E2D37] text-gray-200 rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Bairro</p>
                                    <input
                                        value={bairro}
                                        onChange={e => setBairro(e.target.value)}
                                        type="text"
                                        placeholder="Centro"
                                        className="bg-[#2E2D37] text-gray-200 rounded-md p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                            </div>

                            {/* Rua + Número + Complemento */}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Rua</p>
                                    <input
                                        value={rua}
                                        onChange={e => setRua(e.target.value)}
                                        type="text"
                                        placeholder="Rua das Flores"
                                        className="bg-[#2E2D37] rounded-md text-gray-200 p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5" style={{ maxWidth: 110 }}>
                                    <p className="pl-1 text-sm">Número</p>
                                    <input
                                        value={numeroEnd}
                                        onChange={e => setNumeroEnd(e.target.value)}
                                        type="text"
                                        placeholder="123"
                                        className="bg-[#2E2D37] rounded-md text-gray-200 p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <p className="pl-1 text-sm">Complemento</p>
                                    <input
                                        value={complemento}
                                        onChange={e => setComplemento(e.target.value)}
                                        type="text"
                                        placeholder="Apto 4"
                                        className="bg-[#2E2D37] rounded-md text-gray-200 p-3 pl-5 placeholder:text-[#ffffff55] text-sm outline-none w-full"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Foto de perfil */}
                        <div className="flex flex-col gap-2 shrink-0 px-3" style={{ width: 200 }}>
                            <p className="pl-1 text-sm">Foto de perfil</p>

                            <div
                                onClick={() => inputFotoRef.current.click()}
                                className="bg-[#2E2D37] rounded-md cursor-pointer overflow-hidden flex items-center justify-center relative group"
                                style={{ height: 200 }}
                            >
                                {foto ? (
                                    <img src={foto} alt="Perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="../public/User.svg" alt="Perfil" className="w-24 opacity-40" />
                                )}

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: '#00000060' }}>
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
                    <div className="flex pb-2">
                        <button
                            onClick={salvarPerfil}
                            disabled={loading}
                            className="bg-[#96DAE3] text-[#31303A] font-semibold text-sm px-8 py-2.5 rounded-md cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}