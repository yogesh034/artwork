import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import { useAssetsData } from '../../../contexts/AssetsContextProvider';
import { useEffect, useState } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import DashboardHeader from 'src/layouts/dashboard/header';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import saveFile from 'src/api-lib/moralis/saveFile';
import { createCanvas } from 'canvas';
import { height, width } from '../../../api-lib/config';
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // margin: '5px',
  textAlign: 'center',
  color: 'black',
  border: `1px solid black`,
  fontSize: `30px`,
  borderRadius: `25px`,

  ...draggableStyle,
});

const ReorderAssets = () => {
  

  const { themeStretch } = useSettings();
  const { assetsData } = useAssetsData();
  const [folderNames, setFolderNames] = useState<any>([]);
  const [storeURL] = useState<any>([]);
  const [artwork, setArtwork] = useState<any>([]);

  var i=0;
  useEffect(() => {
    console.log('number load,',i)
    if (Object.keys(assetsData)?.length > 0) {
      setFolderNames(Object.keys(assetsData)?.map((folderName) => folderName));
    }
    const dummy = ['background', 'skin','hair', 'cloth',  'nose', 'eyes', 'lips'];

    const dirHandle2 = '';
    const fileHandle = '';
    const generateImage = saveFile(
      folderNames,
      1,
      assetsData,
      canvas,
      ctx,
      storeURL,
      dirHandle2,
      fileHandle
    );
    const printArtwork = () => {
      generateImage.then((res) => {
        console.log('assetsData res:>> ', res);
        setArtwork(res);
      });
    };

    printArtwork();
    i++;
  }, [assetsData,setFolderNames]);
  console.log('artwork blob :>> ', artwork);
  //console.log('artwork blob :>> ', artwork?.blobUrl);
  //console.log('assetsData :>> ', assetsData);
  

  const handleDrop = (droppedItem: any) => {
    if (!droppedItem.destination) return;
    const updatedList = [...folderNames];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setFolderNames(updatedList);
  };
  const { push } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';
  console.log('folderNames',folderNames)
  const generativAiArt = () => {
    push('/assets/nftPreview/nftCollection');
  };
  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

      <Page title="">
        <Box
          sx={{
            margin: 'auto',
            maxWidth: '900px',
            height: '650px',
            width: '100%',
            marginTop: '5%',
          }}
        >
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '450px', height: 'auto' }}>
              <Typography variant="h3" component="h1" paragraph>
                Adjust your Assets
               
              </Typography>
            </div>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                height: '100%',
                width: '100%',
                margin: 'auto',
                maxHeight: '40px',
                maxWidth: '400px',
              }}
            >
              <TextField
                id="outlined-basic"
                label="Number Of Collection"
                variant="outlined"
                size="small"
              />
              <Button variant="contained" onClick={generativAiArt}>
                Submit
              </Button>
            </Stack>
            <br />

            <Box sx={{ height: '558px', border: '20px solid #f1f3f5' }}>
              <Grid container>
                <Grid item xs={12} md={6} lg={6}>
                  <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    subheader={
                      <ListSubheader
                        sx={{ fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                      >
                        Attributes
                      </ListSubheader>
                    }
                  >
                    <Scrollbar>
                      <Box sx={{ padding: '15px', maxHeight: '440px', height: '100%' }}>
                        <DragDropContext onDragEnd={handleDrop}>
                          <Droppable droppableId="list-container">
                            {(provided: any) => (
                              <div
                                className="list-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {folderNames?.map((item: string, index: number) => (
                                  <Draggable key={item} draggableId={item} index={index}>
                                    {(provided: any, snapshot: any) => (
                                      <div
                                        className="item-container"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        <ListItem>
                                          <ListItemText id="assets" primary={item} />
                                          <Switch defaultChecked color="info" />
                                        </ListItem>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </Box>
                    </Scrollbar>
                  </List>
                </Grid>
                {artwork.map((item:any,index:number)=>(
                  
                    <>
                    <Grid item xs={12} md={6} lg={6}>
                    <CardMedia
                      component="img"
                      sx={{ height: '520px', border: '20px solid #f1f3f5' }}
                      image={item !== '' ? item?.blobUrl : ''}
                      alt="Live from space album cover"
                    />
                  </Grid>
                    </>
                  
                
              ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Page>
    </>
  );
};

export default ReorderAssets;
