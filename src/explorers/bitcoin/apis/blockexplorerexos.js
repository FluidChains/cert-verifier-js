import { BLOCKCHAINS, SUB_STEPS } from '../../../constants';
import { TransactionData, VerifierError } from '../../../models';
import { getText } from '../../../domain/i18n/useCases';
import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { timestampToDateObject } from '../../../helpers/date';

export function generateTransactionDataFromBlockexplorerexosResponse (jsonResponse) {
  if (jsonResponse.confirmations < 1) {
    throw new VerifierError(SUB_STEPS.fetchRemoteHash, getText('errors', 'parseBlockstreamResponse'));
  }
  const time = timestampToDateObject(jsonResponse.timestamp);
  const outputs = jsonResponse.outputs;
  var lastOutput = null;
  for (var i = 0, l = outputs.length; i < l; i++) {
    if (outputs[i].asm.includes('OP_RETURN')) {
      lastOutput = outputs[i];
    }
  }
  const issuingAddress = jsonResponse.outputs[0].address;
  const opReturnScript = stripHashPrefix(lastOutput.asm, BLOCKCHAINS.bitcoin.prefixes);
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
