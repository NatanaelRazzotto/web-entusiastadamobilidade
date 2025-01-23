"use client"
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';

const MapComponent = () => {
  const mapRef = useRef(null);

  // Dados para plotar no mapa
  const data = {
    "GI859": {
      "COD": "GI859",
      "REFRESH": "21:57",
      "LAT": "-25.491073",
      "LON": "-49.28203",
      "CODIGOLINHA": "666",
      "ADAPT": "1",
      "TIPO_VEIC": "7",
      "TABELA": "1",
      "SITUACAO": "ADIANTADO",
      "SITUACAO2": "FORA DA ROTA",
      "SENT": "VOLTA",
      "TCOUNT": 1,
      "SENTIDO": "198-BAIRRO NOVO MUNDO (22:02)"
    }
  };

  useEffect(() => {
    // Configuração básica do mapa
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-49.28203, -25.491073]), // Centralizar no ponto inicial
        zoom: 12,
      }),
    });

    // Extraindo latitude e longitude dos dados
    const { LAT, LON } = data["GI859"];
    const latitude = parseFloat(LAT);
    const longitude = parseFloat(LON);

    // Criar um ponto para o dado de localização
    const vehiclePoint = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
      name: data["GI859"].CODIGOLINHA,
    });

    // Estilo do ponto
    vehiclePoint.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png', // URL de um ícone para o ponto
        }),
      })
    );

    // Criar uma camada de vetor e adicionar o ponto
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [vehiclePoint],
      }),
    });

    // Adicionar a camada de vetor ao mapa
    map.addLayer(vectorLayer);

    return () => map.setTarget(null); // Limpeza na desmontagem do componente
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default MapComponent;
