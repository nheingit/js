import type { Chain } from "../src/types";
export default {
  "name": "Mode Testnet ",
  "chain": "ModeTest",
  "shortName": "ModeTest",
  "chainId": 919,
  "testnet": true,
  "rpc": [
    "https://mode-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://sepolia.mode.network/"
  ],
  "explorers": [
    {
      "name": "mode-sepolia-vtnhnpim72",
      "url": "https://sepolia.explorer.mode.network/",
      "standard": "EIP3091"
    }
  ],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "icon": {
    "height": 2160,
    "width": 2160,
    "format": "png",
    "url": "ipfs://bafkreidi5y7afj5z4xrz7uz5rkg2mcsv2p2n4ui4g7q4k4ecdz65i2agou"
  },
  "slug": "mode-testnet"
} as const satisfies Chain;