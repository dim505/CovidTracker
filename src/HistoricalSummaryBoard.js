import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateSlider from "./DateSlider";
import Typography from "@material-ui/core/Typography";
import Styles from "./styles.module.scss";


const HistoricalSummaryBoard = (props) => {
        return (

            <> 
            <Typography variant="h5" gutterBottom> {props.SelectedDate} </Typography>
            <Typography variant="h6" gutterBottom> Days Since Covid Started </Typography>
          <DateSlider HandleSliderUpdate={props.HandleSliderUpdate} />
          
           
          <FormGroup classes={{root: Styles.CheckBoxCenter}} row>
    <FormControlLabel
      control={<Checkbox checked={props.InfectedOn} onChange={props.toggleInfectedData}  style={{color: "red" }}/>}
    label="Infected"
    />
    <FormControlLabel
      control={<Checkbox checked={props.RecoveredOn} onChange={props.toggleRecoveredData}  style={{color: "green" }}/>}
      label="Recovered"
    />
    <FormControlLabel
      control={<Checkbox checked={props.DeathOn} onChange={props.toggleDeathData}  style={{color: "white"}} />}
    label="Dead"

    />
  </FormGroup>

  
          </>

        )


}

export default HistoricalSummaryBoard