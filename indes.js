async function getExchangeRate(baseCurrency, targetCurrency) {
  const url = `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`;

  const fetchResult = await fetch(url);

  const result = await fetchResult.json();

  return result.rates[targetCurrency];
}

async function exchanger() {
  var baseCurrency = document.getElementById("From").value;
  var targetCurrency = document.getElementById("To").value;
  var amount = document.getElementById("input").value;

  try {
    const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);

    var result = exchangeRate * amount;
    document.getElementById("output").textContent = result;
  } catch (error) {
    console.log("BAJ VAN", error);
  }
}

document.getElementById("input").addEventListener("input", function (event) {
  exchanger();
});
