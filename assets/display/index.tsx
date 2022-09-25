import React, { Fragment, useState } from 'react';
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

const DisplayAssets = () => {
  const { assetsData } = useAssetsData();

  const [open, setOpen] = useState<boolean>(false);
  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';
  const RootStyle = styled('div')(({ theme }) => ({
    paddingBottom: theme.spacing(5),
  }));
  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

      <RootStyle>
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={3} sx={{ my: 10 }}>
            {Object.keys(assetsData).map((item: any, index: number) => (
              <Fragment key={index}>
                <Grid item xs={12} sm={4}>
                  {Object.keys(assetsData?.[item]).length !== 0 ? (
                    <>
                      <Typography variant="h5" paragraph sx={{ marginTop: '50px' }}>
                        {item}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`${Object.keys(assetsData?.[item]).length} traits`}
                      </Typography>
                    </>
                  ) : (
                    ''
                  )}
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2.5,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    }}
                  >
                    {Object.keys(assetsData[item]).map((list: any, id: number) => {
                      const imageName = assetsData[item][list].name.split('.')[0];
                      return (
                        <Fragment key={id}>
                          <Paper variant="outlined" sx={{ p: 1, marginTop: '50px' }}>
                            <CardActionArea
                              component={m.div}
                              whileHover="hover"
                              sx={{
                                p: 3,
                                borderRadius: 1,
                                color: 'primary.main',
                                bgcolor: 'background.neutral',
                              }}
                            >
                              <m.div variants={varHover(1.2)} transition={varTranHover()}>
                                <CardMedia
                                  component="img"
                                  src={URL.createObjectURL(assetsData[item][list])}
                                  alt={list}
                                />
                              </m.div>
                            </CardActionArea>

                            <Typography variant="subtitle2" sx={{ mt: 1, p: 1 }}>
                              {imageName}
                            </Typography>
                          </Paper>
                        </Fragment>
                      );
                    })}
                  </Box>
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <br />
        </Container>
      </RootStyle>
    </>
  );
};

export default DisplayAssets;
