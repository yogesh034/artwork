import { cleanName, width, height, rarityWeights } from '../config';

//Adding the layer of image

const editionDnaPrefix = 0;
const addLayers = (_id: any, _position: any, _size: any, _dir: any, files: any, i: number) => {
  console.log('i number',i);
  if (!_id) {
    console.log('error adding layer, parameters id required');
    return null;
  }
  if (!_position) {
    _position = { x: 0, y: 0 };
  }
  if (!_size) {
    _size = { width: width, height: height };
  }

  // add two different dimension for elements:
  // - all elements with their path information
  // - only the ids mapped to their rarity

  // checking the rarity images and weight of that images
  const elements: any = [];
  let elementCount: any = 0;
  const indexId: any = 0;
  const elementIdsForRarity: any = {};
  let getDynamicData: any = [];
  rarityWeights.forEach((rarityWeight) => {
    const elementsForRarity: any = Object.keys(files).map((dirValue: any, index) => {
      console.log('dirValue', dirValue);
      console.log('files', files);
      return Object.keys(files[dirValue]).map((fileValue: any, index) => {
        console.log('fileValue', fileValue);
        console.log('_id', _id);
        if (_id === dirValue) {

          const fileObj: any = files[dirValue][fileValue];
          console.log('fileObj', fileObj);
          console.log('`${indexId}${index}`', `${indexId}${index}`);
          
          const mediaSourceURL = URL.createObjectURL(fileObj);
          console.log('mediaSourceURL', mediaSourceURL);
          return {
            id: `${indexId}${index}`,
            name: cleanName(fileObj?.name),
            path: mediaSourceURL,
          };
        }
      });
    });
console.log('elementsForRarity',elementsForRarity);
Object.keys(files).map((dirValue: any, index) => {
  if (_id === dirValue) {
    getDynamicData = elementsForRarity[index];
  }
})
//console.log('filenum',filenum);

    
console.log('getDynamicData',getDynamicData)
    i++;

    //display the rarity images
console.log('`${editionDnaPrefix}${elementCount}`',`${editionDnaPrefix}${elementCount}`);
    elementIdsForRarity[rarityWeight.value] = [];
    getDynamicData?.forEach((_elementForRarity: any) => {
      _elementForRarity.id = `${editionDnaPrefix}${elementCount}`;
      elements.push(_elementForRarity);
      elementIdsForRarity[rarityWeight.value].push(_elementForRarity.id);
      elementCount++;
    });
    elements[rarityWeight.value] = elementsForRarity;
  });

  const elementsForLayer = {
    id: _id,
    position: _position,
    size: _size,
    elements: getDynamicData,
    elementIdsForRarity,
  };

  return elementsForLayer;
};
export default addLayers;
