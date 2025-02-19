import React from "react";
import { FaWifi, FaParking, FaDog, FaUtensils } from "react-icons/fa";

const featuresInfo = {
  wifi: { label: "Wifi", Icon: FaWifi },
  breakfast: { label: "Breakfast", Icon: FaUtensils },
  parking: { label: "Parking", Icon: FaParking },
  pets: { label: "Pets", Icon: FaDog },
};
/**
 * Renders a list of feature elements for a given venue.
 *
 * This function iterates over a predefined set of features and checks if the venue's meta data
 * indicates that the feature is available. For each available feature, it creates a React `<p>` element
 * that includes the corresponding icon and label.
 *
 * @param {Object} venue - The venue object containing feature metadata.
 * @param {Object} venue.meta - An object where each key corresponds to a feature (e.g., "wifi", "breakfast", "parking", "pets")
 *                              and the value indicates whether the feature is available.
 * @returns {(React.ReactElement|null)[]} An array of React elements for each available feature.
 *                                           If a feature is not available, `null` is returned for that key.
 */
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
