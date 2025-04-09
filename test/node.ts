import { OT } from "testeranto/src/Types";

import Testeranto from "../src/node";

import { IStoreState } from ".";

import { input, AppSpecification, implementations } from "./test";

export default Testeranto<IStoreState, OT>(
  input,
  AppSpecification,
  implementations
);
