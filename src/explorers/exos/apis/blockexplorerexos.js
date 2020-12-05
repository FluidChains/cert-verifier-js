import { BLOCKCHAINS, SUB_STEPS } from '../../../constants';
import { TransactionData, VerifierError } from '../../../models';
import { getText } from '../../../domain/i18n/useCases';
import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { dateToUnixTimestamp } from '../../../helpers/date';

export function generateTransactionDataFromBlockexplorerExosResponse (jsonResponse) {
  if (jsonResponse.confirmations < 1) {
    throw new VerifierError(SUB_STEPS.fetchRemoteHash, getText('errors', 'parseBlockstreamResponse'));
  }
  const time = dateToUnixTimestamp(jsonResponse.dateTime);
  const outputs = jsonResponse.outputs;
  var lastOutput = null;
  for (var i = 0, l = outputs.length; i < l; i++) {
    if (outputs[i].scriptPubKey.includes('OP_RETURN')) {
      lastOutput = outputs[i];
    }
  }
  const issuingAddress = jsonResponse.inputs[0].address;
  const opReturnScript = stripHashPrefix(lastOutput.scriptPubKey, BLOCKCHAINS.bitcoin.prefixes);
  const revokedAddresses = outputs
    .filter(output => !!output.address)
    .map(output => output.address);
  return new TransactionData(
      opReturnScript,
      issuingAddress,
      time,
      revokedAddresses
    );
}
