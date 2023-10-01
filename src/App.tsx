import { Row, Col } from 'antd';

import './index.css';
import DisplayMetricData from "./components/DisplayMetricData";
import SubmitForm from './components/SubmitForm';
import LineChart from './components/LineChart';
import TabBar from './components/TabBar';
import { AppContextProvider } from './components/AppContext';

function App() {
  return (
    <AppContextProvider>
      <TabBar>
        <Row gutter={16}>
          <Col span={12}>
            <SubmitForm />
            <LineChart />
          </Col>
          <Col span={12}>
            <DisplayMetricData />
          </Col>
        </Row>
      </TabBar>
    </AppContextProvider>
  );
}

export default App;
