import { TRANSACTION_TEMPLATE_ID_PLACEHOLDER } from '../../../constants/blockchains';

/**
 * getRawTransactionLink
 *
 * Builds and returns the raw transaction link
 *
 * @param transactionId
 * @param chainObject
 * @param getRawVersion
 * @returns {*}
 */
export default function getTransactionLink (transactionId, chainObject, getRawVersion = false, getVanityVersion = false ) {
  if (!transactionId || !chainObject) {
    return '';
  }
  const rawTransactionLinkTemplate = chainObject.transactionTemplates[getVanityVersion ? 'vanity' : getRawVersion ? 'raw' : 'full'];
  return rawTransactionLinkTemplate.replace(TRANSACTION_TEMPLATE_ID_PLACEHOLDER, transactionId);
}
