import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const customisedPicker = (size: any) =>
  new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: size,
    // shadowSize: 400,
  });

const Dashboard: React.FC = () => {

  return (
    <div className="h-[80vh]">
      DashBoard
    </div>
  );
};



export default Dashboard;
