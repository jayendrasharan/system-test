import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import debounce from '../../utils/debounce';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

(function () {
  const keysPressed = {};
  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (keysPressed['Control'] && keysPressed['Shift'] && event.key == 'F') {
      const node = document.getElementById('global-searchbox');
      if (node) {
        node.focus();
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
  });
})();

const InputSearchBox = props => {
  const classes = useStyles();
  const debouncedSearch = debounce(value => props.handleSearch(value), 200)
  return (
    <TextField
      label="Global Search"
      id="global-searchbox"
      placeholder="Press Ctrl + Shift + F"
      className={clsx(classes.margin, classes.textField)}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }}
      onChange={({ target: { value } }) => debouncedSearch(value)}
    />
  )
};
export default InputSearchBox;