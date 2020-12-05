const TRANSACTION_APIS = {
  BlockexplorerExos: 'blockexplorerExos',
  CertificoExos: 'certificoExos',
  CertificoRuta: 'certificoRuta',
};

const TRANSACTION_ID_PLACEHOLDER = '{transaction_id}';
const TRANSACTIONS_APIS_URLS = {
  [TRANSACTION_APIS.BlockexplorerExos]: {
    mainnet:`https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`,
    testnet:`https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`
  },
  [TRANSACTION_APIS.CertificoExos]: {
    mainnet:`https://core.certifico.io/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
    testnet:`https://core.certifico.io/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`
  },
  [TRANSACTION_APIS.CertificoRuta]: {
    mainnet:`https://core.certifico.io/ruta/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
    testnet:`https://core.certifico.io/ruta/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`
  }
};

export {
  TRANSACTION_APIS,
  TRANSACTIONS_APIS_URLS,
  TRANSACTION_ID_PLACEHOLDER
};
