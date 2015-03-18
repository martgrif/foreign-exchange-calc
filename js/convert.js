function CurrencyCalculator() {
    var currency1, currency2, textField1, textField2;
    
    // making a synchronious ajax request this time
    function makeRequest(address) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", address, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

        // Not supporting IE6 or below -.-
    function findRate(currency1, currency2) {
        var queryResponse = makeRequest('https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("' + currency1 + currency2 + '")&format=json&env=store://datatables.org/alltableswithkeys');
        var queryResponseJson = JSON.parse(queryResponse);
        
        if (queryResponseJson.query.results.rate.Rate !== null) {
            return queryResponseJson.query.results.rate.Rate;
        } else {
            return 'badval';
        }
        
    }
    
    var currencyField1 = document.getElementById("fromCurrency"), currencyField2 = document.getElementById("toCurrency");
    currency1 = currencyField1.value;
    currency2 = currencyField2.value;
    
    textField1 = document.getElementById("field1");
    textField2 = document.getElementById("field2");
    
    var currentRate = findRate(currency1, currency2);
    
    var currentRateInverse = 1 / currentRate;
    
    var recalculateRate = function () {
        currency1 = currencyField1.value;
        currency2 = currencyField2.value;

        currentRate = findRate(currency1, currency2);
        currentRateInverse = 1 / currentRate;
        console.log(currentRate);
    };
    
    currencyField1.onchange = recalculateRate;
    currencyField2.onchange = recalculateRate;
                        
    this.reverseCurrency = function () {
        var currencySwap = currency2;
        currencyField2.value = currency1;
        currencyField1.value = currencySwap;
        recalculateRate();
        
    };

    
    // The main calculation
    this.calculateRate = function (param) {
        if (currentRate !== 'badval') {
            // value of 'param' will be 1 for Currency 1 -> Currency 2 calculation, value will be 2 for the reverse
            if (param === 1) {
                if (isNaN(textField1.value)) {
                    textField2.value = "Not A Number, Please Edit Your Input";
                } else {
                    textField2.value = (textField1.value * currentRate).toFixed(2);
                }
            } else if (param === 2) {
                if (isNaN(textField2.value)) {
                    textField1.value = "Not A Number, Please Edit Your Input";
                } else {
                    textField1.value = (textField2.value * currentRateInverse).toFixed(2);
                }
            }
        
        } else {
            
            textField2.value = "There is a problem with the calculator, please try again";
            textField1.value = "There is a problem with the calculator, please try again";
        
        }
        
    };

}