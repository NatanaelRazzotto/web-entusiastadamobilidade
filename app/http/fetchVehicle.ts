import { Vehicle } from "../lib/definitions";

export default function fetchVehicleData(vehicleIDs: string): Promise<Vehicle | null> {
    return fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/vehicles/${vehicleIDs[0]}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Erro ao buscar veículos:", error);
        return null;
      });
  }