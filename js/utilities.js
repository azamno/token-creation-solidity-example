import { getAccount } from "./metamaskAccount.js";


/**
Shortens a string by replacing characters in the middle with ellipsis.
@param {string} str - The input string.
@param {number} startChars - The number of characters to keep from the start of the string.
@param {number} endChars - The number of characters to keep from the end of the string.
@returns {string} The shortened string.
*/
const shortenString = (str, startChars, endChars) => {
  if (str.length <= (startChars + endChars)) {
    return str;
  }
  var start = str.substr(0, startChars);
  var end = str.substr(str.length - endChars);
  return start + "....." + end;
}

/**

Sets the Ethereum account address in the specified text element, shortened for display.
@param {HTMLElement} text - The text element where the account address will be displayed.
*/
export const setAccount = async (text) => {
  text.innerText = shortenString(await getAccount(), 15, 10);
}

/**
 * Retrieves the body element from the document.
 *
 * @returns {HTMLElement} The body element.
 */
let body = document.querySelector('body');

/**
 * Creates a new div element as a cover and appends it to the body.
 * Sets the ID attribute of the cover to 'containerCover'.
 *
 * @type {HTMLDivElement} The cover div element.
 */
let cover = document.createElement('div');
cover.setAttribute("id", 'containerCover');
body.appendChild(cover);

/**
 * Creates a new div element as a spinner and appends it to the cover.
 * Sets the ID attribute of the spinner to 'spinner'.
 *
 * @type {HTMLDivElement} The spinner div element.
 */
let spinner = document.createElement('div');
spinner.setAttribute("id", 'spinner');
cover.appendChild(spinner);

/**
 * Displays the loading spinner by modifying the CSS classes and styles of the cover and spinner elements.
 */
export const showLoading = () => {
  cover.setAttribute('class', 'wrapper');
  spinner.setAttribute('class', 'spinner-border text-primary');
  spinner.setAttribute('role', 'status');
  spinner.style.width = "7rem";
  spinner.style.height = "7rem";
}

/**
 * Hides the loading spinner by modifying the CSS classes of the cover and spinner elements.
 */
export const hideLoading = () => {
  cover.classList.remove('wrapper');
  cover.setAttribute('class', 'none');
  spinner.classList.remove('spinner-border', 'text-primary');
}

/**
 * Creates a table row with token information and adds it to the table.
 * @param {string} _name - The token name.
 * @param {string} _symbol - The token symbol.
 * @param {string} _totalSupply - The token total supply.
 * @param {number} _decimals - The token decimals.
 * @param {string} _contractAddress - The token contract address.
 */
