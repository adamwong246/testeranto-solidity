import { Ibdd_out, ITestSpecification } from "testeranto/src/Types";

import { BaseGiven } from "testeranto/src/lib/abstractBase";

import { I } from "../src";

export type O = Ibdd_out<
  {
    Default: string;
  },
  {
    Default: [string];
  },
  {
    Increment: [number];
    Decrement: [number];
  },
  {
    Get: [{ asTestUser: number; expectation: number }];
  },
  {
    AnEmptyState: [];
  }
>;

export const specifications: ITestSpecification<I, O> = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default(
      "Testing a very simple smart contract ephemerally",
      commonGivens<I>(Given, When, Then),
      [
        Check.AnEmptyState(
          "imperative style",
          [`You can write your tests imperatively`],
          async (s, pm) => {
            await When.Increment(1).whenCB(s);
            await When.Increment(1).whenCB(s);
            await When.Increment(1).whenCB(s);
            await Then.Get({ asTestUser: 1, expectation: 3 }).thenCB(s);
            await When.Increment(1).whenCB(s);
            await Then.Get({ asTestUser: 1, expectation: 4 }).thenCB(s);
          }
        ),
      ]
    ),
  ];
};

export const commonGivens = <
  I
>(
  Given,
  When,
  Then
): Record<string,
  BaseGiven<I>
> => {
  return {
    test0: Given.Default(
      "my first contract",
      [],
      [Then.Get({ asTestUser: 1, expectation: 0 })]
    ),

    test1: Given.Default(
      [`hello`],
      [When.Increment(1), When.Increment(1)],
      [Then.Get({ asTestUser: 1, expectation: 2 })],
      "my first contract"
    ),

    test2: Given.Default(
      [`hello`],
      [
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),
      ],
      [Then.Get({ asTestUser: 1, expectation: 4 })],
      "my first contract"
    ),

    test3: Given.Default(
      [`hello`],
      [
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),
        When.Increment(1),

        When.Decrement(1),
        When.Decrement(1),
        When.Decrement(1),
      ],
      [Then.Get({ asTestUser: 1, expectation: 11 })],
      "my first contract"
    ),
  };
};
