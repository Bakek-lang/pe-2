import React from "react";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";

const featuresInfo = {
  wifi: { label: "Wifi", Icon: FaWifi },
  breakfast: { label: "Breakfast", Icon: FaUtensils },
  parking: { label: "Parking", Icon: FaParking },
  pets: { label: "Pets", Icon: FaDog },
};

export function renderFeatures(venue) {
  return Object.keys(featuresInfo).map((key) => {
    if (venue.meta[key]) {
      const { Icon, label } = featuresInfo[key];
      return React.createElement(
        "p",
        { key: key },
        React.createElement(Icon, null),
        ` ${label}`
      );
    }
    return null;
  });
}
