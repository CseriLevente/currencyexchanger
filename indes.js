///var value = doucment.getElementById("input").value;
///var input = document.getElementById("From").value;
///var output = document.getElementById("To").value;

///function myFunction(value) {
///return input * 400;
///}

///let eredmeny = myFunction();
///document.getElementById("output").innerHTML = eredmeny;

//function multiplyAndDisplay() {
// var input = document.getElementById("input").value;
//var factor = 5; // The multiplication factor, you can modify this value

//var result = input * factor;

//document.getElementById("output").textContent = result;
//}

function getExchangeRate(baseCurrency, targetCurrency) {
  const url = `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.rates[targetCurrency])
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

function exchanger() {
  var baseCurrency = document.getElementById("From").value;
  var targetCurrency = document.getElementById("To").value;
  var amount = document.getElementById("input").value;

  getExchangeRate(baseCurrency, targetCurrency)
    .then((exchangeRate) => {
      var result = exchangeRate * amount;
      document.getElementById("output").textContent = result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("input").addEventListener("input", function (event) {
  exchanger();
});
