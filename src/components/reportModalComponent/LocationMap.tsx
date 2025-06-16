import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";

type MapProps = {
    latitude: number;
    longitude: number;
};

export const LocationMap = ({ latitude, longitude }: MapProps) => {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    Estás aquí: <br /> Lat: {latitude.toFixed(5)} Lon: {longitude.toFixed(5)}
                </Popup>
            </Marker>
        </MapContainer>
    );
};
