import axios from 'axios';

import uploadMetadata from './uploadMetadata';

const compileMetadata = async (
  apiUrl: any,
  xAPIKey: any,
  editionCount: any,
  editionSize: any,
  imageDataArray: any[]
) => {
  const ipfsArray: any[] = [];
  const promiseArray: any[] = [];

  //counting the unstructured blog of images

  for (let i = 1; i <= editionSize; i++) {
    const id: any = i.toString();
    const paddedHex = (
      '0000000000000000000000000000000000000000000000000000000000000000' + id
    ).slice(-64);

    // reads output folder for images and adds to IPFS object metadata array (within promise array)
    console.log('imageDataArray[1]', imageDataArray[i].base64Canvas);
    promiseArray.push(
      new Promise((res, rej) => {
        ipfsArray.push({
          path: `images/${paddedHex}.png`,
          content: imageDataArray[i].base64Canvas,
        });
      })
    );
  }
  axios
    .post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', ipfsArray, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'X-API-Key': xAPIKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((res) => {
      const imageCID = res.data[0].path.split('/')[4];
      uploadMetadata(apiUrl, xAPIKey, imageCID, editionSize, imageDataArray);
    })
    .catch((err) => {
      console.log('error in request', err);
    });
};

export default compileMetadata;
