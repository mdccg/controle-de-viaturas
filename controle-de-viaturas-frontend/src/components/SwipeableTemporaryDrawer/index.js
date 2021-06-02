import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({ state, setState, children }) {
  const classes = useStyles();

  const toggleDrawer = open => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {children}
    </div>
  );

  return (
    <React.Fragment>
      <SwipeableDrawer
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}