export const createTable = async (_name, _symbol, _totalSupply, _decimals, _contractAddress) => {
  let id = document.querySelectorAll('.table  tbody tr').length + 1;
  let tr = document.createElement("tr");
 document.querySelector(".table  tbody").append(tr);

  let th = document.createElement("th");
  th.setAttribute("scope", 'row');
  th.setAttribute("class", 'align-middle text-start py-3');
  th.innerText = id;
  // x=th.innerText;
  tr.append(th);

  let tdName = document.createElement("td");
  tdName.setAttribute("class", 'align-middle py-3');
  tr.append(tdName);

  let divName = document.createElement("div");
  divName.setAttribute("class", 'd-flex align-items-center justify-content-start');
  tdName.append(divName);

  let imgName = document.createElement("img");
  const url = localStorage.getItem(id);
  if (url) {
    imgName.setAttribute("src", url);
  }
  else {
    imgName.setAttribute("src", "images/Safeimagekit.png");
  }


  imgName.setAttribute("class", 'coin-logo me-2 rounded-circle');
  divName.append(imgName);

  let pName = document.createElement("p");
  pName.setAttribute("class", 'me-2 fs-6 mb-0');
  pName.innerText = _name;
  divName.append(pName);

  let pSymbol = document.createElement("p");
  pSymbol.setAttribute("class", 'mb-0 fs-6 text-secondary');
  pSymbol.innerText = _symbol;
  divName.append(pSymbol);

  // *************
  let tdTotalSupply = document.createElement("td");
  tdTotalSupply.setAttribute("class", 'align-middle py-3');
  tr.append(tdTotalSupply);


  let divTotalSupply = document.createElement("div");
  divTotalSupply.setAttribute("class", 'd-flex align-items-center justify-content-center');
  tdTotalSupply.append(divTotalSupply);

  let pTotalSupply = document.createElement("p");
  pTotalSupply.setAttribute("class", 'me-2 fs-6 mb-0');
  let number = parseInt(_totalSupply);
  pTotalSupply.innerText = number.toLocaleString();
  divTotalSupply.append(pTotalSupply);

  // *************
  let tdDecimals = document.createElement("td");
  tdDecimals.setAttribute("class", 'align-middle py-3');
  tr.append(tdDecimals);

  let divDecimals = document.createElement("div");
  divDecimals.setAttribute("class", 'd-flex align-items-center justify-content-center');
  tdDecimals.append(divDecimals);

  let pDecimals = document.createElement("p");
  pDecimals.setAttribute("class", 'me-2 fs-6 mb-0');
  pDecimals.innerText = _decimals;
  divDecimals.append(pDecimals);

  // *************
  let tdContractAddress = document.createElement("td");
  tdContractAddress.setAttribute("class", 'align-middle d-flex justify-content-center py-3');
  tr.append(tdContractAddress);

  let divContractAddress = document.createElement("div");
  divContractAddress.setAttribute("class", 'd-flex align-items-center justify-content-center');
  tdContractAddress.append(divContractAddress);

  let pContractAddress = document.createElement("p");
  pContractAddress.setAttribute("class", 'me-2 fs-6 mb-0');
  pContractAddress.innerText = _contractAddress;
  divContractAddress.append(pContractAddress);

  // *************
  let divAddMetamask = document.createElement("div");
  tdContractAddress.append(divAddMetamask);

  let aMetamask = document.createElement("a");
  aMetamask.setAttribute("href", '#');
  aMetamask.setAttribute("data-bs-toggle", 'tooltip');
  aMetamask.setAttribute("data-bs-placement", 'bottom');
  aMetamask.setAttribute("title", 'Add to MetaMask');
  aMetamask.onclick = function (e) {
    e.preventDefault();
    addLogoToToken(id, _contractAddress, _symbol, _decimals);
  }
  divAddMetamask.append(aMetamask);

  let imgMetamask = document.createElement("img");
  imgMetamask.setAttribute("src", 'images/metamask.png');
  imgMetamask.setAttribute("style", ' width: 20px;');
  imgMetamask.setAttribute("class", 'ms-3');
  aMetamask.append(imgMetamask);

  // *************
  let aEdit = document.createElement("a");
  aEdit.setAttribute("href", '#');
  aEdit.setAttribute("class", 'ms-4 text-secondary');
  aEdit.setAttribute("data-bs-toggle", 'tooltip');
  aEdit.setAttribute("data-bs-placement", 'bottom');
  aEdit.setAttribute("title", 'Edit Logo');
  tr.addEventListener('click', function () {
    this.classList.add('selected-row');
  });
  aEdit.onclick = function (e) {
    e.preventDefault();
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.addEventListener("change", function() {
      // حذف رنگ سطر انتخاب شده
      tr.classList.remove("selected-row");
    });
    fileInput.onchange = function (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        let imageSrc = e.target.result;
        imgName.setAttribute("src", imageSrc);
        localStorage.setItem(id, imageSrc);
      }
      reader.readAsDataURL(file);
    }
    fileInput.click();
  }
  // aEdit.onclick = function (e) {
  //   e.preventDefault();
  //   let fileInput = document.createElement("input");
  //   fileInput.setAttribute("type", "file");
  //   fileInput.addEventListener("change", function() {
  //     // حذف رنگ سطر انتخاب شده
  //     tr.classList.remove("selected-row");
  //   });
  //   fileInput.onchange = function (event) {
  //     let file = event.target.files[0];
  //     let reader = new FileReader();
  //     reader.onload = function (e) {
  //       let imageSrc = e.target.result;
  //       imgName.setAttribute("src", imageSrc);
  //       localStorage.setItem(id, imageSrc);
  //     }
  //     reader.readAsDataURL(file);
  //   }
  //   fileInput.click();
  // }

  divAddMetamask.append(aEdit);

  let iEdit = document.createElement("i");
  iEdit.setAttribute("class", 'bi bi-pencil-fill');
  aEdit.append(iEdit);

  // Initialize Bootstrap tooltip
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

// The localStorage.clear() method clears all key-value pairs stored in the localStorage. It removes all items from the storage.
// localStorage.clear();



/**
 * Removes the 'selected-row' class from the table row element with the class 'selected-row', if it exists.
 */
const removeSelectedRowClass = () => {
  const tr = document.querySelector('.selected-row');
  if (tr) {
    tr.classList.remove('selected-row');
  }
};

/**
 * Adds a token to the user's wallet with the specified token address, symbol, decimals, and image.
 * @param {number} index - The index of the token in the table.
 * @param {string} _tokenAddress - The address of the token.
 * @param {string} _tokenSymbol - The symbol of the token.
 * @param {string} _tokenDecimals - The decimals of the token.
 */
const addLogoToToken = (_index, _tokenAddress, _tokenSymbol, _tokenDecimals) => {
  let tokenAddress = _tokenAddress;
  let tokenSymbol = _tokenSymbol;
  let tokenDecimals = _tokenDecimals;
  let tokenImage;

  const imageKey = _index.toString();
  const imageUrl = localStorage.getItem(imageKey);
  
  if (imageUrl) {
    tokenImage = imageUrl;
  } else {
    tokenImage = 'images/default-logo.png'; // تصویر پیش‌فرض در صورت عدم وجود آدرس تصویر
  }

  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      })
      .then((result) => {
        if (result) {
          console.log('تشکر برای علاقه‌مندی شما!');
          removeSelectedRowClass(); // حذف کلاس 'selected-row' از عنصر tr
          // ذخیره آدرس تصویر لوگو در صورت انتقال توکن به اکانت دیگر
          if (!imageUrl) {
            localStorage.setItem(imageKey, tokenImage);
          }
        } else {
          console.log('متاسفانه توکن اضافه نشد.');
        }
      })
      .catch((error) => {
        console.log('خطا:', error);
      });
  } else {
    console.log('MetaMask در مرورگر شما وجود ندارد.');
  }
}


