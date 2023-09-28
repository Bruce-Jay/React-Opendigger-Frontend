import './index.css';
import DisplayMetricData from "./components/DisplayMetricData";
import SubmitForm from './components/SubmitForm';
import { AppContextProvider } from './components/AppContext';
import LineChart from './components/LineChart';

function App() {
  return (
    <AppContextProvider>
      <div>
        <h1>Opendigger Info -- Cli Research Tool</h1>
        <SubmitForm />
        <DisplayMetricData />
        <LineChart />
      </div>
    </AppContextProvider>
  );
}

export default App;
