import "./App.css";
import { Container } from "@mui/material";
import { Home } from "./Home";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bscTestnet } from "wagmi/chains";

function App() {
  const chains = [arbitrum, mainnet, polygon, bscTestnet];
  // eslint-disable-next-line no-undef
  const projectId = "22e3cb7466f17c0b872fd7ddd4ccb82e";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <Container maxWidth="lg">
      <WagmiConfig config={wagmiConfig}>
        <Home />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Container>
  );
}

export default App;
