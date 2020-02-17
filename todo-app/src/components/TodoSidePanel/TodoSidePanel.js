import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '300px'
  }
}));

export default function TodoSidePanel(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index, tab) => {
    setSelectedIndex(index);
    props.setSelectedTab(tab);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0, 'allTasks')}
        >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="All Tasks" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1, 'completed')}
        >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Completed Tasks" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2, 'open')}
        >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Pending Tasks" />
        </ListItem>
      </List>
    </div>
  );
}
