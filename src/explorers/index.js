import { getEtherScanFetcher } from './ethereum';
import { getBitcoinTransactionFromApi } from './bitcoin/bitcoin-explorer';
import { TRANSACTION_APIS } from '../constants';

const RutanioExplorers = [
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.CertificoRuta, transactionId, chain),
];

const BitcoinExplorers = [
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Blockcypher, transactionId, chain),
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Bitpay, transactionId, chain),
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Blockexplorerexos, transactionId, chain),
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Blockexplorer, transactionId, chain),
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Blockstream, transactionId, chain)
];

const EthereumExplorers = [
  (transactionId, chain) => getEtherScanFetcher(transactionId, chain)
];

// for legacy (pre-v2) Blockcerts
const BlockchainExplorersWithSpentOutputInfo = [
  (transactionId, chain) => getBitcoinTransactionFromApi(TRANSACTION_APIS.Blockcypher, transactionId, chain)
];

export { RutanioExplorers, BitcoinExplorers, EthereumExplorers, BlockchainExplorersWithSpentOutputInfo };
