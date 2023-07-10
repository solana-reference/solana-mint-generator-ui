# Mint Generator UI

### A UI for interacting with the [solana-mint-generator](https://github.com/solana-reference/solana-mint-generator) program

This UI can be self-hosted and is entirely driven by on-chain configuration. Therefore this UI can view any mint-config created via the solana-mint-generator program and display things including

- Viewing mint-config, supply, and remaining tokens
- Viewing mint phases and displaying relevent phase information
- Dynamically update according to active phase
- Checking allowlist/denylist for a given phase
- Intrepreting and displaying customized view based on mint-config metadata
- A mint button for interacting with the program

# SDK

The SDK for the program is stored in the [sdk](src/sdk) directory. This is take from the sdk generated by the solana-mint-generator repo sdk (https://github.com/solana-reference/solana-mint-generator/tree/main/sdk).

If breaking changes are made to the program the SDK must be updated here to allow the UI to continue intereacting with the new program.

# Application state

The whole repo uses [react-query](https://tanstack.com/query/latest) to handle state management in the application. All data reads are in the [hooks](src/hooks) directory and actions are in the [handlers](src/handlers) directory.

# Using the UI

The main action users can take is via the mint button, which calls the mint instruciton in the UI. This action is handled in the corresponding [handler](src/handlers/useHandleMint.ts)

# Metadata

One of the most important features of this UI is that it can interpret on-chain metadata to customize the display of a given mint-config and phases.

The metadata schema can be found in the [hook](src/hooks/useMintConfigMetadata.ts) for getting mint metadata.

Similarly for phases the phase metadata is interpreted by the mint phase metadata [hook](src/hooks/useMintPhaseMetadata.ts).

# Getting Started

To run the repo yourself locally

```bash
git clone https://github.com/solana-reference/solana-mint-generator
yarn dev
```

The repo can be deployed easily on any platform that can host nextJS based applications. The current recommended platform is [vercel](https://vercel.com/home) and it can be hosted by creating a new project and importing the repo.