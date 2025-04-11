import Testeranto from "../src/node";

import { implementations } from "./implementation";
import { input } from "./input";
import { O, specifications } from "./specification";


export default Testeranto<O>(
  input,
  specifications,
  implementations
);
