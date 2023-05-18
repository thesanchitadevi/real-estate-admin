import React from "react";

const MarkerDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  data: any;
}> = ({ open, onClose, data }) => {
  console.log(data);
  return <div>MarkerDrawer</div>;
};

export default MarkerDrawer;
