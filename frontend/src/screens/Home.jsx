import React from "react";

export default function Home() {
    return (
        <div className="bg-[#31303A] min-h-screen max-w-screen overflow-hidden flex">

            {/* Nav lateral */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 h-full mt-50 py-6 w-14 sticky rounded-r-[10px]">
                <img src="../../public/Lupa.svg" alt="Lupa" className="w-7 cursor-pointer" />
                <img src="../../public/Home.svg" alt="Casinha" className="w-7 cursor-pointer" />    
                <img src="../../public/Foguinho.svg" alt="Em alta" className="w-7 cursor-pointer" />
                <img src="../../public/Settings.svg" alt="Configurações" className="w-7 cursor-pointer" />
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-col flex-1 max-w-390 max-h-190 px-4 pb-4 gap-4">

                {/* Setinha */}
                <div className="flex justify-end">
                    <button className="bg-[#96DAE3] flex justify-center cursor-pointer rounded-b-xl p-1 w-14 outline-none">
                        <img src="../../public/Setinha.svg" alt="arrow" className="w-5" />
                    </button>
                </div>

                {/* Barra de mercados */}
                <div className="flex items-center gap-8 ml-5 flex-wrap text-[#D7D7D7]">
                    <label className="text-[#96DAE3] flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]"/>
                        <span>Aliexpress</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Shopee</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Mercado Livre</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-7 h-7 appearance-none rounded-sm cursor-pointer border-2 border-[#96DAE3]
                        checked:bg-[#96DAE3] checked:[box-shadow:inset_0_0_0_3px_#31303A]" />
                        <span>Amazon</span>
                    </label>
                    <button className="flex justify-center items-center font-medium border-2 border-[#D7D7D7] rounded-sm w-7 h-7 cursor-pointer outline-none text-[#D7D7D7]">
                        <span className="text-xl leading-none mb-1">+</span>
                    </button>
                </div>

                {/* Container cinza principal */}
                <div className="flex flex-col bg-[#49475B] rounded-xl p-3.5 gap-15 flex-1">

                    {/* Section top — 3 cards */}
                    <div className="flex gap-5 max-w-370 h-70">

                        {/* Bruto */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col font-medium gap-10 rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 pl-2 w-60">
                            <div className="flex text-[#31303A] gap-0.5">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-sm">1 Dia</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5">3 Dias</span>

                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5">2 Semanas</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/Vendas.svg" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Vendas: R$2.912,24 <span className="text-[#5FB057]">(+)</span> </span>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/Produtos.svg" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Produtos: R$1.734,86 <span className="text-[#B93F3F]">(-)</span> </span>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/Frete.svg" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Frete: R$226,40 <span className="text-[#B93F3F]">(-)</span> </span>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/Total.svg" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Total: <span className="text-[#5FB057]">R$950,98</span> </span>
                                    </div>
                            </div>
                        </div>

                        {/* Líquido */}
                        <div className="bg-[#31303A] text-[#E5E3FF] flex flex-col font-medium gap-10 rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-3 pl-2 w-60">
                            <div className="flex text-[#31303A] gap-0.5">
                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-l-sm">1 Dia</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5">3 Dias</span>

                                <span className="bg-[#5E5991] cursor-pointer text-[#E5E3FF] p-0.5">2 Semanas</span>

                                <span className="bg-[#E5E3FF] cursor-pointer p-0.5 rounded-r-sm">1 Mês</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Lucros: R$950,98 <span className="text-[#5FB057]">(+)</span> </span>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Taxas: R$226,40 <span className="text-[#B93F3F]">(-1%)</span> </span>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">
                                            <img src="../../public/Total.svg" alt="Vendas" className="w-7" />
                                        </div>
                                        <span>Total: <span className="text-[#5FB057]">R$941,47</span> </span>
                                    </div>
                            </div>
                        </div>

                        {/* Gráfico */}
                        <div className="bg-[#31303A] text-[#31303A] flex flex-col font-medium rounded-lg shadow-[4px_9px_20px_rgba(0,0,0,0.30)] pt-2 pl-5 gap-3 flex-3">
                            <div className="flex gap-0.5">
                                <span className="bg-[#5E5991] cursor-pointer rounded-l-lg text-[#E5E3FF]">Visualizações</span>

                                <span className="bg-[#E5E3FF] cursor-pointer">Cliques</span>

                                <span className="bg-[#E5E3FF] cursor-pointer">Compras</span>

                                <div className="flex gap-0.5 ml-auto pr-5">
                                    <span className="bg-[#E5E3FF] cursor-pointer">1Dia</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">5Dias</span>

                                    <span className="bg-[#E5E3FF] cursor-pointer">2Semanas</span>

                                    <span className="bg-[#5E5991] cursor-pointer rounded-r-lg text-[#E5E3FF]">1Mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section bottom */}
                    <div className="flex justify-between w-full gap-5">

                        {/* Esquerda: GoogleAds + Plano */}
                        <div className="flex gap-5">

                            {/* GoogleAds */}
                            <div className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse h-77 w-74 rounded-xl shrink-0">
                                <button className="bg-[#2C2399] text-[#E5E3FF] p-4 font-medium cursor-pointer outline-none rounded-b-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] w-full">
                                    Conectar GoogleAds
                                </button>
                            </div>

                            {/* Plano */}
                            <div className="bg-[#31303A] text-[#FFFFFF] flex flex-col font-medium h-77 w-50 text-center rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] shrink-0 overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#E5E3FF] text-[#31303A] justify-center p-2 font-semibold">
                                        <span>Plano mensal: 80$</span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10">

                                            </div>
                                            <div>
                                                <p></p>
                                                <span>Seleção de <span>temas</span> que pode conter na aba de filtros.</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10 text-[#31303A]">
                                                3/4
                                            </div>
                                            <span>Produtos</span>
                                        </div>
                                        
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-[#E5E3FF] p-2 rounded-lg max-w-10 text-[#31303A]">
                                                0/3
                                            </div>
                                            <span>Relatórios</span>
                                        </div>

                                    </div>
                                </div>
                                <button className="bg-[#5E5991] p-4 font-medium cursor-pointer outline-none w-full">
                                    Botão melhorar plano
                                </button>
                            </div>

                        </div>

                        {/* Direita: Foto loja */}
                        <div className="flex items-end">
                            <div className="bg-[#9997B1] flex flex-col h-48 w-44 rounded-xl shadow-[4px_9px_20px_rgba(0,0,0,0.30)] overflow-hidden shrink-0">
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-[#000000]">Foto loja</p>
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