import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import styles from './GenerateRecipe.module.scss';
import cx from 'classnames';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


interface MultipleSelectProps {
  items: string[];
  name: string;
  id: string;
  label: string | null;
}


const MultipleSelect: React.FC<MultipleSelectProps> = ({ items, name, id, label = null }) => {
  const theme = useTheme();

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const { target: { value },} = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className={cx('col-6',styles.multipleSelectItem)}>
      {label && <div className={styles.label}>{label}</div>}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="cuisine-label">{name}</InputLabel>
        <Select
          labelId="cuisine-label"
          id="select-cuisine"
          multiple
          placeholder='Select Cuisine'
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-cuisine" label={name} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, personName, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;