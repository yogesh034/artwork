/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-loop-func */
import createFile from './createFile';
import { width, height, rarityWeights } from '../config';
import compileMetadata from '../metadata/compileMetadata';
// import generateJson from "../metadata/genrateJson";

type Data = {
  name: any;
};
type imageData = {
  name: any;
};
// Moralis creds
const serverUrl: any = 'https://8arlpr7qwybm.usemoralis.com:2053/server';
const appId: any = 'pZYut4kSTiGO6JIK7YU4YI7U6B9GTOyvRKVB2h1Y';
const masterKey: any = 'qU9sGcZEXqtcSIsO9jd9wJ6aWj4B4Z8wjaAg2lKP';
const apiUrl: any = 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder';
const apiKey: any = 'QFWRhuPcg4DpWFg8fatINrI5UTdwUZ8BQzCmbnP5htxWxz0gDJYAgXu79bO81IJr';
// setup canvas

const startCreating = async (
  layers1: any,
  editionSize: any,
  canvas: any,
  ctx: any,
  storeURL: any,
  dirHandle2: any,
  fileHandle: any
) => {
  // image data collection
  let imageDataArray: imageData[] = [];

  // create NFTs from startEditionFrom to editionSize
  let editionCount = 1;

  while (editionCount <= editionSize) {
    const handleFinal = async () => {
      // create image files and return object array of created images
      [...imageDataArray] = await createFile(
        canvas,
        ctx,
        layers1,
        width,
        height,
        editionCount,
        editionSize,
        rarityWeights,
        imageDataArray,
        storeURL,
        dirHandle2,
        fileHandle
      );
    };

    await handleFinal();
    //To upload image/json in moralis server

    // iterate
    editionCount++;
  }
  //await generateJson(editionSize,imageDataArray)
  //To upload image/json in moralis server
 // await compileMetadata(apiUrl, apiKey, editionCount, editionSize, imageDataArray);
  console.log('compileMetadata imageDataArray :>> ', imageDataArray);
  return imageDataArray;
};
export default startCreating;
