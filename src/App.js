import React, { useEffect, useState, useContext, useRef } from "react";
import Styles from "./SCSS/styles.module.scss";
import appStateContext from "./Shared/appState";
import { observer } from "mobx-react";
import "./SCSS/Global.scss";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import Fade from "react-reveal/Fade";
import SummaryOverview from "./map/BottomSlider/current/SummaryOverview"
import moment from "moment";
import HistoricalSummaryBoard from "./map/BottomSlider/Historical/HistoricalSummaryBoard"
import SwitchMode from "./map/TopSlider/SwitchMode"
import Map from "./map/Map"
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

//root container that hold everything 
const App = () => {

  const appState = useContext(appStateContext);
  //opens and closes bottom slider
  const [OpenSummary, SetOpenSummary] = useState(false);
  //switches between historical and current mode
  const [ChangeMode, SetChangeMode] = useState("Current");
  //opens top slider
  const [OpenChangeMode, SetOpenChangeMode] = useState(false);
  //keeps track of the slider date for historical mode
  const [SelectedDate, SetSelectedDate] = useState("1/22/20");
  //checks if the infected flag is set for historical mode
  const [InfectedOn, SetInfectedOn] = useState(true)
  //checks if the recovered flag is set for historical mode
  const [RecoveredOn, SetRecoveredOn] = useState(false)
  //checks if the dead flag is set for historical mode
  const [DeathOn, SetDeathOn] = useState(false)
  const [MapCenter, SetMapCenter] = useState([0, 0])
  const MapRef = useRef(null)
  //gets data
  useEffect(() => {
    appState.GetCovidData();
  }, []);

  //opens top slider and sets some animations
  const OpenSliders = () => {
   
   //animations for the arrow 
    if (OpenChangeMode) {
      document
        .getElementsByClassName(
          Styles.OpenCloseArrowTop
        )[0]
        .setAttribute("style", "top:" + "0px !important");
    } else {
      document
        .getElementsByClassName(
          Styles.OpenCloseArrowTop
        )[0]
        .setAttribute("style", "top:" + "100px !important");
    }

    SetOpenChangeMode(!OpenChangeMode);

  }


  //opens bottom slider and sets some animations
  const OpenBottomSlider = () => {
    
    //animations for the arrow 
    if (OpenSummary) {
      document
        .getElementsByClassName(
          Styles.OpenCloseArrowBottom
        )[0]
        .setAttribute("style", "bottom:" + "0px !important")
        SetOpenSummary(false)
    } else {
      document
        .getElementsByClassName(
          Styles.OpenCloseArrowBottom
        )[0]
        .setAttribute("style", "bottom:" + "185px !important")
        SetOpenSummary(true)
    }

    

  }

  
  //update dates at user sliders historical slider
  const HandleSliderUpdate = (value) => {
    SetSelectedDate(moment(value).format("M/D/YY"));
  };

  //switches on infected mode in historical mode
  const toggleInfectedData = () => SetInfectedOn(!InfectedOn)
  
 //switches on recovered mode in historical mode
  const toggleRecoveredData = () =>   SetRecoveredOn(!RecoveredOn)
 //switches on death mode in historical mode
  const toggleDeathData = () =>   SetDeathOn(!DeathOn)

  const SetMapRef = (mapInstance) => { MapRef.current = mapInstance}
  //resets the historical mode settings to default and changes the mode
  const ChangeModeFunc = (ModeToChange) => {

    if (ModeToChange === "Current") {
      SetSelectedDate("1/22/20")
      SetDeathOn(false)
      SetRecoveredOn(false)
      SetInfectedOn(true)

    }
    SetChangeMode(ModeToChange)
  }

  return (
    <>
      <div className={Styles.container}>
        
              <SwitchMode
              OpenBottomSlider={OpenBottomSlider}
              ChangeModeFunc={ChangeModeFunc}
                ChangeMode={ChangeMode}
                OpenSummary={OpenSummary}
                OpenChangeMode={OpenChangeMode}
              />
 

 <IconButton
 onClick={() => {


  MapRef.current.setView([0, 0],2)
 
  console.log(MapRef)
  /*MapRef.setZoom(3)SetMapCenter([0,0]) */
 }
}
 classes={{ root: Styles.CenterMapIcon }}
>

<CenterFocusStrongIcon />

</IconButton>

        <IconButton
          onClick={() => {
            OpenSliders()
          }}
          classes={{ root: Styles.OpenCloseArrowTop }}
        >
          {" "}
          {OpenChangeMode ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>




              <Map 
              SetMapRef={SetMapRef}
              MapCenter={MapCenter}
              RecoveredOn={RecoveredOn}
              ChangeMode={ChangeMode}
              InfectedOn={InfectedOn}
              SelectedDate={SelectedDate}
              DeathOn={DeathOn}
              />
    
    
    
    
    
    
        <div>
          <IconButton
            onClick={() => {
              OpenBottomSlider()
            }}
            classes={{ root: Styles.OpenCloseArrowBottom }}
          >
            {" "}
            {OpenSummary ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>

          <Fade bottom when={OpenSummary}>
            <div className={Styles.SummaryDashboard}>
              {ChangeMode === "Historical" ? (
                         
                         <HistoricalSummaryBoard  
                         SelectedDate={SelectedDate}
                         HandleSliderUpdate = {HandleSliderUpdate}
                         InfectedOn={InfectedOn}
                         toggleInfectedData={toggleInfectedData}
                         RecoveredOn={RecoveredOn}
                         toggleRecoveredData={toggleRecoveredData}
                         DeathOn={DeathOn}
                         toggleDeathData={toggleDeathData}

                         />    
                           
                         ) : (
          
                      <SummaryOverview
                      appState = {appState}
                      />
                
              )}
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default observer(App);
