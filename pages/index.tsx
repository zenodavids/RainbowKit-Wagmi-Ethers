import Head from 'next/head';
// for accessing account data and connection status.
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useIfMounted } from './hooks/useIfMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  // use this hook to solve the hydration error when using wagmi
  const mounted = useIfMounted();

  // get connected wallet address
  const { address } = useAccount();
  const userAddress = address ? <p>My address is {address}</p> : null;

  // get ENS name
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });
  const ensName = data ? <p>My ens name is {data}</p> : null;
  console.log(data);

  // get ENS avatar
  const ensAvatar = useEnsAvatar({ address });
  console.log(ensAvatar ? ensAvatar : 'no avatar');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {/*get more customization here:
         https://www.rainbowkit.com/docs/connect-button */}
          <ConnectButton />

          {mounted && userAddress}
          {mounted && ensName}
        </div>
      </main>
    </div>
  );
};

export default Home;
