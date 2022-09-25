// import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const saveToMoralis = async (metaHash: any, imageHash: any, editionSize: any) => {
  for (let i = 1; i < editionSize + 1; i++) {
    const id = i.toString();
    const paddedHex = (
      '0000000000000000000000000000000000000000000000000000000000000000' + id
    ).slice(-64);
    const url = `https://ipfs.moralis.io:2053/ipfs/${metaHash}/metadata/${paddedHex}.json`;

    axios
      .get(url, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      })
      .then(async (res) => {
        console.log('save to moralis res data', res.data);
        const data = {
          tableName: 'Metadata',
          dataField: {
            edition: res.data.edition,
            name: res.data.name,
            dna: res.data.dna,
            image: res.data.image,
            attributes: res.data.attributes,
            meta_hash: metaHash,
            image_hash: imageHash,
          },
        };
        axios
          .post('https://8arlpr7qwybm.usemoralis.com:2053/server/functions/insertItem', data, {
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
          })
          .then((res) => {
            console.log('object insert :>> ', res.data);
          })
          .catch((err) => {
            console.log('error in request', err);
          });
      })
      .catch((err) => {
        console.log('save to moralis error in request', err);
      });
  }
};

export default saveToMoralis;
