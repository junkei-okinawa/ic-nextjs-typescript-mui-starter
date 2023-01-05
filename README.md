# Internet Computer with Next.js, TypeScript and Material-ui example

## How to use

Clone repository:
```sh
git clone https://github.com/junkei-okinawa/ic-nextjs-typescript-mui-starter.git
cd ic-nextjs-typescript-mui-starter
```

### Installation
Run the following command to install dfx 0.12.1:
```sh
DFX_VERSION=0.12.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Install modules:
```sh
yarn install # or npm install
```

### Deployment
#### Local Deployment
Start up an IC replica and deploy:
```sh
# Open a terminal and navigate to your project's root directory, then run the following command to start a local IC replica
dfx start --clean

# open another terminal and run these commands from the root directory of your project
dfx deploy
```

The following output will be displayed, so connect to the frontend URL
```sh
Deployed canisters.
URLs:
  Frontend canister via browser
    frontend: http://127.0.0.1:4943/?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai
  Backend canister via Candid interface:
    hello: http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=ryjl3-tyaaa-aaaaa-aaaba-cai
```

frontend app server start
```sh
yarn run dev # or npm run dev
```