import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { setUserNameToLocalStorage } from "../data/localData";

type Props = {
  setUserName: (arg: string)=> void;
}

const UserName: React.FC<Props> = ({setUserName}) => {

  const [newUserName, setNewUserName] = useState("")

  const submitHandler = ()=> {
   const trimmedName = newUserName.trim();
   if (trimmedName !== '') {
     setUserName(trimmedName);
     setUserNameToLocalStorage(trimmedName);
   }
  }

  return (
    <Box sx={{ display: 'flex', gap:'10px', justifyContent: 'center', alignItems: 'center' }}>
      <TextField
        id="outlined-basic"
        label="User name"
        variant="outlined"
        size="small"
        value={newUserName}
        onChange={(e)=> {setNewUserName(e.target.value)}}
      />
      <Button
        variant="contained"
        size="large"
        onClick = {submitHandler}
      >Save</Button>
    </Box>
  );
};

export default UserName;
