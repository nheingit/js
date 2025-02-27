import type { Chain } from "../src/types";
export default {
  "name": "Ethereum Classic Testnet Mordor",
  "chain": "ETC",
  "rpc": [
    "https://ethereum-classic-testnet-mordor.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.mordor.etccooperative.org"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Mordor Classic Testnet Ether",
    "symbol": "METC",
    "decimals": 18
  },
  "infoURL": "https://github.com/eth-classic/mordor/",
  "shortName": "metc",
  "chainId": 63,
  "networkId": 7,
  "testnet": true,
  "slug": "ethereum-classic-testnet-mordor"
} as const satisfies Chain;