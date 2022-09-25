import generateMetadata from './generateMetadata';
const basePath = process.cwd();

const generateJson = async (editionSize: any, imageDataArray: any) => {
  const ipfsArray: any = []; // holds all IPFS data
  const metadataList: any = []; // holds metadata for all NFTs (could be a session store of data)
  const promiseArray: any = []; // array of promises so that only if finished, will next promise be initiated
  let filepath = '';
  for (let i = 0; i < editionSize + 1; i++) {
    //  let i= 0;
    // let i = editionSize;
    const id = i.toString();
    const paddedHex = (
      '0000000000000000000000000000000000000000000000000000000000000000' + id
    ).slice(-64);

    const filename = i.toString() + '.json';
    const imageCID = '';

    const filetype = 'base64';
    //imageDataArray[i].filePath = `https://ipfs.moralis.io:2053/ipfs/images/${paddedHex}.png`;
    //console.log('imageDataArray[i].filePath' , imageDataArray[i].filePath);
    //imageDataArray[i].image_file = res.data[i].content;
    // do something else here after firstFunction completes
    const nftMetadata = generateMetadata(
      imageDataArray[i].newDna,
      imageDataArray[i].editionCount,
      imageDataArray[i].attributesList,
      imageDataArray[i].filePath
    );
    metadataList.push(nftMetadata);

    // save locally as file
    /* fs.writeFileSync(
      `${basePath}/output/${filename}`,
      JSON.stringify(metadataList.find((meta:any) => meta.edition == i))
    ); */
  }
  return metadataList;
};

export default generateJson;
