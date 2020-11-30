import { BLOCKCHAINS, SUB_STEPS } from '../../../constants';
import { TransactionData, VerifierError } from '../../../models';
import { getText } from '../../../domain/i18n/useCases';
import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { dateToUnixTimestamp } from '../../../helpers/date';

export function generateTransactionDataFromCertificoRutaResponse (jsonResponse) {
  if (jsonResponse.confirmations < 1) {
    throw new VerifierError(SUB_STEPS.fetchRemoteHash, getText('errors', 'parseBlockstreamResponse'));
  }
  const time = dateToUnixTimestamp(jsonResponse.time);
  const outputs = jsonResponse.vout;
  var lastOutput = null;
  for (var i = 0, l = outputs.length; i < l; i++) {
    if (outputs[i].scriptPubKey.asm.includes('OP_RETURN')) {
      lastOutput = outputs[i];
    }
  }
//   const issuingAddress = jsonResponse.vin[0].address;
  const issuingAddress = 'null';
  const opReturnScript = stripHashPrefix(lastOutput.scriptPubKey, BLOCKCHAINS.bitcoin.prefixes);
  const revokedAddresses = vout
    .filter(output => !!output.scriptPubKey.addresses[0])
    .map(output => output.scriptPubKey.addresses[0]);
  return new TransactionData(
    opReturnScript,
    issuingAddress,
    time,
    revokedAddresses
  );
}