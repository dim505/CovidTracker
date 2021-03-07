import Styles from "../../SCSS/styles.module.scss";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";

//component that allows you to switch between historical and current modes. Sits in the top slider
const SwitchMode = (props) => {
        return (
            <Fade top when={props.OpenChangeMode}>
<div className={Styles.SwitchMode}>
            {" "}
            <Typography variant="h5" gutterBottom>
              Switch Modes
            </Typography>
            <Button
              onClick={() => props.ChangeModeFunc("Current")}
              classes={{
                root:
                  props.ChangeMode === "Current"
                    ? Styles.ActiveButton
                    : Styles.InactiveButton
              }}
              variant="outlined"
            >
              Current Data
            </Button>
            <Button
              onClick={() => {
                

               
                props.ChangeModeFunc("Historical")
                
                if (!props.OpenSummary) {

                  props.OpenBottomSlider()
                }
                
            
            }
                      
                      
                }
              classes={{
                root:
                  props.ChangeMode === "Historical"
                    ? Styles.ActiveButton
                    : Styles.InactiveButton
              }}
              variant="outlined"
            >
              Historical Data
            </Button>
          </div>
          </Fade>

        )


}


export default SwitchMode