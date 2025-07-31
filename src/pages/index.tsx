import { EQuoteSizeDirection } from '@/components/orderBook/types';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()


  const goToTrade = (symbol: string) => {
    router.push(`/trading/${symbol}`);
  }

  return (
    <button onClick={() => goToTrade('BTC_PFC')}>view trade: BTC_PFC</button>
  )
}

const diffres = [
  {
    "price": 118507.1,
    "size": 12750,
    "total": 12750,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118506.9,
    "size": 136100,
    "total": 148850,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118506.8,
    "size": 29800,
    "total": 178650,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118506.6,
    "size": 34750,
    "total": 213400,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118506.4,
    "size": 152050,
    "total": 365450,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118506.3,
    "size": 91700,
    "total": 457150,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118505.6,
    "size": 30400,
    "total": 487550,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118505.4,
    "size": 36100,
    "total": 523650,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118505.1,
    "size": 34400,
    "total": 558050,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118504.9,
    "size": 17115,
    "total": 575165,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118504.6,
    "size": 45850,
    "total": 621015,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118504.2,
    "size": 45950,
    "total": 666965,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118504.1,
    "size": 58500,
    "total": 725465,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118503.7,
    "size": 27700,
    "total": 753165,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118503.6,
    "size": 123500,
    "total": 876665,
    "isNewQuote": false,
    "sizeChange": "UP"
  },
  {
    "price": 118503.2,
    "size": 27850,
    "total": 904515,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118503.1,
    "size": 82700,
    "total": 987215,
    "isNewQuote": false,
    "sizeChange": "UP"
  },
  {
    "price": 118503,
    "size": 65000,
    "total": 1052215,
    "isNewQuote": false,
    "sizeChange": "DOWN"
  },
  {
    "price": 118501.7,
    "size": 82700,
    "total": 1134915,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118501.1,
    "size": 90950,
    "total": 1225865,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118500.8,
    "size": 21250,
    "total": 1247115,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118500.6,
    "size": 28100,
    "total": 1275215,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118500.5,
    "size": 72750,
    "total": 1347965,
    "isNewQuote": false,
    "sizeChange": "DOWN"
  },
  {
    "price": 118499.6,
    "size": 35450,
    "total": 1383415,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118499,
    "size": 42100,
    "total": 1425515,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118498.9,
    "size": 21150,
    "total": 1446665,
    "isNewQuote": false,
    "sizeChange": "DOWN"
  },
  {
    "price": 118498.4,
    "size": 48650,
    "total": 1495315,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118498.1,
    "size": 12750,
    "total": 1508065,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118497.8,
    "size": 55600,
    "total": 1563665,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118497.2,
    "size": 139450,
    "total": 1703115,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118496.6,
    "size": 70200,
    "total": 1773315,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118496.2,
    "size": 84250,
    "total": 1857565,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118495.8,
    "size": 1300,
    "total": 1858865,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118494.7,
    "size": 89400,
    "total": 1948265,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118494.6,
    "size": 97300,
    "total": 2045565,
    "isNewQuote": false,
    "sizeChange": "UP"
  },
  {
    "price": 118494.4,
    "size": 24300,
    "total": 2069865,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118494,
    "size": 103150,
    "total": 2173015,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118493.4,
    "size": 23600,
    "total": 2196615,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118493,
    "size": 32100,
    "total": 2228715,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118492.6,
    "size": 40100,
    "total": 2268815,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118492.3,
    "size": 48650,
    "total": 2317465,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118491.9,
    "size": 55050,
    "total": 2372515,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118491.6,
    "size": 64850,
    "total": 2437365,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118491.2,
    "size": 72950,
    "total": 2510315,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118490.9,
    "size": 79400,
    "total": 2589715,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118490.6,
    "size": 86450,
    "total": 2676165,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118490.1,
    "size": 94350,
    "total": 2770515,
    "isNewQuote": false,
    "sizeChange": null
  },
  {
    "price": 118489.8,
    "size": 104300,
    "total": 2874815,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118489.6,
    "size": 119150,
    "total": 2993965,
    "isNewQuote": true,
    "sizeChange": null
  },
  {
    "price": 118489.4,
    "size": 112350,
    "total": 3106315,
    "isNewQuote": true,
    "sizeChange": null
  }
]

