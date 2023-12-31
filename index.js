async function getExchangeRate(baseCurrency, targetCurrency) {
  const url = `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`;

  const fetchResult = await fetch(url);

  const result = await fetchResult.json();

  return result.rates[targetCurrency];
}

async function exchanger() {
  var baseCurrency = document.getElementById("From").value;
  const targetCurrency = document.getElementById("To").value;
  const amountInput = document.getElementById("input");
  const amount = parseFloat(amountInput.value);
  const errorElement = document.getElementById("error");

  const messages = [];

  if (amount < 0) {
    messages.push("Your number can not be negative");
  }
  if (amount > 10000000) {
    messages.push("Your number can not be greater than 10M");
  }

  if (messages.length > 0) {
    errorElement.innerText = messages.join(", ");
    amountInput.value = "";
    document.getElementById("output").textContent = "";
  } else {
    errorElement.innerText = "";
    try {
      const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);

      var result = exchangeRate * amount;
      roundedResult = result.toFixed(2);
      document.getElementById("output").textContent = roundedResult;
    } catch (error) {
      console.log("BAJ VAN", error);
    }
  }
}

document.getElementById("input").addEventListener("input", function (event) {
  exchanger();
});

function defSelected(selectElement) {
  return selectElement.value === "";
}

function fieldsDisabled(disabled) {
  var inputField = document.getElementById("input");
  var outputField = document.getElementById("output");

  inputField.disabled = disabled;
  outputField.disabled = disabled;
}

fieldsDisabled(true);

function selectsValid() {
  var fromSelect = document.getElementById("From");
  var toSelect = document.getElementById("To");

  return !defSelected(fromSelect) && !defSelected(toSelect);
}

document.getElementById("From").addEventListener("change", function (event) {
  var valid = selectsValid();
  fieldsDisabled(!valid);
});

document.getElementById("To").addEventListener("change", function (event) {
  var valid = selectsValid();
  fieldsDisabled(!valid);
});

function swapCurrencies() {
  var fromSelect = document.getElementById("From");
  var toSelect = document.getElementById("To");

  var tempValue = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempValue;

  exchanger();
}
