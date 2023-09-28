import './index.css';
import DisplayMetricData from "./components/DisplayMetricData";
import SubmitForm from './components/SubmitForm';
import { AppContextProvider } from './components/AppContext';

function App() {
  return (
    <AppContextProvider>
      <div>
        <h1>Opendigger Info -- Cli Research Tool</h1>
        <SubmitForm />
        <DisplayMetricData />
      </div>
    </AppContextProvider>
  );
}

export default App;
