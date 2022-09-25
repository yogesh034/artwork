import { loadImage } from 'canvas';

// adds a signature to the top left corner of the canvas for pre-production
const signImage = (ctx: any, sig: any) => {
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 30pt Helvetica';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillText(sig, 40, 40);
};

// generate a random color hue
const genColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 100%, 85%)`;
  return pastel;
};

const drawBackground = (ctx: any, width: any, height: any) => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, width, height);
};

const loadLayerImg: any = async (layer: any, path: any) =>
  new Promise(async (resolve) => {
    const image = await loadImage(`${path}`);

    resolve({ layer: layer, loadedImage: image });
  });

const drawElement = (ctx: any, element: any) => {
  console.log('drawElement',element);
  if (element !== undefined) {
    ctx.drawImage(
      element.loadedImage,
      element.layer.position.x,
      element.layer.position.y,
      element.layer.size.width,
      element.layer.size.height
    );
  }
};

export { signImage, genColor, drawBackground, loadLayerImg, drawElement };
