export default function Conta() {
    return (
        // Página inteira
        <div className="bg-[#31303A] min-h-screen max-w-screen overflow-x-hidden pt-20 pl-14">

            {/* Conteúdo principal */}
            <div className="bg-[#3C3A47] text-[#FFFFFF] font-medium rounded-lg drop-shadow-lg flex max-w-372 min-h-160 pl-3 pt-3 pb-3 gap-5">
                <div className="flex flex-col gap-3 pt-4">
                    <button className="bg-[#2E2D37] p-2 pr-3 pl-10 rounded-md cursor-pointer">Minha conta</button>
                    <button className="bg-[#2E2D37] p-2 pl-5 rounded-md cursor-pointer max-w-20">Sair</button>
                </div>

                <div className="border-1 border-[#96DAE3] w-[1px] min-h-full"> </div> {/* Div vazia */}

                <div className="flex flex-col min-w-318 gap-6"> {/* Info */}
                    <div className="flex flex-col"> {/* E-mail */}
                        <p className="pl-2">E-mail</p>
                        <input type="email" placeholder="email.email@gmail.com" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                    </div>

                    <div className="flex gap-10"> {/* Nome, sobrenome */}
                        <div className="flex flex-col gap-1.5">
                            <p className="pl-2">Nome</p>
                            <input type="text" placeholder="James" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <p className="pl-2">Sobrenome</p>
                            <input type="text" placeholder="Saladade Fruta" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>
                    </div>

                    <div className="flex gap-5"> {/* Número, cartão */}
                        <div className="flex flex-col ">
                            <p className="pl-2">Número</p>
                            <input type="number" placeholder="(48) 99999-9999" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>

                        <div>
                            <p className="pl-2">Cartão vinculado</p>
                            <input type="text" placeholder="Mastercard" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>
                    </div>

                    <div className="flex gap-3"> {/* Estado, Cidade, Rua */}
                        <div className="flex flex-col">
                            <p className="pl-2">Estado</p>
                            <input type="text" placeholder="Diddy’s States" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>

                        <div className="flex flex-col">
                            <p className="pl-2">Cidade</p>
                            <input type="text" placeholder="Ilha Epstein" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>

                        <div className="flex flex-col">
                            <p className="pl-2">Rua</p>
                            <input type="text" placeholder="Rua Jeffrey Epstein" className="bg-[#2E2D37] rounded-md p-2 pl-5 placeholder:text-[#FFFFFF]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}