const TRANSACTION_APIS = {
  Bitpay: 'bitpay',
  Blockcypher: 'blockcypher',
  Blockexplorer: 'blockexplorer',
  Blockstream: 'blockstream',
  Etherscan: 'etherscan',
  Blockexplorerexos: 'blockexplorerexos',
  CertificoExos: 'certificoExos',
  CertificoRuta: 'certificoRuta',
};

const TRANSACTION_ID_PLACEHOLDER = '{transaction_id}';
const TRANSACTIONS_APIS_URLS = {
  [TRANSACTION_APIS.Blockexplorerexos]: {
    mainnet: `https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`,
    testnet: `https://blockexplorer.exos.to/api/exos/transactions/${TRANSACTION_ID_PLACEHOLDER}`
  },
  [TRANSACTION_APIS.CertificoExos]: {
    mainnet:`https://core.certifico.io/exos/api/Node/getrawtransaction?trxid=${TRANSACTION_ID_PLACEHOLDER}&verbose=true`,
    testnet:`https://core.certifico.io/exos/api/Node/getrawtransaction?trxid=${TRANSACTION_ID_PLACEHOLDER}&verbose=true`
  },
  [TRANSACTION_APIS.CertificoRuta]: {
    mainnet:`https://core.certifico.io/ruta/api/Node/getrawtransaction?trxid=${TRANSACTION_ID_PLACEHOLDER}&verbose=true`,
    testnet:`https://core.certifico.io/ruta/api/Node/getrawtransaction?trxid=${TRANSACTION_ID_PLACEHOLDER}&verbose=true`
  }
};

export {
  TRANSACTION_APIS,
  TRANSACTIONS_APIS_URLS,
  TRANSACTION_ID_PLACEHOLDER
};
