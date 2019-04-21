const auth = require('./auth.json')

class Currency {
    constructor(firstCurrency) {
        this.firstCurrency = firstCurrency;
        this.url = auth.api + "base=";
    }

    async getData(firstCurrency) {
        const responseFirstCurrency = await fetch(this.url + firstCurrency)
        const currencyData = await responseFirstCurrency.json();

        return currencyData
    }
}