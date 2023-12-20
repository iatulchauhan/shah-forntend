import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  picker: {
    display: 'inline-grid',
    boxShadow: '0 .5vw 2vw -5px rgba(0, 0, 0, .2)',
    borderRadius: '15px',
    position: 'relative',
    borderTop: '2rem solid white',
    borderBottom: '2rem solid white',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    background: 'white',
    gridTemplateColumns: 'repeat(3, 1fr)',
    fontSize: 'calc(.5rem + 2.4vw)',
    position: 'relative',
    fontFeatureSettings: '"tnum"',
    fontWeight: 400,
    overflow: 'hidden', // Added overflow to hide additional items
  },
  button: {
    display: 'inline-block',
    appearance: 'none',
    border: '1px solid darken(cornflowerblue, 10)',
    background: 'transparent',
    color: 'darken(cornflowerblue, 10)',
    borderRadius: '15px',
    fontWeight: 500,
    padding: '1rem',
    fontSize: '1.1rem',
    fontFamily: '"San Francisco Text", sans-serif',
    cursor: 'pointer',
    letterSpacing: '.01em',
  },
  pickerList: {
    maxHeight: '8em', // Set your preferred fixed height here
    overflowY: 'auto',
  },
  pickerItem: {
    textAlign: 'center',
    padding: '1rem',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))',
  },
}));

const PickerComponent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleOpenPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    handleClosePicker();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        className={classes.button}
        onClick={handleOpenPicker}
        variant="outlined"
      >
        Open Picker
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className={classes.picker}>
          <List className={classes.pickerList}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
              <ListItem
                button
                key={day}
                className={classes.pickerItem}
                selected={selectedDay === day}
                onClick={() => handleDaySelect(day)}
              >
                <div className={classes.gradientOverlay}></div>
                <Typography variant="h6">
                  {selectedDay === day ? `Day ${day} (Selected)` : `Day ${day}`}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popover>
    </div>
  );
};

export default PickerComponent;
