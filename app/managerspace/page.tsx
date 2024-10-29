import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div className="flex justify-end mt-8">
            <Link href={"/managerspace/drafts"}>
                <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">
                    Criar Postagem
                </button>
            </Link>
           
            </div>
            <div className="flex justify-end mt-8">
            <Link href={"/managerspace/books-posts"}>
                <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">
                    Associar Imagens a Postagem
                </button>
            </Link>
            </div>

            <div className="flex justify-end mt-8">
            <Link href={"/"}>
                <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">
                    Atualizar Info Transporte
                </button>
            </Link>
            </div>
        </div>
    )
}
