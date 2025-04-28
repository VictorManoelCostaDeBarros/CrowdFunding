import { createContext, useContext, type ReactNode, useState } from 'react';
import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, type Account } from 'viem';
import { anvil } from 'viem/chains';
import { abi } from '../utils/abi';

const contractAddress = '0xB8E18fb553aA8BFb8dbC6155e63e89035E965B70';

export interface CampaignForm {
  name: string
  title: string;
  category: string;
  description: string;
  target: bigint; 
  deadline: string; 
  image: string;
}

export interface Campaign {
  owner: string;
  title: string;
  category: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

export interface Donation {
  donator: string;
  donation: string;
}

interface StateContextType {
  address: string | null;
  connect: () => Promise<void>;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<void>;
  getDonations: (pId: number) => Promise<Donation[]>;
}

const StateContext = createContext<StateContextType | null>(null);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [walletClient, setWalletClient] = useState<ReturnType<typeof createWalletClient> | null>(null);

  const publicClient = createPublicClient({
    chain: anvil,
    transport: http(),
  });

  const { ethereum } = window as unknown as { ethereum?: any };

  const connect = async () => {
    if (!ethereum) {
      throw new Error('No wallet found');
    }

    const walletClientInstance = createWalletClient({
      chain: anvil,
      transport: custom(ethereum),
    });

    const [account] = await walletClientInstance.requestAddresses();
    setWalletClient(walletClientInstance);
    setAddress(account);
  };

  const publishCampaign = async (form: CampaignForm) => {
    if (!walletClient || !address) throw new Error('Wallet not connected');

    await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: 'createCampaign',
      args: [
        address,
        form.title,
        form.description,
        form.category,
        form.target,
        BigInt(new Date(form.deadline).getTime()),
        form.image,
      ],
      chain: anvil,
      account: address as unknown as Account
    });
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    const result = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: 'getCampaigns',
    }) as any[]; 

    const campaigns = result.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      target: formatEther(campaign.target.toString()),
      deadline: Number(campaign.deadline),
      amountCollected: formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));

    console.log(campaigns)

    return campaigns;
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    const allCampaigns = await getCampaigns();
    return allCampaigns.filter(campaign => campaign.owner === address);
  };

  const donate = async (pId: number, amount: string): Promise<void> => {
    if (!walletClient) throw new Error('Wallet not connected');

    await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: 'donateToCampaign',
      args: [pId],
      value: parseEther(amount),
      chain: anvil,
      account: address as unknown as Account
    });
  };

  const getDonations = async (pId: number): Promise<Donation[]> => {
    const [donators, donations] = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: 'getDonators',
      args: [pId],
    }) as [string[], bigint[]];

    return donators.map((donator, i) => ({
      donator,
      donation: formatEther(donations[i]),
    }));
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }
  return context;
};
