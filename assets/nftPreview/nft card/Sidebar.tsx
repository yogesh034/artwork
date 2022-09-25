import { Icon } from '@iconify/react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';

function Sidebar() {
  const [open, setOpen] = useState(null);
  const layers = [
    {
      id: 1,
      name: 'Background',

      sublayers: [
        {
          id: 1,
          name: 'BG1',
        },
        {
          id: 2,
          name: 'BG2',
        },
        {
          id: 3,
          name: 'BG3',
        },
      ],
    },

    {
      id: 2,
      name: 'Cloth',

      sublayers: [
        {
          id: 1,
          name: 'Blackdress',
        },
        {
          id: 2,
          name: 'LatexBLK',
        },
        {
          id: 3,
          name: 'Latexred',
        },
        {
          id: 4,
          name: 'Reddress',
        },
        {
          id: 5,
          name: 'Tshirtorrange',
        },
      ],
    },

    {
      id: 3,
      name: 'Eyes',

      sublayers: [
        {
          id: 1,
          name: 'beasteyes',
        },
        {
          id: 2,
          name: 'Blueeyes',
        },
        {
          id: 3,
          name: 'eyesblack',
        },
        {
          id: 4,
          name: 'Eyesred',
        },
      ],
    },

    {
      id: 4,
      name: 'Hair',

      sublayers: [
        {
          id: 1,
          name: 'backhair',
        },
        {
          id: 2,
          name: 'backhairBCk',
        },
        {
          id: 3,
          name: 'hair',
        },
        {
          id: 4,
          name: 'hair2',
        },
        {
          id: 5,
          name: 'hair2GBLK',
        },
        {
          id: 6,
          name: 'hair3',
        },
        {
          id: 7,
          name: 'hairBLK',
        },
      ],
    },
    {
      id: 5,
      name: 'Lips',

      sublayers: [
        {
          id: 1,
          name: 'Lips1',
        },
        {
          id: 2,
          name: 'Lips2',
        },
        {
          id: 3,
          name: 'Lips3',
        },
        {
          id: 4,
          name: 'Lips4',
        },
        {
          id: 5,
          name: 'Lips5',
        },
      ],
    },

    {
      id: 6,
      name: 'Nose',

      sublayers: [
        {
          id: 1,
          name: 'Nose',
        },
      ],
    },

    {
      id: 7,
      name: 'Skin',

      sublayers: [
        {
          id: 1,
          name: 'base',
        },
        {
          id: 1,
          name: 'baseDark',
        },
      ],
    },
  ];
  const handleClick = (i: any) => {
    setOpen(i);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '80%',
        position: 'relative',
        maxWidth: '224px',
        marginRight: '50px',
        borderRadius: '0.2rem',
      }}
    >
      {layers.map((layername, index) => (
        <React.Fragment key={index}>
            <Box sx={{border:'1px solid gray',margin:'5px', borderRadius:'10px'}}>

          <ListItemButton
            onClick={() => {
                index === open ? setOpen(null) : handleClick(index);
            }}
            >
            <ListItemIcon>
              {index === open ? (
                  <Icon icon="bxs:right-arrow" rotate={1} />
                  ) : (
                <Icon icon="bxs:right-arrow" />
                )}
            </ListItemIcon>
            <ListItemText primary={layername.name} />
          </ListItemButton>
          <Collapse in={index === open}>
            {layername.sublayers.map((cLayer, i) => (
              <List component="div" disablePadding key={i}>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={cLayer.name} />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
            </Box>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;
