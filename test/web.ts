import Testeranto from "../src/web";

import { implementations } from "./implementation";
import { input } from "./input";
import { O, specifications } from "./specification";

export default Testeranto<O>(
  input[0],
  specifications,
  implementations
);
