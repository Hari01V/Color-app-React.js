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
      let rgb = chroma(shades[count]).rgb();
      let rgba = chroma(shades[count]).rgba();
      newPalette.colors[level].push({
        id: color.name.toLowerCase().replace(/ /g, "-"),
        name: `${color.name} ${level}`,
        hex: shades[count],
        hexNoHash: shades[count].slice(1),
        rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
        rgba: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
      });
      count++;
    }
  }

  return newPalette;
}

function getRange(hexColor) {
  // const end = "#fff";
  const end = chroma(hexColor).brighten(2.5).hex();
  return [
    end, hexColor, chroma(hexColor).darken(1.4).hex()
  ];
}

function generateScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };