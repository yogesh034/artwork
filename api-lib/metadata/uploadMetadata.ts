import axios from 'axios';
import saveToMoralis from '../moralis/saveToMoralis';
import generateMetadata from './generateMetadata';

const uploadMetadata = async (
  apiUrl: any,
  xAPIKey: any,
  imageCID: any,
  editionSize: any,
  imageDataArray: any
) => {
  const ipfsArray: any = []; // holds all IPFS data
  const metadataList: any = []; // holds metadata for all NFTs (could be a session store of data)
  const promiseArray: any = []; // array of promises so that only if finished, will next promise be initiated

  for (let i = 1; i < editionSize + 1; i++) {
    const id = i.toString();
    const paddedHex = (
      '0000000000000000000000000000000000000000000000000000000000000000' + id
    ).slice(-64);

    imageDataArray[
      i
    ].filePath = `https://ipfs.moralis.io:2053/ipfs/${imageCID}/images/${paddedHex}.png`;

    // do something else here after firstFunction completes
    const nftMetadata = generateMetadata(
      imageDataArray[i].newDna,
      imageDataArray[i].editionCount,
      imageDataArray[i].attributesList,
      imageDataArray[i].filePath
    );
    metadataList.push(nftMetadata);
    promiseArray.push(
      new Promise((res, rej) => {
        ipfsArray.push({
          path: `metadata/${paddedHex}.json`,
          content: Buffer.from(
            JSON.stringify(metadataList.find((meta: any) => meta.edition == i))
          ).toString('base64'),
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
      const metaCID = res.data[0].path.split('/')[4];
      saveToMoralis(metaCID, imageCID, editionSize);
    })
    .catch((err) => {
      console.log('error in request', err);
    });
};

export default uploadMetadata;
