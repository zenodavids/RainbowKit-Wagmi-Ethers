import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme, // import the desired theme
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
// import custom wallets
import { braveWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';

// import the providers
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

// =========================> configure providers and chains
const { chains, provider, webSocketProvider } = configureChains(
  // Array of networks or chains
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    sepolia,
    // if set to true, use goerli. else, use just the four items in the arrays
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],

  // Array of providers
  [
    infuraProvider({ apiKey: 'api key' }),
    alchemyProvider({ apiKey: 'api key' }),
    publicProvider(),
  ]
);

// ========================> Connectors" for these chains above
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains, // mainnet, polygon, optimism etc.
});

// =========================> WagmiClient
const wagmiClient = createClient({
  autoConnect: true, // to automatically connect your wallet
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        // the default (initial chain) chain the users automatically connects to
        initialChain={polygon}
        // you can add themes(lightTheme(default),darkTheme, and midnightTheme
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
