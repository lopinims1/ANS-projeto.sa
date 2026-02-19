import { BiLike, BiDislike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div className="bg-[#31303A] min-h-screen w-screen flex overflow-x-hidden">

      {/* NAV LATERAL */}
      <div className="bg-[#96DAE3] flex flex-col items-center gap-7 py-6 w-16 rounded-r-2xl fixed left-0 top-1/2 -translate-y-1/2">
        <img src="/Lupa.svg" className="w-5 cursor-pointer" />
        <img src="/Home.svg" className="w-5 cursor-pointer" />
        <img src="/Foguinho.svg" className="w-5 cursor-pointer" />
        <img src="/Settings.svg" className="w-5 cursor-pointer" />
      </div>

      {/* CONTEÚDO */}
      <div className="flex flex-col flex-1 p-6 pl-24 gap-4 overflow-x-hidden">

        {/* TOPO */}
        <div className="flex gap-4 items-center">

          <button className="px-5 py-2 rounded-md border-2 border-[#96DAE3] text-[#96DAE3] hover:bg-[#96DAE320] transition">
            Filtros
          </button>

          <input
            placeholder="Pesquisar..."
            className="
              flex-1 px-3 py-2
              text-[#96DAE3] placeholder-[#96DAE3]
              bg-transparent border-b-2 border-transparent
              outline-none
              focus:border-[#96DAE3]
              transition-all duration-300
            "
          />
        </div>

        {/* GRID */}
        <div className="flex-1 border-2 border-[#96DAE3] rounded-xl p-6 overflow-y-auto overflow-x-hidden">

          <div className="grid grid-cols-4 gap-6 max-w-[1300px] mx-auto">

            {/* CARD COMPLETO */}
            <div className="bg-[#B6B3D6] rounded-lg p-3 flex flex-col justify-between aspect-square shadow-md">

              {/* IMAGEM */}
              <div className="relative bg-white rounded-md h-[55%] flex items-center justify-center">

                <span className="text-gray-400 text-sm">
                  imagem produto
                </span>

                {/* FAVORITAR */}
                <IoSettingsOutline className="absolute top-2 right-2 text-gray-500 text-lg cursor-pointer" />
              </div>

              {/* INFO */}
              <div className="mt-2">

                {/* NOME + MENU */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-black text-sm">
                    Nome dado ao AD
                  </p>
                  <FiMoreHorizontal className="text-gray-600 text-lg cursor-pointer" />
                </div>

                {/* PREÇO */}
                <p className="text-green-700 font-semibold text-sm">
                  R$213,86 (+)
                </p>

                {/* ESTRELAS */}
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-gray-700 text-xs" />
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-2">

                <div className="flex gap-2">
                  <div className="bg-green-600 p-1.5 rounded">
                    <BiLike size={20} color="white" />
                  </div>

                  <div className="bg-red-600 p-1.5 rounded">
                    <BiDislike size={20} color="white" />
                  </div>
                </div>

                <span className="text-green-700 text-sm font-bold">
                  134k
                </span>

              </div>
            </div>

            {/* QUADRADOS RESTANTES */}
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg aspect-square"
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
