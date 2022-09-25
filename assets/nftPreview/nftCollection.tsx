import { Box, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSettings from 'src/hooks/useSettings';
import DashboardHeader from 'src/layouts/dashboard/header';
import NftCard from './nft card/NftCard';
import NftShort from './nft card/NftShort';
import Sidebar from './nft card/Sidebar';
import saveFile from 'src/api-lib/moralis/saveFile';
import { createCanvas } from 'canvas';
import { height, width } from '../../../api-lib/config';
import { useAssetsData } from 'src/contexts/AssetsContextProvider';

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const nftCollection = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { assetsData } = useAssetsData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [files, setFiles] = useState<any>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [storeURL] = useState<any>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [artwork, setArtwork] = useState<any>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';
  // const RootStyle = styled('div')(({ theme }) => ({
  //   paddingBottom: theme.spacing(5),
  // }));
  console.log('assetsData', assetsData);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const folderName = Object.keys(assetsData).map((item) => item);
console.log('folderName',folderName);
    const dirHandle2 = '';
    const fileHandle = '';
    const dummy = ['background', 'skin','hair', 'cloth',  'nose', 'eyes', 'lips'];
    const updateData: any = {};
    folderName.forEach((item: any) => {
      for (const key in files) {
        if (item === key) {
          updateData[`${item}`] = assetsData[key];
        }
      }
    });
    console.log('assetsData', assetsData);
    const generateImage = saveFile(
      dummy,
      5,
      assetsData,
      canvas,
      ctx,
      storeURL,
      dirHandle2,
      fileHandle
    );
    const printAddress = () => {
      generateImage.then((a) => {
        setArtwork(a);
      });
    };

    printAddress();
  }, [assetsData]);

  console.log('artwork :>> ', artwork);

  const details = [
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abx',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abx',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
    {
      image: '/assets/ailogo.png',
      name: 'abc',
    },
  ];
  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

      <Stack direction="row" sx={{ marginTop: '110px', justifyContent: 'space-between' }}>
        <TextField
          id="outlined-password-input"
          label="Search"
          type="text"
          autoComplete="current-Search"
        />
        <Box sx={{ marginRight: '5%' }}>
          <NftShort />
        </Box>
      </Stack>

      <Stack direction="row" sx={{ marginTop: '20px' }}>
        <Sidebar />
        <Box>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(5, 1fr)',
                lg: 'repeat(7, 1fr)',
              },
            }}
          >
            {artwork?.length > 0 &&
              artwork.map((product: any, i: number) => <NftCard key={i} product={product} />)}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default nftCollection;
