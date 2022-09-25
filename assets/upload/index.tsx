import { Box, Button, CardMedia, Container, Stack } from '@mui/material';
import useSettings from '../../../hooks/useSettings';
import { styled } from '@mui/material/styles';
import Page from '../../../components/Page';
import { useAssetsData } from '../../../contexts/AssetsContextProvider';
import { useRouter } from 'next/router';
import DashboardHeader from 'src/layouts/dashboard/header';
import { useState } from 'react';

declare global {
  interface Window {
    showDirectoryPicker?: any;
  }
}
// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    cursor: 'pointer',
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}));
const UploadAssets = () => {
  const { push } = useRouter();

  const { themeStretch } = useSettings();

  const { setAssetsData } = useAssetsData();
  const handleFleAccess = async () => {
    const out = {};
    const dirHandle = await window.showDirectoryPicker();
    await handleDirectoryEntry(dirHandle, out);
    setAssetsData(out);
    push('/assets/display');
  };
  async function handleDirectoryEntry(dirHandle: any, out: any) {
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        out[file.name] = file;
      }
      if (entry.kind === 'directory') {
        const newHandle = await dirHandle.getDirectoryHandle(entry.name, { create: false });
        const newOut = (out[entry.name] = {});
        await handleDirectoryEntry(newHandle, newOut);
      }
    }
  }

  const [open, setOpen] = useState<boolean>(false);
  const { themeLayout } = useSettings();

  const verticalLayout = themeLayout === 'vertical';

  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

      <Page title="">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Box sx={{ width: '600px', margin: 'auto', marginTop: '12%' }}>
            <DropZoneStyle>
              <Stack direction="column">
                <CardMedia
                  component="img"
                  src="/assets/file.png"
                  alt="file upload image"
                  style={{ height: '200px', width: '200px', margin: 'auto' }}
                />
                <Box sx={{ p: 3, ml: { md: 2 }, textAlign: 'center' }} onClick={handleFleAccess}>
                  <Button variant="contained">Select Folder</Button>
                </Box>
              </Stack>
            </DropZoneStyle>
          </Box>
        </Container>
      </Page>
    </>
  );
};

export default UploadAssets;
