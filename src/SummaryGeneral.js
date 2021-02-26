import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";
const SummaryGeneral = (props) => {
  return (
    <Grid item xs={4}>
      <p>
        {" "}
        <NumberFormat
          value={props.data.MainData}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
        />
      </p>
      <strong>{props.data.DataType} Cases </strong>
    </Grid>
  );
};

export default SummaryGeneral;
