import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";



interface RouteMapProps {
  points: { lat: number; lon: number; cluster: string }[];
}

const clusterColors: Record<string, string> = {
  "0": "blue",
  "1": "green",
  "2": "orange",
  "3": "purple",
  "4": "red",
};


function FitBounds({ points }: { points: { lat: number; lon: number }[] }) {
  const map = useMap();

useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
}

export default function RouteMap({ points }: RouteMapProps) {
  // Compute map center
  const center = points.length
    ? [points[0].lat, points[0].lon]
    : [26.91, 75.78];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={5}
      scrollWheelZoom
      className="h-96 w-full rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {points.map((point, idx) => {
        const color = clusterColors[point.cluster] || "gray";
        const icon = new L.DivIcon({
        className: "custom-marker",
        html: `<div style="
    background-color:${color};
    color:white;
    font-size:10px;
    font-weight:bold;
    width:20px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    border:1px solid #333;
    ">
      ${idx + 1}
    </div>`,
});

        return (
          <Marker
            key={idx}
            position={[point.lat, point.lon]}
            icon={icon}
          >
            <Popup>
              Lat: {point.lat}, Lon: {point.lon}<br />
              Cluster: {point.cluster}
            </Popup>
          </Marker>
        );
      })}

      
        {points.length > 1 && (
  <Polyline
    positions={points.map((p) => [p.lat, p.lon])}
    color="blue"
    weight={3}
  />
   )}

      <FitBounds points={points} />

    </MapContainer>
    
  );
}
