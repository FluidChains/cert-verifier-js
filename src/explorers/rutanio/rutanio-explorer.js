import { BLOCKCHAINS, SUB_STEPS, TRANSACTION_APIS } from '../../constants';
import { buildTransactionApiUrl } from '../../services/transaction-apis';
import { request } from '../../services/request';
import { VerifierError } from '../../models';
import { getText } from '../../domain/i18n/useCases';
import { generateTransactionDataFromCertificoRutaResponse } from './apis/certifico';

export async function getBitcoinTransactionFromApi (apiName, transactionId, chain) {
  const isTestnet = chain !== BLOCKCHAINS.ruta.code;
  const requestUrl = buildTransactionApiUrl(apiName, transactionId, isTestnet);

  return new Promise((resolve, reject) => {
    return request({ url: requestUrl }).then(response => {
      try {
        const transactionData = getTransactionDataGeneratorPerApi(apiName)(JSON.parse(response));
        resolve(transactionData);
      } catch (err) {
        reject(err.message);
      }
    }).catch(() => {
      reject(new VerifierError(SUB_STEPS.fetchRemoteHash, getText('errors', 'unableToGetRemoteHash')));
    });
  });
}

const API_TRANSACTION_DATA_GENERATORS = {
  [TRANSACTION_APIS.CertificoRuta]: generateTransactionDataFromCertificoRutaResponse,
};

function getTransactionDataGeneratorPerApi (apiName) {
  const transactionDataGenerator = API_TRANSACTION_DATA_GENERATORS[apiName];
  if (!transactionDataGenerator) {
    throw new Error(`API ${apiName} is not listed`);
  }
  return transactionDataGenerator;
}