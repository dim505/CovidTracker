import React, { useEffect, useState, useContext } from "react";
import {  Circle } from "react-leaflet";

const Circles = (props) => {
  return props.data.map((row, i) => {
    if (row[props.date] <= 0) {
      // No cases on this date
      return;
    }
    if (row["Lat"] != null && row["Long"] != null) {
      return (
        <Circle
          key={i}
          center={[row["Lat"], row["Long"]]}
          radius={1000 * Math.sqrt(row[props.date])}
          fillOpacity={0.5}
          fillColor={props.color}
          stroke={false}
        />
      );
    }
  });
};

export default Circles;
