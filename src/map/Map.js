import {useContext} from "react"
import Typography from "@material-ui/core/Typography";
import Circles from "./Circles";
import Styles from "../SCSS/styles.module.scss"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import appStateContext from "../Shared/appState"
import { observer } from "mobx-react";


//container that holds the map and all the sliders.
const Map = (props) => {
        const appState = useContext(appStateContext)
return (
    <MapContainer
    maxBoundsViscosity={0.95}
    attributionControl={false}
    center={[0, 0]}
    zoom={2}
    scrollWheelZoom={false}
    maxBounds={[
      [-180, -90],
      [180, 90]
    ]}
    

  >
    <TileLayer
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    />

{props.ChangeMode === "Historical" ? 


<>

  <Circles
      data={props.InfectedOn  ?  appState.HistoricalInfected.data : []}
      date={props.SelectedDate}
      color="red"
      Type="infected"

    />  


<Circles
      data={props.RecoveredOn ? appState.HistoricalRecovered.data : []}
      date={props.SelectedDate}
      color="green"
      Type="recovered"
    />



<Circles
    data={props.DeathOn ? appState.HistoricalDeaths.data : []}
    date={props.SelectedDate}
    color="white"
    Type="deaths"
  /> 
</>
     :  appState.CovidData.map((country) => {
   

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
    })
     
     
     
     }

  </MapContainer>
)


}


export default observer(Map)