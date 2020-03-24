import { BLOCKCHAINS } from '../../../constants/blockchains';
import addresses from '../../addresses';
import { getText } from '../../i18n/useCases';
import { capitalize } from '../../../helpers/string';

// merkleRoot2019: see https://w3c-dvcg.github.io/lds-merkle-proof-2019/#blockchain-keymap
function getMerkleRoot2019Chain (anchor) {
  const supportedChainsMap = {
    btc: {
      chainName: BLOCKCHAINS.bitcoin.name
    },
    eth: {
      chainName: BLOCKCHAINS.ethmain.name
    },
    exos: {
      chainName: BLOCKCHAINS.exos.name
    }
  };
  const dataArray = anchor.split(':');
  const chainIndex = dataArray.findIndex(data => Object.keys(supportedChainsMap).indexOf(data) > -1);
  if (chainIndex > -1) {
    const chainCode = dataArray[chainIndex];
    const network = dataArray[chainIndex + 1];
    const chainCodeSignatureValue = supportedChainsMap[chainCode].chainName.toLowerCase() + capitalize(network);
    return getChainObject(chainCodeSignatureValue);
  } else {
    return defaultChainAssumption();
  }
}

function defaultChainAssumption (address = '') {
  return addresses.isMainnet(address) ? BLOCKCHAINS.exos : BLOCKCHAINS.testnet;
}

function getChainObject (chainCodeSignatureValue) {
  const chainObject = Object.entries(BLOCKCHAINS).find(entry => entry[1].signatureValue === chainCodeSignatureValue);
  if (typeof chainObject === 'undefined') {
    throw new Error(getText('errors', 'getChain'));
  }
  return chainObject[1];
}

/**
 * getChain
 *
 * Returns a chain object by looking at the signature value or the bitcoin address (legacy)
 *
 * @param signature
 * @param address
 * @returns {*}
 */
export default function getChain (address, signature = null) {
  const cleanedSignature = signature || {};
  if (cleanedSignature.anchors) {
    const anchors = cleanedSignature.anchors;
    const anchor = anchors[0];
    if (anchor.chain) {
      const chainCodeSignatureValue = anchor.chain;
      return getChainObject(chainCodeSignatureValue);
    } else if (typeof anchor === 'string') {
      return getMerkleRoot2019Chain(anchor);
    }
  }

  // Legacy path: we didn't support anything other than testnet and mainnet, so we check the address prefix
  // otherwise try to determine the chain from a bitcoin address
  return defaultChainAssumption(address);
}
