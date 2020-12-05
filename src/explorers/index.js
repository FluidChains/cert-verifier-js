import { getEtherScanFetcher } from './ethereum';
import { getExosTransactionFromApi } from './exos/exos-explorer';
import { getRutanioTransactionFromApi } from './rutanio/rutanio-explorer';

import { TRANSACTION_APIS } from '../constants';

const RutanioExplorers = [
  (transactionId, chain) => getRutanioTransactionFromApi(TRANSACTION_APIS.CertificoRuta, transactionId, chain),
];

const ExosExplorers = [
  (transactionId, chain) => getExosTransactionFromApi(TRANSACTION_APIS.CertificoExos, transactionId, chain),
  (transactionId, chain) => getExosTransactionFromApi(TRANSACTION_APIS.BlockexplorerExos, transactionId, chain),
];

const BitcoinExplorers = [
];

const EthereumExplorers = [
];

// for legacy (pre-v2) Blockcerts
const BlockchainExplorersWithSpentOutputInfo = [
];

export { RutanioExplorers, ExosExplorers, BitcoinExplorers, EthereumExplorers, BlockchainExplorersWithSpentOutputInfo };
