import React, { useState, ReactElement } from 'react';
import { GetServerSideProps } from "next";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { makeHelloActor } from '../service/actor-locator';

const GreetSection = (): ReactElement => {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

  function onChangeName(e: any) {
    const newName = e.target.value
    setName(newName)
  }

  async function sayGreeting() {
    const greetResult = document.querySelector('#greet_result') as HTMLDivElement;
    greetResult.style.display = "flex";
    setGreetingMessage("");
    setLoading("Loading...");

    const helloActor = makeHelloActor();
    const greeting = await helloActor.greet(name);

    setLoading("");
    setGreetingMessage(greeting);
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box maxWidth="sm">
          <TextField value={name} onChange={onChangeName} id="hello" label="hello" variant="outlined" />
          <Button variant="contained" onClick={sayGreeting}>Greet</Button>
        </Box>
        <Box sx={{ flexDirection: 'column', alignItems: 'center', }} maxWidth="sm" id="greet_result" style={{ display: 'none' }} >
          <Box>
            <Typography variant="h5">greeting</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{loading}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{greetingMessage}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
};

export default GreetSection;

// ==================================
// propsの型を定義する
// type Props = {
//   sayGreeting?: Promise<void>;
// };

// // サーバサイドで実行する処理(getServerSideProps)を定義する
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // APIやDBからのデータ取得処理などを記載

//   const props: Props = {
//     sayGreeting: sayGreeting(),
//   };

//   return {
//     props: props,
//   };
// };