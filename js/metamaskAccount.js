
/**

Checks if MetaMask is installed in the browser.
@returns {boolean} True if MetaMask is installed, false otherwise.
*/
export const installedMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log("Metamask is installed!");
        return true;
    } else {
        console.log("Metamask is not installed!");
        return false;
    }
}

/**
The contract instance representing the deployed ERC20Token contract.
*/
export let myContract;

/**
The Web3 instance connected to the provider provided by the browser.
*/
export let web3 = new Web3(Web3.givenProvider);

/**
The address of the deployed smart contract.
*/
export let contractAddress = "0xb13B6FA320304101ee01b7B3599ae3DA3420bDE3";

/**
The ABI (Application Binary Interface) of the smart contract.
*/
export let contractABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals_",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalsupply_",
				"type": "uint256"
			}
		],
		"name": "deployContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "newContractAddress",
				"type": "address"
			}
		],
		"name": "NewContract",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			}
		],
		"name": "callMultipleFunctions",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contractAddresses",
		"outputs": [
			{
				"internalType": "contract ERC20Token",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getContractAddress",
		"outputs": [
			{
				"internalType": "contract ERC20Token",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLengthContractAddresses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/**
The instance of the smart contract.
*/
myContract = new web3.eth.Contract(contractABI, contractAddress);

/**
Retrieves the currently selected Ethereum account address.
@returns {Promise<string>} The Ethereum account address.
*/
export const getAccount = async () => {
	const accounts = await ethereum.request({
		method: "eth_requestAccounts"
	});
	const account = await accounts[0];
	const checksumAddress =await web3.utils.toChecksumAddress(account);
	return checksumAddress;
}

