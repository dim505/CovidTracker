import { observable, action, computed } from "mobx";
import { ApiCall } from "./ApiCall";
import { createContext } from "react";

class AppState {
  @observable CovidData = [];
  @observable SummaryData = {};
  GetCovidData = () => {
    ApiCall("Get", "https://corona.lmao.ninja/v2/countries").then((results) => {
      this.CovidData = results;
    });

    ApiCall("Get", "https://corona.lmao.ninja/v2/all").then((results) => {
      this.SummaryData = results;
    });
  };
}

const appStateContext = createContext(new AppState());
export default appStateContext;
