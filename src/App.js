import './App.css';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers.js';
import Palette from './Components/Palette.js';
import PaletteList from './Components/PaletteList.js';
import seedPalettes from './seedPalettes.js';
import SingleColorPalette from './Components/SingleColorPalette.js';
import NewPaletteForm from './Components/NewPaletteForm.js';

function findPalette(id) {
  return seedPalettes.find(palette => palette.id === id);
}

function findSingleColorPalette(paletteId, colorId) {
  let palette = generatePalette(findPalette(paletteId));
  let index = palette.colors[50].indexOf(palette.colors[50].find(color => color.id === colorId));
  let colors = [];
  for (const level in palette.colors) {

    colors.push(palette.colors[level][index]);
  }
  let obj = {
    colors: colors.slice(1),
    paletteName: palette.paletteName,
    emoji: palette.emoji
  }
  return obj;
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} />} />
        <Route exact path="/palette/new" render={() => <NewPaletteForm />} />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette starterPalette={generatePalette(findPalette(routeProps.match.params.id))} />} />
        <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette {...findSingleColorPalette(routeProps.match.params.paletteId, routeProps.match.params.colorId)} {...routeProps} />} />
      </Switch>
    </div>
  );
}

export default App;
