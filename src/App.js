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

const App = () => {
  const appState = useContext(appStateContext);

  useEffect(() => {
    appState.GetCovidData();
  }, []);

  return (
    <>
      <div>
        <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          {appState.CovidData.map((country) => {
            return (
              <Marker
                icon={leaflet.divIcon({
                  className: "custom_icon",
                  html: `<div 
        
                  class="_src_styles_module__custom_icon">
                
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
        </MapContainer>

        <div className={Styles.SummaryDashboard}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={4}>
              {" "}
              <Typography variant="h5" gutterBottom>
                {" "}
                {appState.SummaryData.cases}{" "}
              </Typography>
              <strong> Total cases </strong>
              <p>
                {" "}
                {appState.SummaryData.casesPerOneMillion}
                <strong> per 1 million </strong>
              </p>
            </Grid>

            <Grid item xs={4}>
              {" "}
              <Typography variant="h5" gutterBottom>
                {" "}
                {appState.SummaryData.deaths}{" "}
              </Typography>
              <strong> Total deaths </strong>
              <p>
                {appState.SummaryData.deathsPerOneMillion}{" "}
                <strong> per 1 million </strong>
              </p>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                {" "}
                {appState.SummaryData.tests}{" "}
              </Typography>
              <strong> Total Tests </strong>
              <p>
                {" "}
                {appState.SummaryData.testsPerOneMillion}{" "}
                <strong> per 1 million </strong>
              </p>
            </Grid>
          </Grid>

          <Grid container justify="center" alignItems="center">
            <Grid item xs={4}>
              <p> {appState.SummaryData.active}</p>
              <strong> Active Cases </strong>
            </Grid>

            <Grid item xs={4}>
              <p> {appState.SummaryData.critical}</p>
              <strong> Critical Cases </strong>
            </Grid>

            <Grid item xs={4}>
              <p>{appState.SummaryData.recovered}</p>
              <strong> Recovered Cases </strong>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default observer(App);
