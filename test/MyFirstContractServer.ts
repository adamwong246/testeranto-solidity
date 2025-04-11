/// <reference types="../index.d.ts" />

import { ethers } from "ethers";
import Ganache from "ganache";
import Web3 from "web3";

import MyFirstContract from "./MyFirstContract.sol";

const server = (portString: string) => {
  const port = Number.parseInt(portString);

  const contract = MyFirstContract.contracts.find(
    (c) => c.contractName === "MyFirstContract"
  ) as { contractName: string; abi: any; bytecode: any };

  const options = {};

  // https://github.com/trufflesuite/ganache#programmatic-use
  const server = Ganache.server(options);

  return new Promise((res, rej) => {
    // start the ganache chain
    server.listen(port, async (err) => {
      console.log("ganache running on", port);
      if (err) throw err;

      const providerFarSide = server.provider;
      const accounts = await providerFarSide.request({
        method: "eth_accounts",
        params: [],
      });

      /* @ts-ignore:next-line */
      const web3NearSide = new Web3(providerFarSide);

      // deploy the contract under accounts[0]
      const contractNearSide = await new web3NearSide.eth.Contract(contract.abi)
        .deploy({ data: contract.bytecode.bytes })
        // .wait(1)
        .send({ from: accounts[0], gas: 7000000 });

      // await contractNearSide.waitForDeployment(1);

      // /////////////////////////////////////////////

      const web3FarSideProvider = new ethers.providers.JsonRpcProvider(
        `http://localhost:${port}`
      );
      res(providerFarSide.getInitialAccounts()[accounts[1]].secretKey);
      // web3FarSideProvider.
      // create a test wallet from a ganache account
      // const web3FarSideSigner = new ethers.Wallet(
      //   providerFarSide.getInitialAccounts()[accounts[1]].secretKey,
      //   web3FarSideProvider
      // );

      // // create a contract that our test user can access
      // const contractFarSide = new ethers.Contract(
      //   contractNearSide.options.address,
      //   contract.abi,
      //   web3FarSideSigner
      // );

      // // console.log("server", server);
      // // server.
      // res({
      //   contractNearSide,
      //   contractFarSide,
      //   accounts,
      //   server,
      // });
    });
    server.on("close", (data) => {
      // no-op
    });
  });
};

server("3333")
