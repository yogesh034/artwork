import startCreating from '../utils/startCreating';
import addLayers from '../metadata/addLayers';

const saveFile = async (
  folders: any,
  editionSize: number,
  files: any,
  canvas: any,
  ctx: any,
  storeURL: any,
  dirHandle2: any,
  fileHandle: any
) => {
  console.log('ture');
  try {
    const layers1: any[] = [];
    let i = 0;

    folders.forEach((data: any) => {
      console.log('data ID',data);
      layers1.push(addLayers(data, '', '', '', files, i));
      i++;
    });
    const IpfsUrl = await startCreating(
      layers1,
      editionSize,
      canvas,
      ctx,
      storeURL,
      dirHandle2,
      fileHandle
    );
    console.log('IpfsUrl :>> ', IpfsUrl);
    return IpfsUrl;
  } catch (err) {
    console.log('err new', err);
  }
};

export default saveFile;
