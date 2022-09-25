import React from 'react';

const fs = require('fs');
const basePath = process.cwd();

const writeMetaData = (metadataList: any) => {
  fs.writeFileSync(`${basePath}/output/_metadata.json`, JSON.stringify(metadataList));
};

export default writeMetaData;
