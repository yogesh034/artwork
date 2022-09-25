// import canvas
import { loadLayerImg } from './canvas';

// import dna
import { constructLayerToDna, createUniqueDna } from './dna';

// import rarity
import { createDnaListByRarity, getRarity } from './rarity';

const constructLoadedElements = (
  layers: any,
  editionCount: any,
  editionSize: any,
  rarityWeights: any
) => {
  const dna: any = {
    loadedElements: [],
    newDna: null,
  };
  // holds which dna has already been used during generation and prepares dnaList object
  const dnaListByRarity = createDnaListByRarity(rarityWeights);

  // get rarity from to config to create NFT as
  const rarity = getRarity(editionCount, editionSize);

  // create unique Dna
  dna.newDna = createUniqueDna(layers, rarity, rarityWeights, dnaListByRarity);
  dnaListByRarity[rarity].push(dna.newDna);

  // propagate information about required layer contained within config into a mapping object
  // = prepare for drawing
  const results = constructLayerToDna(dna.newDna, layers, rarity);

  console.log('results',results)
  // load all images to be used by canvas
  results.forEach((layer: any) => {
    //Object.keys(layer.selectedElement).map((value, index) => {
    //  console.log('layer.selectedElement value :>> ', value);
    const generatedPath = layer?.selectedElement?.path;
    //if (!dna.loadedElements.includes(str)) {
    if (generatedPath !== undefined) {
      dna.loadedElements.push(loadLayerImg(layer, generatedPath));
    }
    //}
    //});
  });
  return dna;
};
export { constructLoadedElements };
