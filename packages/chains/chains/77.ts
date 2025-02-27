import type { Chain } from "../src/types";
export default {
  "name": "POA Network Sokol",
  "chain": "POA",
  "rpc": [
    "https://poa-network-sokol.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://sokol.poa.network",
    "wss://sokol.poa.network/wss",
    "ws://sokol.poa.network:8546"
  ],
  "faucets": [
    "https://faucet.poa.network"
  ],
  "nativeCurrency": {
    "name": "POA Sokol Ether",
    "symbol": "SPOA",
    "decimals": 18
  },
  "infoURL": "https://poa.network",
  "shortName": "spoa",
  "chainId": 77,
  "networkId": 77,
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://blockscout.com/poa/sokol",
      "icon": {
        "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        "width": 551,
        "height": 540,
        "format": "png"
      },
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "poa-network-sokol"
} as const satisfies Chain;