import MyFirstContract from "./MyFirstContract.sol";

export const input = MyFirstContract.contracts.find(
  (c) => c.contractName === "MyFirstContract"
) as { contractName: string; abi: any };