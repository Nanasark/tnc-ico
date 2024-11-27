export const ICOABI = [
  {
    inputs: [
<<<<<<< HEAD
      { internalType: "address", name: "_tokenAddress", type: "address" },
=======
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
<<<<<<< HEAD
      { internalType: "uint256", name: "_tokenAmount", type: "uint256" },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gettokenDetails",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "supply", type: "uint256" },
      { internalType: "uint256", name: "toknePrice", type: "uint256" },
      { internalType: "address", name: "tokenAddr", type: "address" },
=======
      {
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "addBackendWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "backendWallets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
<<<<<<< HEAD
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "soldTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenSalePrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
=======
    name: "getContractTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "outToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "updateToken",
=======
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
    ],
    name: "removeBackendWallet",
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      { internalType: "uint256", name: "_tokenSalePrice", type: "uint256" },
    ],
    name: "updateTokenSalePrice",
=======
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "send",
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [],
    name: "withdrawAllTokens",
=======
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
>>>>>>> 512ce5079221205a7b3d65ee41868fec2a99da73
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
