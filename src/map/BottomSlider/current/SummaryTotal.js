import React, { useEffect, useState, useContext } from "react";
import NumberFormat from "react-number-format";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


//component serves as the top row square in the buttom slider
const SummaryTotal = (props) => {
  return (
    <Grid item xs={4}>
      {" "}
      <Typography variant="h5" gutterBottom>
        <NumberFormat
          value={props.data.MainData}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
        />
      </Typography>
      <strong> Total {props.data.DataType} </strong>
      <p>
        {" "}
        <NumberFormat
          value={props.data.PerMillion}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
        />
        <strong> per 1 million </strong>
      </p>
    </Grid>
  );
};

export default SummaryTotal;
