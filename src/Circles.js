import React, { useEffect, useState, useContext } from "react";
import { Circle, Tooltip } from "react-leaflet";
import Typography from '@material-ui/core/Typography';
import NumberFormat from "react-number-format";


const Circles = (props) => {

  const RenderLabel = () => {
        if (props.Type === "infected") {
          return "Infected:"

        } else if (props.Type === "recovered") {
          return "Recovered:"

        } else {
            return "Deaths:"

        }


  }
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
          radius={650 * Math.sqrt(row[props.date])}
          fillOpacity={0.5}
          fillColor={props.color}
          stroke={false}
        >
        
        <Tooltip direction="right">
        <Typography variant="h5" gutterBottom>
        {row["Country/Region"]}
      </Typography>


      <Typography variant="subtitle2" gutterBottom>
        <strong>{RenderLabel()} </strong> 
        <NumberFormat
                        value={row[props.date]}
                        displayType={"text"}
                        thousandSeparator={true}
                       
                        suffix=" "
                      />
   
      </Typography>

                
              
            
               
        </Tooltip>

        </Circle>
      );
    }
  });
};

export default Circles;
