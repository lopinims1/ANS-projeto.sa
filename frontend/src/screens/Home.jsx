import React from "react";

export default function Home() {
    return (
        <div className="bg-[#31303A] min-h-screen max-w-screen flex"> {/* Tela */}
            <div className="bg-[#96DAE3] flex flex-col items-center justify-center gap-7 max-h-73 w-[4vw] mt-60 rounded-r-2xl"> {/* Nav lateral */}
                <img src="../../public/Lupa.svg" alt="Lupa" className="max-w-[42%] cursor-pointer"/>

                <img src="../../public/Home.svg" alt="Casinha" className="max-w-[42%] cursor-pointer"/>

                <img src="../../public/Foguinho.svg" alt="Em alta" className="max-w-[42%] cursor-pointer"/>

                <img src="../../public/Settings.svg" alt="Configurações" className="max-w-[42%] cursor-pointer"/>
            </div>

            <div className="flex flex-col pl-5"> 
                <div className="flex justify-end pr-10 rounded-b-lg max-h-5"> {/* Setinha para baixo */}
                    <button className="bg-[#96DAE3] flex justify-center cursor-pointer rounded-b-xl p-1.5 max-w-12 outline-none"> <img src="../../public/Setinha.svg" alt="Seta apontando para baixo" className="w-[40%]"/> </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center text-center pl-10 gap-12 text-[#D7D7D7]"> {/* Mercados */}
                        <label className="text-[#96DAE3] flex items-center gap-3.5"> <input type="checkbox" className="border-1-[#96DAE3] w-6 h-6 cursor-pointer outline-none"/> <span> Aliexpress </span> </label>

                        <label className="flex text-[#D7D7D7] items-center gap-2"> <input type="checkbox" className="border-1-[#96DAE3] w-6 h-6 cursor-pointer outline-none"/> <span> Shopee </span> </label>

                        <label className="flex text-[#D7D7D7] items-center gap-2"> <input type="checkbox" className="border-1-[#96DAE3] w-6 h-6 cursor-pointer outline-none"/> <span> Mercado Livre </span> </label>

                        <label className="flex text-[#D7D7D7] items-center gap-2"> <input type="checkbox" className="border-1-[#96DAE3] w-6 h-6 cursor-pointer outline-none"/> <span> Amazon </span> </label>

                        <button className="flex justify-center items-center font-medium border-2 rounded-xl w-8 h-8 cursor-pointer outline-none"> <span className="text-4xl">+</span> </button>
                    </div>

                    <div className="flex flex-col bg-[#49475B] rounded-xl h-[91vh] w-[94vw]"> {/* Conteúdo principal */}
                        <div className="flex gap-5 ml-5 mt-7"> {/* Section top */}
                            <div className="bg-[#31303A] text-[#E5E3FF] flex justify-center h-[35vh] w-[17vw] rounded-lg pt-8">
                                <p>Bruto</p>
                            </div>

                            <div className="bg-[#31303A] text-[#E5E3FF] flex justify-center h-[35vh] w-[17vw] rounded-lg pt-8">
                                <p>Líquido</p>
                            </div>

                            <div className="bg-[#31303A] text-[#E5E3FF] flex h-[35vh] w-[55.5vw] rounded-lg pt-2 pl-5 gap-3">
                                <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">Visualizações</a>

                                <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">Cliques</a>

                                <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">Compras</a>

                                <div className="flex gap-3 pl-128">
                                    <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">1Dia</a>

                                    <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">5Dias</a>

                                    <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">2Semanas</a>

                                    <a href="#" className="underline underline-offset-4 h-[1vh] outline-none">1Mês</a>
                                </div>
                            </div>
                        </div> 

                        <div className="flex gap-219 ml-5 mt-15"> {/* Section bottom */}
                            <div className="flex gap-5"> {/* Section bottom left */}
                                <div className="bg-[url('../../public/GoogleAds.svg')] bg-no-repeat bg-cover flex flex-col-reverse h-[43vh] w-[20vw] rounded-xl">
                                    <button className="bg-[#2C2399] text-[#E5E3FF] p-7 font-medium cursor-pointer outline-none rounded-b-lg w-full">Conectar GoogleAds</button>
                                </div>

                                <div className="bg-[#31303A] text-[#E5E3FF] flex justify-end text-center flex-col gap-30 h-[43vh] w-[15vw] rounded-xl rounded-b-lg">
                                    <p className="">Benefícios do plano</p>

                                    <p className="">Quantos faltam para uso</p>

                                    <button className="bg-[#5E5991] p-7 font-medium cursor-pointer outline-none rounded-b-lg">Botão melhorar plano</button>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse">
                                <div className="bg-[#9997B1] flex flex-col h-[20vh] w-[10vw] gap-24 pt-5 rounded-xl rounded-b-lg text-center"> {/* Section bottom right */}
                                    <p className="">Foto loja</p>

                                    <button className="bg-[#5E5991] text-[#FFFFFF] font-medium p-3.5 cursor-pointer outline-none rounded-b-lg w-full">Acessar loja</button>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
}