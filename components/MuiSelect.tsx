import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NodeNextRequest } from 'next/dist/server/base-http/node';
import styles from './modules/AskQuestionPage.module.scss'
import { tags } from '../helperFunctions';

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

interface MultipleSelectPlaceholderProps{
  handleChange:()=>void;
  tag:string[];
}


const MultipleSelectPlaceholder:React.FC<MultipleSelectPlaceholderProps>=({handleChange,tag})=> {

  return (
    <div className={styles["select-container"]}>
      <FormControl 
      className={styles["form-control"]}
      style={{width:'100%'}}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { border:"2px solid #EAEAEA " },
        },
        
            "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                  borderColor: "#F48023"
                }
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
          borderColor: "#F48023"
                }
              }
        
      }}
          >
        <Select
          multiple
          displayEmpty
          style={{height:34, fontStyle:'normal',fontFamily:'Roboto',fontWeight:'300',color:'#808080',fontSize:'12px',letterSpacing:'0.02em'}}
          value={tag}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span> Select up to 3 tags</span>
            }
            
              return selected.slice(0,3).join(', ');

          }}
          MenuProps={MenuProps}
          inputProps= {{ 
              'aria-label': 'Without label' 
            }}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              style={{fontSize:'13px'}}
              sx={{ 
                "&:hover": {
                    backgroundColor: "#FCF4EC"
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#FCF4EC" 
                  }
              }}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelectPlaceholder;