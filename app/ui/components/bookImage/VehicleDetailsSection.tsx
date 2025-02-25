"use client";
import { Image as ImageType, OperationalVehicle } from "@/app/lib/definitions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VehicleDetailsSection({ dataPost }: { dataPost: ImageType | null }) {
  const [dataVehicle, setDataVehicle] = useState<OperationalVehicle | null>(null);

  useEffect(() => {
    if (dataPost && dataPost.vehicleIDs.length > 0) {
      console.log("🚀 ~ useEffect ~ dataPost:", dataPost);
      const fetchVehicleData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/operational-vehicle/${dataPost.vehicleIDs[0]}`);
          const data = await response.json();
          console.log("🚀 ~ fetchVehicleData ~ data:", data);
          setDataVehicle(data);
        } catch (error) {
          console.error("Erro ao buscar dados do veículo:", error);
        }
      };
      fetchVehicleData();
    }
  }, [dataPost]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-secondarybg-dark text-text-dark">
      <div className="col-span-2 bg-black h-auto flex items-center justify-center">
        {dataPost?.publicStorage ? (
          <Image
            src={`https://${dataPost.storagePathURL}image/upload/f_auto,q_auto,w_800/${dataPost.pathURL}`}
            alt={dataPost.title || "Veículo"}
            width={800} // Ajuste conforme necessário
            height={600}
            className="rounded-md object-cover"
            priority
          />
        ) : (
          <iframe
            src={`https://drive.google.com/file/d/${dataPost?.pathURL}/preview`}
            title={dataPost?.title || "Veículo"}
            className="rounded-md w-full object-cover"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        )}
      </div>

      <div className="col-span-1 justify-self-end p-4 mt-4 mr-4">
        <VehicleInfo dataVehicle={dataVehicle} />
      </div>
    </div>
  );
}

function VehicleInfo({ dataVehicle }: { dataVehicle: OperationalVehicle | null }) {
  return (
    <>
      <InfoCard title="Prefixo do Veículo" value={dataVehicle?.serialNumber || "Sem Prefixo"} />
      <InfoCard title="Registro do Veículo" value={dataVehicle?.registeredVehicle?.plate || "SEM PLACA"} />
      <InfoCard title="Fabricante da Carroceria" value={dataVehicle?.registeredVehicle?.bodywork?.manufacturer?.name || "Sem Info"} />
      <InfoCard title="Modelo de Carroceria" value={dataVehicle?.registeredVehicle?.bodywork?.nameModel || "Sem Info"} />
      <InfoCard title="Fabricante do Chassi" value={dataVehicle?.registeredVehicle?.powertrain?.manufacturer?.name || "Sem Info"} />
      <InfoCard title="Modelo do Chassi" value={dataVehicle?.registeredVehicle?.powertrain?.nameModel || "Sem Info"} />
      <InfoCard title="Operador do Veículo" value={dataVehicle?.operator?.name || "Sem Operador"} />
    </>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md shadow-md p-1">
      <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
        <h2 className="font-bold mt-2 mb-1">{title}</h2>
      </div>
      <p className="py-4 text-white text-sm">{value}</p>
    </div>
  );
}
