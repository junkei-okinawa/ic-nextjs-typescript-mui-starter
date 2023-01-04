import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../ui/Link';

const GreetSection = dynamic(() => import('../ui/components/greetSection'), { ssr: false })
// import GreetButton from '../ui/components/greetButton';

export default function Hello() {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  console.log("process.env.DFX_NETWORK: ", process.env.DFX_NETWORK);
  console.log("process.env.NEXT_PUBLIC_HELLO_CANISTER_ID: ", process.env.NEXT_PUBLIC_HELLO_CANISTER_ID);
  console.log("process.env.NEXT_PUBLIC_IC_HOST: ", process.env.NEXT_PUBLIC_IC_HOST);

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
        <h1>Hello Greet Page</h1>
        <GreetSection />
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