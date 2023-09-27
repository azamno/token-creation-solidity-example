// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./Token.sol";

/**
 * @title TokenFactory
 * @author Azam Nozari
 * @notice A contract for deploying and interacting with ERC20Token contracts.
 */

contract TokenFactory {
    ERC20Token[] public contractAddresses;
    event NewContract(address indexed newContractAddress);

    /**
     * @notice Deploys a new ERC20Token contract with the specified parameters.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param decimals_ The number of decimals for the token.
     * @param totalsupply_ The total supply of the token.
     */
    function deployContract(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalsupply_
    ) public {
        ERC20Token newContract = new ERC20Token(
            name_,
            symbol_,
            decimals_,
            totalsupply_,
            msg.sender
        );
        contractAddresses.push(newContract);
        emit NewContract(address(newContract));
    }

    /**
     * @notice Retrieves the name, symbol, decimals, and total supply of a deployed ERC20Token contract.
     * @param contractAddress The address of the ERC20Token contract.
     * @return The name, symbol, decimals, and total supply of the ERC20Token contract.
     */
    function callMultipleFunctions(address contractAddress)
        public
        view
        returns (
            string memory,
            string memory,
            uint8,
            uint256
        )
    {
        ERC20Token contractInstance = ERC20Token(contractAddress);
        string memory name = contractInstance.name();
        string memory symbol = contractInstance.symbol();
        uint8 decimals = contractInstance.decimals();
        uint256 totalSupply = contractInstance.totalSupply();
        return (name, symbol, decimals, totalSupply);
    }

    /**
     * @notice Retrieves the ERC20Token contract at the specified index in the contractAddresses array.
     * @param id The index of the contract in the contractAddresses array.
     * @return The ERC20Token contract at the specified index.
     */
    function getContractAddress(uint256 id) external view returns (ERC20Token) {
        return contractAddresses[id];
    }

    /**
     * @notice Retrieves the length of the contractAddresses array.
     * @return The length of the contractAddresses array.
     */
    function getLengthContractAddresses() external view returns (uint256) {
        return contractAddresses.length;
    }
}
