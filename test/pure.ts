import Testeranto from "../src/pure";

import { OT } from "testeranto/src/Types";

import { IStoreState } from ".";

import { input, AppSpecification, implementations } from "./test";


export default Testeranto<IStoreState, OT>(
  input,
  AppSpecification,
  implementations
);
