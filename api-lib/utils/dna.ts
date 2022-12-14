import { getRandomRarity } from './rarity';

// check the configured layer to find information required for rendering the layer
// this maps the layer information to the generated dna and prepares it for
// drawing on a canvas
const constructLayerToDna = (_dna: any[], _layers: any[], _rarity: any) => {
  const mappedDnaToLayers = _layers.map((layer: any, index: any) => {
    const selectedElement = layer.elements.find((element: any) => element.id === _dna[index]);
    return {
      location: '',
      position: layer.position,
      size: layer.size,
      selectedElement: { ...selectedElement, rarity: _rarity },
    };
  });
  return mappedDnaToLayers;
};

// check if the given dna is contained within the given dnaList
// return true if it is, indicating that this dna is already in use and should be recalculated
const isDnaUnique = (dnaList: any = [], dna: any = []) => {
  const foundDna = dnaList.find((i: any) => i.join('') === dna.join(''));
  return foundDna === undefined ? true : false;
};

// create a dna based on the available layers for the given rarity
// use a random part for each layer
const createDna = (layers: any, rarityWeights: any, rarity = 'original') => {
  const randNum: any[] = [];
  const rarityWeight = rarityWeights.find((rw: any) => rw.value === rarity);
  layers.forEach((layer: any) => {
    let num = Math.floor(Math.random() * layer.elementIdsForRarity[rarity].length);
    if (rarityWeight && rarityWeight.layerPercent[layer.id]) {
      // if there is a layerPercent defined, we want to identify which dna to actually use here (instead of only picking from the same rarity)
      const rarityForLayer = getRandomRarity(rarityWeight.layerPercent[layer.id]);
      num = Math.floor(Math.random() * layer.elementIdsForRarity[rarityForLayer].length);
      randNum.push(layer.elementIdsForRarity[rarityForLayer][num]);
    } else {
      randNum.push(layer.elementIdsForRarity[rarity][num]);
    }
  });
  return randNum;
};

const createUniqueDna = (
  layers: any,
  rarityWeights: any,
  dnaListByRarity: any,
  rarity = 'original'
) => {
  // calculate the NFT dna by getting a random part for each layer/feature
  // based on the ones available for the given rarity to use during generation
  let newDna = createDna(layers, rarity, rarityWeights);
  while (!isDnaUnique(dnaListByRarity[rarity], newDna)) {
    // recalculate dna as this has been used before.
    newDna = createDna(layers, rarity, rarityWeights);
  }

  return newDna;
};

export { constructLayerToDna, isDnaUnique, createDna, createUniqueDna };
