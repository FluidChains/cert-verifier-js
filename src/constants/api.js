const TRANSACTION_APIS = {
  Bitpay: 'bitpay',
  Blockcypher: 'blockcypher',
  Blockexplorer: 'blockexplorer',
  Blockstream: 'blockstream',
  Etherscan: 'etherscan',
  Blockexplorerexos: 'blockexplorerexos'
};

const TRANSACTION_ID_PLACEHOLDER = '{transaction_id}';
const TRANSACTIONS_APIS_URLS = {
  [TRANSACTION_APIS.Blockexplorerexos]: {
    mainnet: `https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`,
    testnet: `https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`
  }
};

export {
  TRANSACTION_APIS,
  TRANSACTIONS_APIS_URLS,
  TRANSACTION_ID_PLACEHOLDER
};
