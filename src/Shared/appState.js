import { observable, action, computed } from "mobx";
import { ApiCall } from "./ApiCall";
import { createContext } from "react";
import Papa from "papaparse";


//contains the state for the application
class AppState {
  //stores current country covid stats
  @observable CovidData = [];
  //stores overall global summary stats
  @observable SummaryData = {};
  //stores historical infected stats
  @observable HistoricalInfected = { data: [] };
  //stores historical recovered stats
  @observable HistoricalRecovered = [];
  //stores historical deaths stats
  @observable HistoricalDeaths = [];
  GetCovidData = () => {
    
      //gets current covid data 
    ApiCall("Get", "https://disease.sh/v2/countries").then((results) => {
      this.CovidData = results;
    });

    //gets overall global statistics for bottom slidersmmary

    ApiCall("Get", "https://disease.sh/v2/all").then((results) => {
      this.SummaryData = results;
    });

    //get historical circle data for infected
    ApiCall(
      "Get",
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    ).then((results) => {
      this.HistoricalInfected = Papa.parse(results, { header: true });
      console.log(Papa.parse(results, { header: true }));
    });
     //get historical circle data for recovered
    ApiCall(
      "Get",
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
    ).then((results) => {
      console.log(Papa.parse(results, { header: true }))
      this.HistoricalRecovered = Papa.parse(results, { header: true });
    });

    //get historical circle data for deaths
    ApiCall(
      "Get",
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
    ).then((results) => {
      this.HistoricalDeaths = Papa.parse(results, { header: true });
    });
  };
}

const appStateContext = createContext(new AppState());
export default appStateContext;
