// this can be used to test a solidity contract on a ganache network
// it can only be used on `node`, not `pure` nor `web`.

import Ganache, { ServerOptions } from "ganache";
import Web3 from "web3";

import { IPartialNodeInterface } from "testeranto/src/Types";
import { I } from ".";

export type IInput = [
  { contractName: string; abi: any | any[] },

];

export const testInterfacer: (testInput: IInput) => IPartialNodeInterface<I> = (testInput) => {

  let logHandle;

  return {beforeAll: async () => testInput,

    beforeEach: async (contract, it, tr, iv, util) => {

    logHandle = await util.createWriteStream("ganache.log");

    const options: ServerOptions = {
      logging: {
        logger: {
          log: (message: string) => {
            util.write(logHandle, message);
          },
        },
      },
    };

    // https://github.com/trufflesuite/ganache#programmatic-use
    const provider = Ganache.provider(options);

    /* @ts-ignore:next-line */
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const argz = []; //await testInput[1](web3);

    const size =
      Buffer.byteLength(contract.deployedBytecode.bytes, "utf8") / 2;

    return {
      contract: await new web3.eth.Contract(contract.abi)
        .deploy({
          data: contract.bytecode.bytes,
          arguments: argz,
        })
        .send({ from: accounts[0], gas: 7000000 }),
      accounts,
      provider,
    };
    },
  
  afterEach(store, key, pm) {
    pm.end(logHandle);
    return store
    },
  
  andWhen: async ({ provider, contract, accounts }, callback: any) =>
    callback({ contract, accounts }),}
};