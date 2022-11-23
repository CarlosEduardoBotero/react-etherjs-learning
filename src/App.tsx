import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {
  interface IuserMetamaskData {
    address: string;
    balance: string;
  }

  const [userMetamaskData, setUserMetamaskData] = useState<IuserMetamaskData>();

  const connectEthereum = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider.send('eth_requestAccounts', []);
    const balance = await provider.getBalance(account[0]);
    const balanceEther = ethers.utils.formatEther(balance);

    setUserMetamaskData({ address: account[0], balance: balanceEther });
  };

  useEffect(() => {
    window.ethereum.selectedAddress && connectEthereum();
  }, []);

  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="w-96 h-96 shadow-xl rounded bg-slate-700 flex flex-col gap-6">
        <p className="text-white">
          account: {userMetamaskData?.address && userMetamaskData.address}
        </p>
        <p className="text-white">
          Balance: {userMetamaskData?.balance && userMetamaskData.balance}
        </p>
      </div>
    </div>
  );
}

export default App;
