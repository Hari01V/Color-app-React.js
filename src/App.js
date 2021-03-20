import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers.js';
import Palette from './Components/Palette.js';
import PaletteList from './Components/PaletteList.js';
import seedPalettes from './seedPalettes.js';
import SingleColorPalette from './Components/SingleColorPalette.js';
import NewPaletteForm from './Components/NewPaletteForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedPalettes
    }
    this.findPalette = this.findPalette.bind(this);
    this.findSingleColorPalette = this.findSingleColorPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id);
  }

  findSingleColorPalette(paletteId, colorId) {
    let palette = generatePalette(this.findPalette(paletteId));
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

  savePalette(newPalette) {
    this.setState(st => ({
      palettes: [...st.palettes, newPalette]
    }));
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact
            path="/" render={(routeProps) => <PaletteList {...routeProps} palettes={this.state.palettes} />} />
          <Route exact
            path="/palette/new"
            render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} />
          <Route exact
            path="/palette/:id"
            render={(routeProps) => <Palette starterPalette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
          <Route exact
            path="/palette/:paletteId/:colorId"
            render={(routeProps) => <SingleColorPalette {...this.findSingleColorPalette(routeProps.match.params.paletteId, routeProps.match.params.colorId)} {...routeProps} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
