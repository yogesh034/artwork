import { description, baseImageUri } from "../config"


const generateMetadata = (dna:any, edition:any, attributesList:any, path:any) => {
  let dateTime = Date.now();
  let tempMetadata = {
    dna: dna.join(""),
    name: `#${edition}`,
    description: description,
    image: path || baseImageUri,
    edition: edition,
    date: dateTime,
    attributes: attributesList,
  };
  return tempMetadata;
};

export default generateMetadata