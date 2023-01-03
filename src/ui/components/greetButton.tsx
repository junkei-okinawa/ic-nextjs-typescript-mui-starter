import { Principal } from '@dfinity/principal';
import Button from '@mui/material/Button';
import { ReactElement } from 'react';
import { createActor } from '../../declarations/hello';

async function helloFunc() {
  const canisterId: any = process.env.NEXT_PUBLIC_HELLO_CANISTER_ID;
  const hello = createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST
    }
  });
  const helloElement = document.querySelector('#hello');
  const greetResultElement = document.querySelector('#greet_result') as HTMLDivElement;
  const greetResultText = document.querySelector('#p_greet_result') as HTMLDivElement;

  if (helloElement && greetResultElement && greetResultText) {
    greetResultElement.style.display = "flex";
    const name = helloElement.getAttribute('value') as string;
    const greetResult = await hello.greet(name);
    alert(`helloElement: ${greetResult}`);
    console.log(`helloElement: ${greetResult}`);
    greetResultText.innerText = greetResult;
  }

}

const GreetButton = (): ReactElement => {
  return (
    <Button onClick={helloFunc}>Greet</Button>
  )
};

export default GreetButton;