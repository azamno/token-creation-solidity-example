
# Project Name

Token Builder - A platform for creating tokens for executing smart contracts on the blockchain.

## Description

This project is a token creation platform designed for executing smart contracts on the blockchain.

- Remix: The Remix IDE for smart contract development.
- Ganache: A local blockchain development environment.
Install Ganache Desktop by following the official installation guide provided on the Ganache website: [Ganache Desktop Installation Guide](https://www.ganache.com/).
- web3.js: A JavaScript library for interacting with Ethereum.
- Metamask: A browser extension wallet for interacting with Ethereum. If you don't have Metamask installed, you can install it from the official website: [Metamask Official Website](https://metamask.io/).
- npm: The Node.js package manager.


### Installation

```
npm install
npm install web3
```
### Execution
1. Make sure you have Ganache Desktop running and properly configured as your local blockchain development environment.
2. Open the Remix IDE for smart contract development.
3. To copy the "contracts" folder into Remix and navigate to the "TokenFactory.sol.
4. Compile the smart contract by selecting the appropriate compiler version.
5. Deploy the smart contract to your Ganache local blockchain. Make sure to select the correct network and use the appropriate account.
6. If you have installed Metamask, make sure it is properly configured and connected to your local blockchain network.
7. After performing the deployment process, follow the steps below to update the contract address and ABI in the "metamaskAccount.js" file located in the "js" folder:
   - Locate the "metamaskAccount.js" file in the "js" folder of your project.
   - Open the file for editing.
   - Find the variables named "contractAddress" and "contractABI".
   - Replace the existing values of these variables with the deployed contract's address and ABI, respectively.
   - Save the changes made to the "metamaskAccount.js" file.

    By following these steps, you can update the contract address and ABI in the "metamaskAccount.js" file, which is located in the "js" folder, after completing the deployment process. 
8. To delete and save new images in the LocalStorage whenever needed, follow these steps::
   - To access the "utilities.js" file in the "js" folder, simply navigate to the "js" folder and open the "utilities.js" file. 
   - Open the file for editing. 
   - Uncomment the line localStorage.clear(); by removing the comment characters (//) in front of it.
   - Save the changes made to the "utilities.js" file.
   - Refresh the website to trigger the LocalStorage clearance and image storage process.
   - After the necessary changes are made, comment out the line localStorage.clear(); again by adding the comment characters (//) in front of it.
   - Save the changes made to the "utilities.js" file.
  ## Images
  ![1](https://github.com/azamno/token-creation-solidity-example/assets/90998399/6ed79155-8a29-43be-944e-eac5bc7b90b8)
![2](https://github.com/azamno/token-creation-solidity-example/assets/90998399/10e18d12-76a7-4530-a902-ad1da28bda94)
![3](https://github.com/azamno/token-creation-solidity-example/assets/90998399/5fa1ed8c-3efd-4444-8beb-68ad8c1a97b3)
![4](https://github.com/azamno/token-creation-solidity-example/assets/90998399/25b3546c-3e15-4ecb-ab85-cdbd9f0e5eb6)
