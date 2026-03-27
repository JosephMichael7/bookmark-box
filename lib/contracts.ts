export const bookmarkBoxAbi = [
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "add",
    inputs: [{ name: "url", type: "string", internalType: "string" }],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "get",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
  },
] as const;

export const bookmarkBoxAddress = "0xfc51f72223d20bb8691314b582c1bc37e829c147" as const;

