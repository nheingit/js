import type { Chain } from "../src/types";
export default {
  "name": "Gnosis",
  "chain": "GNO",
  "icon": {
    "url": "ipfs://bafybeidk4swpgdyqmpz6shd5onvpaujvwiwthrhypufnwr6xh3dausz2dm",
    "width": 1800,
    "height": 1800,
    "format": "png"
  },
  "rpc": [
    "https://gnosis.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.gnosischain.com",
    "https://rpc.gnosis.gateway.fm",
    "https://rpc.ankr.com/gnosis",
    "https://gnosischain-rpc.gateway.pokt.network",
    "https://gnosis-mainnet.public.blastapi.io",
    "https://gnosis.api.onfinality.io/public",
    "https://gnosis.blockpi.network/v1/rpc/public",
    "https://web3endpoints.com/gnosischain-mainnet",
    "https://gnosis.oat.farm",
    "wss://rpc.gnosischain.com/wss"
  ],
  "faucets": [
    "https://gnosisfaucet.com",
    "https://stakely.io/faucet/gnosis-chain-xdai",
    "https://faucet.prussia.dev/xdai"
  ],
  "nativeCurrency": {
    "name": "xDAI",
    "symbol": "XDAI",
    "decimals": 18
  },
  "infoURL": "https://docs.gnosischain.com",
  "shortName": "gno",
  "chainId": 100,
  "networkId": 100,
  "slip44": 700,
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://gnosis.blockscout.com",
      "icon": {
        "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        "width": 551,
        "height": 540,
        "format": "png"
      },
      "standard": "EIP3091"
    },
    {
      "name": "gnosisscan",
      "url": "https://gnosisscan.io",
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "gnosis"
} as const satisfies Chain;