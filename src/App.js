import './App.css';
import { Route, Switch } from 'react-router-dom';
import Palette from './Components/Palette.js';
import PaletteList from './Components/PaletteList.js';
import seedPalettes from './seedPalettes.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} />} />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette starterPalette={seedPalettes.find(ele => ele.id == routeProps.match.params.id)} />} />
      </Switch>
    </div>
  );
}

export default App;
