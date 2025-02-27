import type { Chain } from "../src/types";
export default {
  "name": "Worldland Testnet",
  "chain": "Worldland",
  "rpc": [
    "https://worldland-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://gwangju.worldland.foundation"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Worldland",
    "symbol": "WL",
    "decimals": 18
  },
  "infoURL": "https://worldland.foundation",
  "shortName": "TWLC",
  "chainId": 10395,
  "networkId": 10395,
  "explorers": [
    {
      "name": "Worldland Explorer",
      "url": "https://testscan.worldland.foundation",
      "standard": "EIP3091"
    }
  ],
  "testnet": true,
  "slug": "worldland-testnet"
} as const satisfies Chain;