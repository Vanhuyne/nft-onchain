import { readContract, writeContract } from '@wagmi/core';
import { parseUnits, formatUnits } from 'viem';
import { config } from '../config/config';

// Complete contract ABI based on your provided ABI
export const tokenAbi = [
  {"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},
  {"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},
  {"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},
  {"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},
  {"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},
  {"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
  {"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}
] as const;

// Your contract address - replace with your actual token address
export const tokenAddress = '0x749734bd9c1760ca0aeC8962ac4e184496e1BC25'; // Example: DAI token address

// Function to get token name
export async function getTokenName() {
  return readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'name',
  });
}

// Function to get token symbol
export async function getTokenSymbol() {
  return readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'symbol',
  });
}

// Function to get token decimals
export async function getTokenDecimals() {
  return readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'decimals',
  });
}

export async function transferTokens(
  recipient: `0x${string}`, 
  amount: string
) {
  // Get decimals to correctly parse the amount
  const decimals = await getTokenDecimals();
  
  // Convert the amount to the correct format with decimals
  const amountInWei = parseUnits(amount, decimals);
  
  // Execute the transfer
  const hash = await writeContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transfer',
    args: [recipient, amountInWei],
  });
  
  return hash;
}

export async function approveTokens(
  spender: `0x${string}`, 
  amount: string
) {
  const decimals = await getTokenDecimals();
  const amountInWei = parseUnits(amount, decimals);
  
  const hash = await writeContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'approve',
    args: [spender, amountInWei],
  });
  
  return hash;
}

// Function to get total supply
export async function getTotalSupply() {
  const totalSupplyBigInt = await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'totalSupply',
  });
  
  // Get decimals to format the total supply
  const decimals = await getTokenDecimals();
  
  // Return both raw and formatted values
  return {
    raw: totalSupplyBigInt,
    formatted: formatUnits(totalSupplyBigInt, decimals)
  };
}

// Function to get account balance
export async function getTokenBalance(accountAddress: `0x${string}`) {
  const balanceBigInt = await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [accountAddress],
  });
  
  // Get decimals to format the balance
  const decimals = await getTokenDecimals();
  
  // Return both raw and formatted values
  return {
    raw: balanceBigInt,
    formatted: formatUnits(balanceBigInt, decimals)
  };
}

// Function to get max supply
export async function getMaxSupply() {
  const maxSupplyBigInt = await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'MAX_SUPPLY',
  });
  
  // Get decimals to format the max supply
  const decimals = await getTokenDecimals();
  
  // Return both raw and formatted values
  return {
    raw: maxSupplyBigInt,
    formatted: formatUnits(maxSupplyBigInt, decimals)
  };
}

// Function to get owner
export async function getOwner() {
  return readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'owner',
  });
}

// Function to get allowance
export async function getAllowance(ownerAddress: `0x${string}`, spenderAddress: `0x${string}`) {
  const allowanceBigInt = await readContract(config, {
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'allowance',
    args: [ownerAddress, spenderAddress],
  });
  
  // Get decimals to format the allowance
  const decimals = await getTokenDecimals();
  
  // Return both raw and formatted values
  return {
    raw: allowanceBigInt,
    formatted: formatUnits(allowanceBigInt, decimals)
  };
}

// --- WRITE FUNCTIONS ---

