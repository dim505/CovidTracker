import React, { useEffect, useState, useContext } from "react";
import Styles from "./styles.module.scss";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import leaflet from "leaflet";
import appStateContext from "./Shared/appState";
import "leaflet/dist/leaflet.css";
import { observer } from "mobx-react";
import "./Global.scss";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import Fade from "react-reveal/Fade";
import SummaryTotal from "./SummaryTotal";
import SummaryGeneral from "./SummaryGeneral";
import Button from "@material-ui/core/Button";
import DateSlider from "./DateSlider";
import Circles from "./Circles";

const App = () => {
  const appState = useContext(appStateContext);
  const [OpenSummary, SetOpenSummary] = useState(false);
  //historical
  const [ChangeMode, SetChangeMode] = useState("Current");
  const [OpenChangeMode, SetOpenChangeMode] = useState(false);
  const [SelectedDate, SetSelectedDate] = useState("01/22/2020");

  useEffect(() => {
    appState.GetCovidData();
  }, []);

  const HandleSliderUpdate = (value) => {
    console.log(value)
    SetSelectedDate(value);
  };

  return (
    <>
      <div className={Styles.container}>
        <Fade top when={OpenChangeMode}>
          <div className={Styles.SwitchMode}>
            {" "}
            <Typography variant="h5" gutterBottom>
              Switch Modes
            </Typography>
            <Button
              onClick={() => SetChangeMode("Current")}
              classes={{
                root:
                  ChangeMode === "Current"
                    ? Styles.ActiveButton
                    : Styles.InactiveButton
              }}
              variant="outlined"
            >
              Current Data
            </Button>
            <Button
              onClick={() => SetChangeMode("Historical")}
              classes={{
                root:
                  ChangeMode === "Historical"
                    ? Styles.ActiveButton
                    : Styles.InactiveButton
              }}
              variant="outlined"
            >
              Historical Data
            </Button>
          </div>
        </Fade>
        <IconButton
          onClick={() => {
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
          }}
          classes={{ root: Styles.OpenCloseArrowTop }}
        >
          {" "}
          {OpenChangeMode ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
        <MapContainer
          attributionControl={false}
          center={[0, 0]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />


{/**
 * 		  <Circles
            data={appState.HistoricalInfected.data}
            date={SelectedDate}
            color="red"
          />
 * 
 */}
{appState.CovidData.map((country) => {
         

         return (
           <Marker
             icon={leaflet.divIcon({
               className: "custom_iconTEST",
               html: `<div 
     
               class=${Styles.custom_icon}>
             
               ${parseInt(country.active / 1000)}K </div>`
             })}
             position={[country.countryInfo.lat, country.countryInfo.long]}
           >
             <Tooltip offset={[17, -2]} direction="top">
               <Typography variant="h6" gutterBottom>
                 <img
                   className={Styles.CountryFlag}
                   src={country.countryInfo.flag}
                 />
                 {country.country}
               </Typography>

               <div>
                 <Typography display="inline" variant="button" gutterBottom>
                   Active:{" "}
                 </Typography>

                 <Typography display="inline" variant="body2" gutterBottom>
                   {parseInt(country.active).toLocaleString()}
                 </Typography>
               </div>

               <div>
                 <Typography display="inline" variant="button" gutterBottom>
                   Recovered:{" "}
                 </Typography>
                 <Typography display="inline" variant="body2" gutterBottom>
                   {parseInt(country.recovered).toLocaleString()}
                 </Typography>
               </div>
               <div>
                 <Typography display="inline" variant="button" gutterBottom>
                   Deaths:{" "}
                 </Typography>
                 <Typography display="inline" variant="body2" gutterBottom>
                   {parseInt(country.deaths).toLocaleString()}
                 </Typography>
               </div>
             </Tooltip>
           </Marker>
         );
       })}

          
        </MapContainer>{" "}
        <div>
          <IconButton
            onClick={() => {
              if (OpenSummary) {
                document
                  .getElementsByClassName(
                    Styles.OpenCloseArrowBottom
                  )[0]
                  .setAttribute("style", "bottom:" + "0px !important");
              } else {
                document
                  .getElementsByClassName(
                    Styles.OpenCloseArrowBottom
                  )[0]
                  .setAttribute("style", "bottom:" + "185px !important");
              }

              SetOpenSummary(!OpenSummary);
            }}
            classes={{ root: Styles.OpenCloseArrowBottom }}
          >
            {" "}
            {OpenSummary ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>

          <Fade bottom when={OpenSummary}>
            <div className={Styles.SummaryDashboard}>
              {ChangeMode === "Historical" ? (
                <DateSlider HandleSliderUpdate={HandleSliderUpdate} />
              ) : (
                <>
                  <Grid container justify="center" alignItems="center">
                    <SummaryTotal
                      data={{
                        MainData: appState.SummaryData.cases,
                        DataType: "cases",
                        PerMillion: appState.SummaryData.casesPerOneMillion
                      }}
                    />

                    <SummaryTotal
                      data={{
                        MainData: appState.SummaryData.deaths,
                        DataType: "deaths",
                        PerMillion: appState.SummaryData.deathsPerOneMillion
                      }}
                    />

                    <SummaryTotal
                      data={{
                        MainData: appState.SummaryData.tests,
                        DataType: "Tests",
                        PerMillion: appState.SummaryData.testsPerOneMillion
                      }}
                    />
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <SummaryGeneral
                      data={{
                        MainData: appState.SummaryData.active,
                        DataType: "Active"
                      }}
                    />

                    <SummaryGeneral
                      data={{
                        MainData: appState.SummaryData.critical,
                        DataType: "Critical"
                      }}
                    />

                    <SummaryGeneral
                      data={{
                        MainData: appState.SummaryData.recovered,
                        DataType: "Recovered"
                      }}
                    />
                  </Grid>
                </>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default observer(App);
