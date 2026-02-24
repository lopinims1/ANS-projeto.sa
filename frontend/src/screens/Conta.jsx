import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Conta() {
    return (
        // Página inteira
        <div className="bg-[#31303A] min-h-screen max-w-screen overflow-x-hidden pt-23 pl-34">

            {/* Conteúdo principal */}
            <div className="bg-[#3C3A47] text-[#FFFFFF] text-lg font-medium rounded-2xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] flex max-w-372 min-h-180 pl-3 pt-3 pb-3 gap-8">
                <div className="flex flex-col gap-3 pt-4">
                    <button className="bg-[#2E2D37] p-2 pr-3 pl-10 rounded-md cursor-pointer min-w-36">Minha conta</button>

                    <Link to="/" className='max-w-20 rounded-md'>
                        <button className="bg-[#2E2D37] p-2 pl-5 pr-1 rounded-md cursor-pointer w-full">Sair</button>
                    </Link>
                </div>

                <div className="border-1 border-[#96DAE3] min-h-full"> </div> {/* Div vazia */}

                <div className="flex flex-col min-w-308 gap-6 pt-2 pl-2"> {/* Info */}
                    <div className="flex flex-col"> {/* E-mail */}
                        <p className="pl-4">E-mail</p>
                        <input type="email" placeholder="email.email@gmail.com" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#FFFFFF]" />
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-9">
                            <div className="flex gap-5"> {/* Nome, sobrenome */}
                                <div className="flex flex-col gap-1.5 min-w-65">
                                    <p className="pl-4">Nome</p>
                                    <input type="text" placeholder="James" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>

                                <div className="flex flex-col gap-1.5 min-w-70">
                                    <p className="pl-4">Sobrenome</p>
                                    <input type="text" placeholder="Saladade Fruta" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>
                            </div>

                            <div className="flex gap-5"> {/* Número, cartão */}
                                <div className="flex flex-col max-w-42">
                                    <p className="pl-4">Número</p>
                                    <input type="number" placeholder="(48) 99999-9999" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>

                                <div className="flex flex-col max-w-60">
                                    <p className="pl-4">Cartão vinculado</p>
                                    <div className="relative">
                                        <img
                                            src="../public/Cartao.svg"
                                            alt="Ícone do Mastercard"
                                            className="absolute flex left-28 top-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none"
                                        />

                                        <input type="text" placeholder="Mastercard" className="bg-[#2E2D37] rounded-md p-3 pl-5 placeholder:text-[#FFFFFF]" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3"> {/* Estado, Cidade, Rua */}
                                <div className="flex flex-col max-w-50">
                                    <p className="pl-4">Estado</p>
                                    <input type="text" placeholder="Diddy’s States" className="bg-[#2E2D37] rounded-md p-2.5 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>

                                <div className="flex flex-col max-w-50">
                                    <p className="pl-4">Cidade</p>
                                    <input type="text" placeholder="Ilha Epstein" className="bg-[#2E2D37] rounded-md p-2.5 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>

                                <div className="flex flex-col max-w-55">
                                    <p className="pl-4">Rua</p>
                                    <input type="text" placeholder="Rua Jeffrey Epstein" className="bg-[#2E2D37] rounded-md p-2.5 pl-5 placeholder:text-[#FFFFFF]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-end min-w-68">
                            <div className="bg-[#2E2D37] flex min-h-70 justify-center rounded-md p-2 cursor-pointer"> {/* Imagem de perfil */}
                                <img src="../public/User.svg" alt="Imagem de perfil" className="w-40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}