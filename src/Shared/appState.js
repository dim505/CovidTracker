import { observable, action, computed } from "mobx";
import { ApiCall } from "./ApiCall";
import { createContext } from "react";
import Papa from "papaparse";

class AppState {
  @observable CovidData = [];
  @observable SummaryData = {};
  @observable HistoricalInfected = { data: [] };
  @observable HistoricalRecovered = [];
  @observable HistoricalDeaths = [];
  GetCovidData = () => {
    ApiCall("Get", "https://corona.lmao.ninja/v2/countries").then((results) => {
      this.CovidData = results;
    });

    ApiCall("Get", "https://corona.lmao.ninja/v2/all").then((results) => {
      this.SummaryData = results;
    });

    ApiCall(
      "Get",
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    ).then((results) => {
      this.HistoricalInfected = Papa.parse(results, { header: true });
      console.log(Papa.parse(results, { header: true }));
    });

    ApiCall(
      "Get",
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
    ).then((results) => {
      this.HistoricalRecovered = Papa.parse(results, { header: true });
    });

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
