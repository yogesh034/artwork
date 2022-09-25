import React, { Fragment, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  CardActionArea,
  CardMedia,
  styled,
} from '@mui/material';
import { useAssetsData } from 'src/contexts/AssetsContextProvider';
import DashboardHeader from 'src/layouts/dashboard/header';
import useSettings from 'src/hooks/useSettings';
import { varHover, varTranHover } from 'src/components/animate';
import { m } from 'framer-motion';
import saveFile from 'src/api-lib/moralis/saveFile';
import { createCanvas } from 'canvas';
import { height, width } from '../../../api-lib/config';
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const GenerativeArt = () => {
  const { assetsData } = useAssetsData();
  const [files, setFiles] = useState<any>();
  const [storeURL] = useState<any>([]);
  const [artwork, setArtwork] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';
  const RootStyle = styled('div')(({ theme }) => ({
    paddingBottom: theme.spacing(5),
  }));
  console.log('assetsData', assetsData);

  useEffect(() => {
    const folderName = Object.keys(assetsData).map((item) => item);

    const dirHandle2 = '';
    const fileHandle = '';
    const dummy = ['hair', 'cloth', 'background', 'nose', 'eyes', 'lips', 'skin'];
    const updateData: any = {};
    dummy.forEach((item: any) => {
      for (const key in files) {
        if (item === key) {
          updateData[`${item}`] = assetsData[key];
        }
      }
    });
    console.log('updateData', updateData);
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
        console.log('artwork a :>> ', a);
        console.log('artwork :>> ', artwork);
      });
    };

    printAddress();
  }, [assetsData]);
  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

      <RootStyle>
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={3} sx={{ my: 10 }}>
            <></>
          </Grid>
          <br />
        </Container>
      </RootStyle>
    </>
  );
};

export default GenerativeArt;
