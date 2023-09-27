// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC20Metadata.sol";
import "./Context.sol";

/**
 * @notice Implementation of the ERC20Token contract.
 * Inherits from Context, IERC20, and IERC20Metadata.
 */

contract ERC20Token is Context, IERC20, IERC20Metadata {

    /// @notice Maps an address to the balance of tokens in the account.
    mapping(address => uint256) public _balances;

    /// @notice Maps an address to a mapping of addresses to the amount of transferable tokens.
    mapping(address => mapping(address => uint256)) private _allowances;

    /// @notice Total supply of tokens in the system.
    uint256 public _totalSupply;

    /// @notice Number of decimals used for the tokens.
    uint8 public _decimals;

    /// @notice Name of the token.
    string public _name;

    /// @notice Symbol of the token.
    string public _symbol;

    /**
     * @notice Constructs a new ERC20Token instance.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param decimals_ The number of decimals used for the token.
     * @param totalsupply_ The total supply of tokens for the token.
     * @param deployer The address of the deployer of the contract.
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalsupply_,
        address deployer
    ) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = totalsupply_;
        _balances[deployer] = _totalSupply;
    }

    /**
     * @notice Retrieves the value of the name variable.
     * @return The value of the _name variable as a string.
     */
    function name() public view override returns (string memory) {
        return _name;
    }

    /**
     * @notice Returns the symbol of the token.
     * @return The symbol of the token as a string.
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     * @notice Returns the number of decimals used for the token.
     * @return The number of decimals as a uint8.
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Returns the total supply of tokens.
     * @return The total supply of tokens as a uint256.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @notice Returns the balance of tokens for a specific account.
     * @param account The address of the account to check the balance for.
     * @return The balance of tokens for the specified account as a uint256.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    /**
     * @notice Transfers a specified amount of tokens from the caller's account to the recipient's account.
     * @param to The address of the recipient.
     * @param amount The amount of tokens to transfer.
     * @return A boolean value indicating whether the transfer was successful.
     */
    function transfer(address to, uint256 amount)
        public
        override
        returns (bool)
    {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    /**
     * @notice Returns the allowance for a spender from an owner's account.
     * @param owner The address of the owner.
     * @param spender The address of the spender.
     * @return The allowance amount as a uint256.
     */
    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    /**
     * @notice Approves the specified amount of tokens to be spent by a spender.
     * @param spender The address of the spender.
     * @param amount The amount of tokens to be approved.
     * @return A boolean value indicating whether the approval was successful.
     */
    function approve(address spender, uint256 amount)
        public
        override
        returns (bool)
    {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    /**
     * @notice Transfers the specified amount of tokens from the `from` address to the `to` address.
     * The caller must have an allowance for `from`'s tokens.
     * @param from The address from which the tokens are transferred.
     * @param to The address to which the tokens are transferred.
     * @param amount The amount of tokens to transfer.
     * @return A boolean value indicating whether the transfer was successful.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @notice Increases the allowance for a spender by the specified added value.
     * This allows the spender to spend more tokens on behalf of the owner.
     * @param spender The address of the spender.
     * @param addedValue The amount by which to increase the allowance.
     * @return A boolean value indicating whether the increase in allowance was successful.
     */
    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        returns (bool)
    {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @notice Decreases the allowance for a spender by the specified subtracted value.
     * This reduces the spender's ability to spend tokens on behalf of the owner.
     * @param spender The address of the spender.
     * @param subtractedValue The amount by which to decrease the allowance.
     * @return A boolean value indicating whether the decrease in allowance was successful.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        returns (bool)
    {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @notice Internal function that transfers a specified amount of tokens from one address to another.
     * @param from The address from which tokens are transferred.
     * @param to The address to which tokens are transferred.
     * @param amount The amount of tokens to transfer.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        _update(from, to, amount);
    }

    /**
     * @notice Internal function that updates the token balances and total supply after a transfer.
     * @param from The address from which tokens are transferred.
     * @param to The address to which tokens are transferred.
     * @param amount The amount of tokens being transferred.
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        if (from == address(0)) {
            _totalSupply += amount;
        } else {
            uint256 fromBalance = _balances[from];
            require(
                fromBalance >= amount,
                "ERC20: transfer amount exceeds balance"
            );
            unchecked {
                // Underflow not possible: amount <= fromBalance <= totalSupply.
                _balances[from] = fromBalance - amount;
            }
        }

        if (to == address(0)) {
            unchecked {
                // Underflow not possible: amount <= totalSupply or amount <= fromBalance <= totalSupply.
                _totalSupply -= amount;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + amount is at most totalSupply, which we know fits into a uint256.
                _balances[to] += amount;
            }
        }

        emit Transfer(from, to, amount);
    }

    /**
     * @notice Internal function that mints a specified amount of tokens and assigns them to an account.
     * @param account The address to which tokens are minted and assigned.
     * @param amount The amount of tokens to mint and assign.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");
        _update(address(0), account, amount);
    }

    /**
     * @notice Internal function that burns a specified amount of tokens from an account.
     * @param account The address from which tokens are burned.
     * @param amount The amount of tokens to burn.
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");
        _update(account, address(0), amount);
    }

    /**
     * @notice Internal function that approves a specified amount of tokens to be spent by a spender on behalf of an owner.
     * @param owner The address that owns the tokens.
     * @param spender The address that is approved to spend the tokens.
     * @param amount The amount of tokens to be approved.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @notice Internal function that spends a specified amount of tokens from the allowance of an owner by a spender.
     * @param owner The address that owns the tokens.
     * @param spender The address that spends the tokens.
     * @param amount The amount of tokens to spend.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }
}
