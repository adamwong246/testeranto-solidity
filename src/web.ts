import Testeranto from "testeranto/src/Web";

import { ITestImplementation, ITestSpecification, OT } from "testeranto/src/Types";

import { I, IInput } from ".";
import { testInterfacer } from "./ganacheServerInterface";

export default <O extends OT>(
  testInput: IInput,
  testSpecifications: ITestSpecification<I, O>,
  testImplementations:  ITestImplementation<
  I,
  O
>
) =>
  Testeranto(
    testInput,
    testSpecifications,
    testImplementations,
    testInterfacer(testInput)
  );
