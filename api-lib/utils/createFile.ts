// import canvas
import React from 'react';
import generateJson1 from '../metadata/genrateJson1';

import { signImage, drawBackground, drawElement } from './canvas';

import { constructLoadedElements } from './constructLoadedElements';

// create image files and return back image object array
const createFile = async (
  canvas: any,
  ctx: any,
  layers: any,
  width: any,
  height: any,
  editionCount: number,
  editionSize: number,
  rarityWeights: any,
  imageDataArray: any,
  storeURL: any[],
  dirHandle2: any,
  fileHandle: any
) => {
  const dna = constructLoadedElements(layers, editionCount, editionSize, rarityWeights);
  console.log('dna',dna)
  let attributesList: any[] = [];
  await Promise.all(dna.loadedElements).then((elementArray) => {
    // create empty image
    ctx.clearRect(0, 0, width, height);
    // draw a random background color
    drawBackground(ctx, width, height);
    // store information about each layer to add it as meta information
    attributesList = [];
    // draw each layer
    elementArray.forEach((element) => {
      drawElement(ctx, element);

      const { selectedElement } = element.layer;
      attributesList.push({
        name: selectedElement.name,
        rarity: selectedElement.rarity,
      });
    });

    // add an image signature as the edition count to the top left of the image
    signImage(ctx, `#${editionCount}`);
    // write the image to the output directory
  });

  let url;
  canvas.toBlob(async (blob: any) => {
    url = URL.createObjectURL(blob);
    console.log('url',url)
    storeURL.push(url);
    imageDataArray[editionCount].blobUrl = url;

    const metaDataVal1 = await generateJson1(editionCount, imageDataArray);
  });
  const base64Canvas = canvas.toDataURL('image/jpeg').split(';base64,')[1];

  // close the file and write the contents to disk.
  imageDataArray[editionCount] = {
    editionCount: editionCount,
    newDna: dna.newDna,
    attributesList: attributesList,
    storeURL: storeURL,
    base64Canvas: base64Canvas,
  };
  return imageDataArray;
};

export default createFile;
