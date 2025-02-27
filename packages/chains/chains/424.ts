import type { Chain } from "../src/types";
export default {
  "name": "PGN (Public Goods Network)",
  "chain": "ETH",
  "rpc": [
    "https://pgn-public-goods-network.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.publicgoods.network"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [
    {
      "name": "EIP155"
    },
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://publicgoods.network/",
  "shortName": "PGN",
  "chainId": 424,
  "networkId": 424,
  "icon": {
    "url": "ipfs://QmUVJ7MLCEAfq3pHVPFLscqRMiyAY5biVgTkeDQCmAhHNS",
    "width": 574,
    "height": 574,
    "format": "svg"
  },
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://explorer.publicgoods.network",
      "icon": {
        "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        "width": 551,
        "height": 540,
        "format": "png"
      },
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://bridge.publicgoods.network"
      }
    ]
  },
  "testnet": false,
  "slug": "pgn-public-goods-network"
} as const satisfies Chain;