import { installedMetamask, myContract, web3, getAccount } from "./metamaskAccount.js";
import { setAccount } from "./utilities.js";
import { showLoading, hideLoading, createTable } from "./utilities.js";


/**
 * Retrieves the 'connect-wallet-button' element from the HTML document.
 * This element is used for connecting the wallet.
 */
let connectWalletButton = document.getElementById('connect-wallet-button');

/**
 * Retrieves the 'metamask-wallet' element from the HTML document.
 * This element is used for interacting with the MetaMask wallet.
 */
let metamaskWallet = document.getElementById('metamask-wallet');

/**
 * Adds a click event listener to the 'connectWalletButton' element.
 * This listener executes an async function when the button is clicked.
 */
connectWalletButton.addEventListener("click", async () => {
    if (installedMetamask()) {
        metamaskWallet.classList.remove("fs-2");
        metamaskWallet.classList.add("fs-5");
        setAccount(metamaskWallet);
    }
    else {
        let myModal = new bootstrap.Modal(document.getElementById('install-metamask-modal'), {
            backdrop: 'static'
        });
        myModal.show();
    }
});

/**
 * Listens for the "accountsChanged" event emitted by the Ethereum provider.
 * When the event is triggered, it executes a callback function that calls the 'setAccount' function with the 'metamaskWallet' element.
 */
ethereum.on('accountsChanged', () => { setAccount(metamaskWallet) });

/**
 * Retrieves the button element with the id "create-token-page".
 * If the button exists, it adds an event listener to it.
 * When the button is clicked, it opens a new browser window/tab with the URL "create.html".
 */
const createTokenButton = document.getElementById('create-token-page');
if (createTokenButton) {
    console.log("test")
    createTokenButton.addEventListener('click', () => {
        window.open('create.html', '_blank');
    });
}

/**
 * Retrieves the button element with the id "view-tokens-page".
 * If the button exists, it adds an event listener to it.
 * When the button is clicked, it opens a new browser window/tab with the URL "view.html".
 */
const viewTokensButton = document.getElementById('view-tokens-page');
if (viewTokensButton) {
    viewTokensButton.addEventListener('click', () => {
        window.open('view.html', '_blank');

    });
}

/**
 * Sets up an `onload` event handler for the window.
 * When the window finishes loading, the function specified will be executed.
 * In this case, the function focuses on an input element with the id "tokenNameInput".
 */
window.onload = function () {
    let inputElement = document.getElementById("tokenNameInput");
    if (inputElement) {
        inputElement.focus();
    }
};


let createTokenBtn = document.getElementById('tokenCreationButton');
if (createTokenBtn) {
    createTokenBtn.addEventListener("click", async (event) => {
        let flagLoading = true;
        let status;
        let name = document.getElementById("tokenNameInput").value;
        let symbol = document.getElementById("tokenSymbolInput").value;
        let decimals = document.getElementById("tokenDecimalsInput").value;
        let totalsupply = document.getElementById("totalTokensInput").value.replaceAll(',', '');

        if (flagLoading) {
            await showLoading();
            status = await sendDeployContract(name, symbol, decimals, totalsupply);
            console.log("status :", status);
            console.log("name :", name);
            console.log("symbol :", symbol);
            console.log("decimals :", decimals);
            console.log("totalsupply :", totalsupply);
        }
        if (status) {
            flagLoading = false;
            document.getElementById("tokenNameInput").value = "";
            document.getElementById("tokenSymbolInput").value = "";
            document.getElementById("totalTokensInput").value = "";
            document.getElementById("tokenDecimalsInput").value = "";
            hideLoading();
        }
        document.getElementById('tokenNameInput').focus();
    });

}

const sendDeployContract = async (_name, _symbol, _decimals, _totalsupply) => {
    let account = await getAccount();
    let status;

    try {
        const transaction = myContract.methods.deployContract(_name, _symbol, _decimals, _totalsupply).send({
            from: account
        });

        transaction.once('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);
        });

        transaction.once('receipt', (receipt) => {
            console.log('Transaction receipt:', receipt);
        });

        transaction.once('confirmation', (confirmationNumber, receipt) => {
            console.log('Transaction confirmation:', confirmationNumber, receipt);
        });

        transaction.once('error', (error) => {
            console.log('Transaction error:', error);
        });

        const receipt = await transaction;
        console.log("Transaction receipt:", receipt);

        // Assuming the NewContract event is in the logs of the transaction receipt
        const newContractEvent = receipt.events.NewContract;
        let address = newContractEvent.returnValues.newContractAddress;
        console.log('New contract address:', address);

        status = receipt.status;
        console.log("status....", status);
        console.log("enter");
    } catch (err) {
        console.log("Error:", err);
    }
    return status;
}

/**

@dev Retrieves the contract address of an ERC20 token based on its ID.
@param id The ID of the token contract.
@return The contract address of the token.
*/
const callContractAddress = async (id) => {
    let address = await myContract.methods.getContractAddress(id).call();
    return address;
}

/**
@dev Retrieves the length of the contractAddresses array, which represents the number of deployed ERC20 token contracts.
@return The length of the contractAddresses array.
*/
const callLengthContractAddresses = async () => {
    let length = await myContract.methods.getLengthContractAddresses().call();
    console.log("length", length)
    return length;
}

/**
@dev Creates a table on the page displaying information about deployed contracts.
*/
const createTableInPage = async () => {
    console.log("Hi..")
    let length = await callLengthContractAddresses();
    console.log("length", length)
    let address;
    for (let i = 0; i < length; i++) {
        address = await callContractAddress(i);
        let result = await myContract.methods.callMultipleFunctions(address).call();
        const name = result[0];
        const symbol = result[1];
        const decimals = result[2];
        const totalSupply = result[3] / 10 ** decimals;
        createTable(name, symbol, totalSupply, decimals, address);
    }
}

// The createTableInPage() function is called to create a table on the page that displays information about deployed contracts.
createTableInPage();

/**
Adds an event listener to the 'totalTokensInput' input field to format the entered number.
The function removes commas and spaces from the input value and formats it with commas for better readability.
*/

const numberInput = document.querySelector('#totalTokensInput');

numberInput.addEventListener('input', function () {
   // Remove commas and spaces from the input value
    const value = this.value.replace(/,/g, '').replace(/\s/g, '');

   // Format the number with commas
    const formatter = new Intl.NumberFormat('en-US');
    const formattedValue = formatter.format(value);

   // Update the input field with the formatted value
    this.value = formattedValue;
});
