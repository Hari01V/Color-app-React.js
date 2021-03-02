import './App.css';
import Palette from './Components/Palette.js';
import seedPalettes from './seedPalettes.js';

function App() {
  return (
    <div className="App">
      <Palette starterPalette={seedPalettes[4]} />
    </div>
  );
}

export default App;
