import React from "react";

export default function Home() {
    return (
        <div className="bg-[#31303A] min-h-screen w-screen overflow-hidden flex">
            


            {/* Nav lateral */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-full py-6 w-16 sticky top-0 rounded-r-2xl shrink-0">
                <img src="../../public/Lupa.svg" alt="Lupa" className="w-5 cursor-pointer" />
                <img src="../../public/Home.svg" alt="Casinha" className="w-5 cursor-pointer" />
                <img src="../../public/Foguinho.svg" alt="Em alta" className="w-5 cursor-pointer" />
                <img src="../../public/Settings.svg" alt="Configurações" className="w-5 cursor-pointer" />
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-col flex-1 min-w-0 px-4 pb-4 gap-4">

                {/* Setinha */}
                <div className="flex justify-end">
                    <button className="bg-[#96DAE3] flex justify-center cursor-pointer rounded-b-xl p-1.5 w-10 outline-none">
                        <img src="../../public/Setinha.svg" alt="arrow" className="w-4" />
                    </button>
                </div>

                {/* Barra de mercados */}
                <div className="flex items-center gap-8 ml-5 flex-wrap text-[#D7D7D7]">
                    <label className="text-[#96DAE3] flex items-center gap-2 cursor-pointer">
                        <input type="checkbox"
                        className="w-6 h-6 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]"/>
                        <span>Aliexpress</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-6 h-6 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Shopee</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-6 h-6 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Mercado Livre</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-6 h-6 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Amazon</span>
                    </label>
                    <button className="flex justify-center items-center font-medium border-2 border-[#D7D7D7] rounded-sm w-7 h-7 cursor-pointer outline-none text-[#D7D7D7]">
                        <span className="text-xl leading-none mb-1">+</span>
                    </button>
                </div>

                {/* Container cinza principal */}
                <div className="flex flex-col bg-[#49475B] rounded-xl p-5 gap-5 flex-1">

                    {/* Section top — 3 cards */}
                    <div className="flex gap-5 w-full h-64">

                        {/* Bruto */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex justify-center rounded-lg pt-8 flex-1">
                            <p>Bruto</p>
                        </div>

                        {/* Líquido */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex justify-center rounded-lg pt-8 flex-1">
                            <p>Líquido</p>
                        </div>

                        {/* Gráfico */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col rounded-lg pt-2 pl-5 gap-3 flex-3">
                            <div className="flex gap-5">
                                <a href="#" className="underline underline-offset-4 outline-none">Visualizações</a>
                                <a href="#" className="underline underline-offset-4 outline-none">Cliques</a>
                                <a href="#" className="underline underline-offset-4 outline-none">Compras</a>
                                <div className="flex gap-3 ml-auto pr-5">
                                    <a href="#" className="underline underline-offset-4 outline-none">1Dia</a>
                                    <a href="#" className="underline underline-offset-4 outline-none">5Dias</a>
                                    <a href="#" className="underline underline-offset-4 outline-none">2Semanas</a>
                                    <a href="#" className="underline underline-offset-4 outline-none">1Mês</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Section bottom */}
                    <div className="flex justify-between w-full gap-5">

                        {/* Esquerda: GoogleAds + Plano */}
                        <div className="flex gap-5">

                            {/* GoogleAds */}
                            <div className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse h-64 w-64 rounded-xl shrink-0">
                                <button className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none rounded-b-xl w-full">
                                    Conectar GoogleAds
                                </button>
                            </div>

                            {/* Plano */}
                            <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col justify-between h-64 w-52 rounded-xl shrink-0 overflow-hidden">
                                <div className="flex flex-col gap-4 p-5">
                                    <p>Benefícios do plano</p>
                                    <p>Quantos faltam para uso</p>
                                </div>
                                <button className="bg-[#5E5991] p-4 font-medium cursor-pointer outline-none w-full">
                                    Botão melhorar plano
                                </button>
                            </div>

                        </div>

                        {/* Direita: Foto loja */}
                        <div className="flex items-end">
                            <div className="bg-[#9997B1] flex flex-col h-48 w-44 rounded-xl overflow-hidden shrink-0">
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-[#E5E3FF]">Foto loja</p>
                                </div>
                                <button className="bg-[#5E5991] text-[#FFFFFF] font-medium p-3 cursor-pointer outline-none w-full">
                                    Acessar loja
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}