// A class to represent the computation data
function dataLine(item, value) {
  var self = this;
  self.item = item;
  self.value = value;
};

function AppViewModel() {
  var self = this;
  // Array to hold some computation results
  self.compData = ko.observableArray([]);

  function computePrimes(startNum, topNum){
    //remove the old compData
    self.compData.removeAll();

    var start = new Date().getTime();
    var num = parseInt(topNum) + 1;
    // store computation info here for output
    // var computationData = [];
    // create a boolean array from 2 to num
    var primes = [];
    for (var i = 0; i < num; i++) {
      primes.push(true);
    }
    // get the maximum possible prime divisor
    var maxDivisor = Math.floor(Math.sqrt(num));

    // zero and one are not prime
    primes[0] = false;
    primes[1] = false;

    for (var j = 2; j < maxDivisor + 1; j++) {
      // Step through array, counting by j and set each non-prime to false.
      // Don't need to check already non-prime divisors
      if (primes[j] === true) {
        // No need to check already false values, but it might be faster not to check
        // Start with 2 * prime number or you'll remove the prime!
        for (var k = j * 2; k < num; k += j) {
          primes[k] = false;
        }
      }
    }
    var answerString = 'Primes from ' + startNum + ' to ' + topNum + ':\n\n';
    var numberOfPrimes = 0;
    var maxPrimeFactor = 0;
    for (var l = startNum; l < num; l++) {
      if(primes[l] === true) {
        answerString += l + ' ';
        numberOfPrimes++;
        if(l <= maxDivisor) {
          maxPrimeFactor = l;
        }
      }
    }
    var end = new Date().getTime();
    var computationMsec =  (end - start);

    // answerString += '\n\n' + "Maximum divisor: " + maxDivisor;
    // answerString += '\n' + "Number of Primes: " + numberOfPrimes;
    // answerString += '\n' + "Computation msec: " + computationMsec;

    self.compData.push( new dataLine('Number of Primes', numberOfPrimes));
    self.compData.push( new dataLine('Maximum divisor', maxDivisor));
    self.compData.push( new dataLine('Maximum prime factor', maxPrimeFactor));
    self.compData.push( new dataLine('Computation time, msec', computationMsec));
    return  answerString;
  };

  self.startNum = ko.observable(2);
  self.endNum = ko.observable(100);

  self.result = ko.computed(function(){
    return computePrimes(self.startNum(), self.endNum());
  });

};

ko.applyBindings(new AppViewModel());

