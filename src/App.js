import EventNameInput from "./components/EventNameInput";
import Calendar from "./components/Calendar"
import TimeSelector from "./components/TimeSelector";
import './App.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            whenimfree.io
        </header>
        <div>
            <EventNameInput />
            <Calendar />
            <TimeSelector />
        </div>
    </div>
  );
}

export default App;
