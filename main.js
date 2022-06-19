fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((response) => response.json())
  .then((data) => populateDisplays(data));

function populateDisplays(data) {
  const desiredCurrencies = [];
  desiredCurrencies.push(data[0], data[1], data[6]);

  for (let currency of desiredCurrencies) {
    populate(currency);
  }
}

function populate(currency) {
  let name = currency.casa.nombre.replace(" ", "-").toLowerCase();
  let displayWindow = document.getElementById(name);
  let buyText = displayWindow.querySelector(".compra");
  let sellText = displayWindow.querySelector(".venta");
  let variationText = displayWindow.querySelector(".currency-footer");
  let variation = parseFloat(currency.casa.variacion.replace(",", "."));

  if (buyText != null) {
    buyText.innerHTML = "$" + currency.casa.compra;
  }

  if (sellText != null) {
    sellText.innerHTML = "$" + currency.casa.venta;
  }

  if (variation > 0) {
    variationText.innerHTML = "Variacion: +" + currency.casa.variacion + "%";
    variationText.style.color = "green";
  } else {
    variationText.innerHTML = "Variacion: " + currency.casa.variacion + "%";
    variationText.style.color = "red";
  }
}
