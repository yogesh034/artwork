import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

type Props = {
  product: any;
};
function NftCard({ product }: Props) {
  console.log('product :>> ', product);
  const { filePath, editionCount } = product;

  return (
    <>
      <Card sx={{ height: '250px', width: '200px', boxShadow: 24 }}>
        <Box>
          <Image
            alt={editionCount}
            src={
              `${product?.blobUrl}`
            }
            width={300}
            height={300}
          />
        </Box>

        <Box sx={{ backgroundColor: 'lightgray', height: '45px' }}>
          <Typography
            variant="subtitle2"
            style={{ textAlign: 'center', fontSize: '18px', marginTop: '9px' }}
          >
            {editionCount}
          </Typography>
        </Box>
      </Card>
    </>
  );
}

export default NftCard;
