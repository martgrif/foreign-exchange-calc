var MYAPP = function () {
    window.onload = function () {

        var getRequest = function (url, callback) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        callback(request.responseText); // callback here
                    } else {
                        console.log("Error: Currency List not ready");
                    }
                };
                request.open('GET', url);
                request.send();
            },
            
            currencycallback = function (dataresponse) {

                var currencyList = JSON.parse(dataresponse), reverseCalculationCheckbox = null, toCurrency = null, fromCurrency = null, currencyString = null, prop = null,

                    escapeHtml = function (text) {
                        var map = {
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            '"': '&quot;',
                            "'": '&#039;'
                        };

                        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
                    };


                // adding currencies to the dropdown list
                // sanitizing the values as good practice against XSS attacks

                for (prop in currencyList) {
                    if (currencyList.hasOwnProperty(prop)) {
                        currencyString += '<option value="' + escapeHtml(prop) + '">' + escapeHtml(prop) + ' | ' + escapeHtml(currencyList[prop]) + '</option>';
                    }


                }

                // I decided to use the innerhtml method rather than appendchild or the built in select add option, because there will be significant
                // performance gains from building the entire list in memory and causing 1 DOM update rather than 100 small updates


                var textField1 = document.getElementById("field1"), toCurrency = document.getElementById('toCurrency'), fromCurrency = document.getElementById('fromCurrency'), reverseCalculationCheckbox = document.getElementById("reverseCalculationCheckbox");

                toCurrency.innerHTML = currencyString;
                fromCurrency.innerHTML = currencyString;
                if (!this.calcobj && /[A-Z][A-Z][A-Z]/.test(toCurrency.value)) {
                    window.calcobj = new CurrencyCalculator();
                }
            };


        getRequest('js/currencies.json', currencycallback); 
        //passing currencycallback as a method

        

    };

};

MYAPP();


