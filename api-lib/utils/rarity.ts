import { rarityWeights } from "../config";

// creates dnaList object by rarity
const createDnaListByRarity = (rarityWeights:any) => {
  const dnaListByRarity: any = [];

  rarityWeights.forEach((rarityWeight:any) => {
    dnaListByRarity[rarityWeight.value] = [];
  });

  return dnaListByRarity;
};

// gets random rarity
const getRandomRarity = (_rarityOptions:any) => {
  const randomPercent = Math.random() * 100;
  let percentCount = 0;

  for (let i = 0; i <= _rarityOptions.length; i++) {
    percentCount += _rarityOptions[i].percent;
    if (percentCount >= randomPercent) {
      console.log(`use random rarity ${_rarityOptions[i].id}`);
      return _rarityOptions[i].id;
    }
  }
  return _rarityOptions[0].id;
};

// get the rarity for the image by edition number that should be generated
const getRarity = (_editionCount:any, editionSize:any) => {
  let rarityForEdition:any;

  if (!rarityForEdition) {
    // prepare array to iterate over
    rarityForEdition = [];
    rarityWeights.forEach((rarityWeight) => {
      for (let i = rarityWeight.from; i <= rarityWeight.to; i++) {
        rarityForEdition.push(rarityWeight.value);
      }
    });
  }
  return rarityForEdition[editionSize - _editionCount];
};

export{
  createDnaListByRarity,
  getRandomRarity,
  getRarity,
};
