import SummaryTotal from "./SummaryTotal";
import SummaryGeneral from "./SummaryGeneral";
import Grid from "@material-ui/core/Grid";

const SummaryOverview = (props) => {
            return (

                <>
                <Grid container justify="center" alignItems="center">
                <SummaryTotal
                  data={{
                    MainData: props.appState.SummaryData.cases,
                    DataType: "cases",
                    PerMillion: props.appState.SummaryData.casesPerOneMillion
                  }}
                />

                <SummaryTotal
                  data={{
                    MainData: props.appState.SummaryData.deaths,
                    DataType: "deaths",
                    PerMillion: props.appState.SummaryData.deathsPerOneMillion
                  }}
                />

                <SummaryTotal
                  data={{
                    MainData: props.appState.SummaryData.tests,
                    DataType: "Tests",
                    PerMillion: props.appState.SummaryData.testsPerOneMillion
                  }}
                />
              </Grid>
              <Grid container justify="center" alignItems="center">
                <SummaryGeneral
                  data={{
                    MainData: props.appState.SummaryData.active,
                    DataType: "Active"
                  }}
                />

                <SummaryGeneral
                  data={{
                    MainData: props.appState.SummaryData.critical,
                    DataType: "Critical"
                  }}
                />

                <SummaryGeneral
                  data={{
                    MainData: props.appState.SummaryData.recovered,
                    DataType: "Recovered"
                  }}
                />
              </Grid>
            
                  </>
            


            )



}

export default SummaryOverview