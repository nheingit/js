import type { WalletOptions, WalletConfig } from "@thirdweb-dev/react-core";
import {
  MetaMaskWallet,
  getInjectedMetamaskProvider,
} from "@thirdweb-dev/wallets";
import { MetamaskConnectUI } from "./MetamaskConnectUI";

type MetamaskWalletOptions = {
  /**
   * When connecting MetaMask using the QR Code - Wallet Connect connector is used which requires a project id.
   * This project id is Your project’s unique identifier for wallet connect that can be obtained at cloud.walletconnect.com.
   *
   * https://docs.walletconnect.com/2.0/web3modal/options#projectid-required
   */
  projectId?: string;
};

export const metamaskWallet = (
  options?: MetamaskWalletOptions,
): WalletConfig<MetaMaskWallet> => {
  return {
    id: MetaMaskWallet.id,
    meta: MetaMaskWallet.meta,
    create: (walletOptions: WalletOptions) => {
      const wallet = new MetaMaskWallet({
        ...walletOptions,
        projectId: options?.projectId,
        qrcode: false,
      });

      return wallet;
    },
    connectUI: MetamaskConnectUI,
    isInstalled() {
      return !!getInjectedMetamaskProvider();
    },
  };
};
