import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../ui/Link';

const GreetButton = dynamic(() => import('../ui/components/greetButton'), { ssr: false })

// import {
//   createActor as createHelloActor,
//   canisterId as helloCanisterId
// } from '../declarations/hello';

// export const makeActor = (canisterId: String, createActor: any) => {
//   return createActor(canisterId, {
//     agentOptions: {
//       host: process.env.NEXT_PUBLIC_IC_HOST
//     }
//   })
// }

// export function makeHelloActor() {
//   return makeActor(helloCanisterId, createHelloActor)
// }

export default function Hello() {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  console.log("process.env.DFX_NETWORK: ", process.env.DFX_NETWORK);
  console.log("process.env.NEXT_PUBLIC_HELLO_CANISTER_ID: ", process.env.NEXT_PUBLIC_HELLO_CANISTER_ID);
  console.log("process.env.NEXT_PUBLIC_IC_HOST: ", process.env.NEXT_PUBLIC_IC_HOST);

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

    // const helloActor = makeHelloActor();
    // const greeting = await helloActor.greet(name);

    setLoading("");
    // setGreetingMessage(greeting);
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
          <GreetButton />
        </Box>
        <Box maxWidth="sm" id="greet_result" style={{ display: 'none' }} >
          <h4>greeting</h4>
          <p>{loading}</p>
          <p id="p_greet_result"></p>
        </Box>
        <hr />
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  )
}