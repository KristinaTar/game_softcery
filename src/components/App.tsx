import React, { useState } from 'react';

import { Container } from "@mui/material";
import UserName from "./UserName";
import { getUserNameFromLocalStorage } from "../data/localData";
import Game from "./Game";
import { Route, Routes } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState(getUserNameFromLocalStorage());

  return (
    <Container>
      {!userName
        ? <UserName setUserName={setUserName}/>
        : <Routes>
            <Route path=":gameId?" element={<Game userName={userName}/>}/>
          </Routes>
      }
    </Container>
  );
}

export default App;
