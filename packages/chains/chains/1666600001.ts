import type { Chain } from "../src/types";
export default {
  "name": "Harmony Mainnet Shard 1",
  "chain": "Harmony",
  "rpc": [
    "https://harmony-shard-1.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://api.s1.t.hmny.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "ONE",
    "symbol": "ONE",
    "decimals": 18
  },
  "infoURL": "https://www.harmony.one/",
  "slip44": 1023,
  "shortName": "hmy-s1",
  "chainId": 1666600001,
  "networkId": 1666600001,
  "explorers": [
    {
      "name": "Harmony Block Explorer",
      "url": "https://explorer.harmony.one/blocks/shard/1",
      "standard": "none"
    }
  ],
  "testnet": false,
  "slug": "harmony-shard-1"
} as const satisfies Chain;