import React, { useEffect, useState, useContext } from "react";
import Styles from "./styles.module.scss";
import appStateContext from "./Shared/appState";
import { observer } from "mobx-react";
import "./Global.scss";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import Fade from "react-reveal/Fade";
import SummaryOverview from "./SummaryOverview"
import moment from "moment";
import HistoricalSummaryBoard from "./HistoricalSummaryBoard"
import SwitchMode from "./SwitchMode"
import Map from "./Map"


const App = () => {
  const appState = useContext(appStateContext);
  const [OpenSummary, SetOpenSummary] = useState(false);
  //historical
  const [ChangeMode, SetChangeMode] = useState("Current");
  const [OpenChangeMode, SetOpenChangeMode] = useState(false);
  const [SelectedDate, SetSelectedDate] = useState("1/22/20");
  const [InfectedOn, SetInfectedOn] = useState(false)
  const [RecoveredOn, SetRecoveredOn] = useState(false)
  const [DeathOn, SetDeathOn] = useState(false)

  useEffect(() => {
    appState.GetCovidData();
  }, []);


  const OpenSliders = () => {
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

  const OpenBottomSlider = () => {
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

  

  const HandleSliderUpdate = (value) => {
    SetSelectedDate(moment(value).format("M/D/YY"));
  };


  const toggleInfectedData = () =>  {
    
    console.log(InfectedOn)
    SetInfectedOn(!InfectedOn)
    

  }
  
  
 
  const toggleRecoveredData = () =>   SetRecoveredOn(!RecoveredOn)
 
  const toggleDeathData = () =>   SetDeathOn(!DeathOn)

  const ChangeModeFunc = (ModeToChange) => {

    if (ModeToChange === "Current") {
      SetSelectedDate("1/22/20")

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
            OpenSliders()
          }}
          classes={{ root: Styles.OpenCloseArrowTop }}
        >
          {" "}
          {OpenChangeMode ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>




              <Map 
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
