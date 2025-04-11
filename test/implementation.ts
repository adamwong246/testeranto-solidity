/// <reference types="../index.d.ts" />

import { ITestImplementation } from "testeranto/src/Types";

import { assert } from "chai";

import { I } from "../src";

import MyFirstContract from "./MyFirstContract.sol";
import { O } from "./specification";

export const implementations: ITestImplementation<I, O> = {
  suites: {
    Default: "Testing a very simple smart contract",
  },
  givens: {
    Default: (x) => x,
  },
  whens: {
    Increment:
      (asTestUser) =>
      ({ contract, accounts }) => {
        return contract.methods
          .inc()
          .send({ from: accounts[asTestUser] })
          .on("receipt", function (x) {
            return x;
          });
      },
    Decrement:
      (asTestUser) =>
      ({ contract, accounts }) => {
        return contract.methods
          .dec()
          .send({ from: accounts[asTestUser] })
          .on("receipt", function (x) {
            return x;
          });
      },
  },
  thens: {
    Get:
      ({ expectation }) =>
      async ({ contract }) => {
        return assert.equal(
          expectation,
          parseInt(await contract.methods.get().call())
        );
      },
  },
  checks: {
    AnEmptyState: () => MyFirstContract,
  },
};
