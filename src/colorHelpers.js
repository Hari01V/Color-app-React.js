import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {
      50: [],
      100: [],
      200: [],
      300: [],
      400: [],
      500: [],
      600: [],
      700: [],
      800: [],
      900: []
    }
  };

  for (let color of starterPalette.colors) {
    let shades = generateScale(color.color, 10);
    let count = 0;
    for (let level of levels) {
      newPalette.colors[level].push({
        id: color.name,
        name: `${color.name} ${level}`,
        hex: shades[count],
        hexNoHash: shades[count].slice(1),
        rgb: chroma(shades[count]).rgb(),
        rgba: chroma(shades[count]).rgba()
      });
      count++;
    }
  }

  return newPalette;
}

function getRange(hexColor) {
  const end = "#fff";
  return [
    chroma(hexColor).darken(1.4).hex(), hexColor, end
  ];
}

function generateScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };