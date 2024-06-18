
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { useRouter } from 'next/router';
import CardPost from '../ui/portal/card';
import { PrismaClient } from '@prisma/client';
import { Post } from '../lib/definitions';
import Link from 'next/link';
 
export default async function Page() { 

  const prisma = new PrismaClient();

  const posts : Post[] = await prisma.post.findMany();
  console.log("🚀 ~ Page ~ post:", posts[0])

  

  // // Exemplo de uso:
  // const handleClick = () => {
  //   console.log("clicor")
  // };
  
  return (
    <main>
       <div className="container mx-auto px-4"> 

        <div className="relative bottom-0 left-0 p-4 text-white bg-black bg-opacity-75">
          <h2 className="text-xl font-bold">
            Assistente Entusiasta (CURITIBA - PR)
          </h2>
          <p className="text-sm">
            Confira em tempo real onde está o carro de testes XY049
          </p>
        </div>    
        <h2 className="text-2xl font-bold mt-8 mb-4">Destaques</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
        <div className="col-span-2">
        {/* News card 1 */}

        {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <CardPost postCard={posts[0]} />
      )}
        
    
       
        </div>
        <div className="col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* News card 2 */}
            {
              posts.length === 0 ? (
                <p>No posts found</p>
              ) : (
              <div>
                {posts.slice(0, 2).map((post) => (
                  <CardPost postCard={post} />
                ))}
              </div>
            )}
            {/* News card 3 */}
           
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Páginas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blog 1 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <Link href={"https://www.facebook.com/webtvbusologa"}>
          <div className="flex items-center">
            <img
              src="https://picsum.photos/50/50"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">Jornal Busólogo - FACEBOOK</h3>
              <p className="text-gray-600 text-sm">
                Nóticias e Fotografia, de forma rápida e objetiva você encontra
                tudo sobre o mundo do Transporte Urbano e Rodoviário
              </p>
            </div>
          </div>
          </Link>
        </div>
        {/* Blog 2 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center">
            <img
              src="https://picsum.photos/50/50"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">NRFv - INSTAGRAM</h3>
              <p className="text-gray-600 text-sm">
                Juscelino Filho: Aliados acham que Lula ganhará tempo e
                evitará antecipar reforma
              </p>
            </div>
          </div>
        </div>
        {/* Blog 3 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center">
            <img
              src="https://picsum.photos/50/50"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">NRFv - YOUTUBE</h3>
              <p className="text-gray-600 text-sm">
                Ala do PP se rebela contra vice de Nunes escolhido por
                Bolsonaro
              </p>
            </div>
          </div>
        </div>
        {/* Blog 4 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center">
            <img
              src="https://picsum.photos/50/50"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">WTBUS - YOUTUBE</h3>
              <p className="text-gray-600 text-sm">
                STF visa subir rendimento do FGTS e governo age para
                reduzir danos a habitação
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Máterias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* News card 1 */}
        <div className="bg-white rounded-md shadow-md">
          <img
            src="https://picsum.photos/600/300"
            alt="News Image"
            className="rounded-t-md"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">
              Mercado vê devolução de MP como sinal de que plano da
              Fazenda de ajuste fiscal alcançou limite
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              <li>TCU faz alerta sobre "legitimidade" de renúncias fiscais</li>
              <li>TCU critica "privilégios" de aposentadoria militar</li>
            </ul>
          </div>
        </div>
        {/* News card 2 */}
        <div className="bg-white rounded-md shadow-md">
          <img
            src="https://picsum.photos/600/300"
            alt="News Image"
            className="rounded-t-md"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">
              Mercado vê devolução de MP como sinal de que plano da
              Fazenda de ajuste fiscal alcançou limite
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              <li>TCU faz alerta sobre "legitimidade" de renúncias fiscais</li>
              <li>TCU critica "privilégios" de aposentadoria militar</li>
            </ul>
          </div>
        </div>
        {/* News card 3 */}
        <div className="bg-white rounded-md shadow-md">
          <img
            src="https://picsum.photos/600/300"
            alt="News Image"
            className="rounded-t-md"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">
              Indiciado pela PF, Juscelino Filho se diz inocente e afirma
              que ação foi "política e previsível"
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              <li>Dino não se declara suspeito e fica com inquérito</li>
              <li>Ministro do Turismo sai em defesa de Juscelino Filho</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver mais
        </button>
      </div>
    </div>
    </main>
  );
}