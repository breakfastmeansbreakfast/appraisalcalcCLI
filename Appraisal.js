/* eslint-disable max-len */
let calcInputs = require('./Inputs');
const _ = require('lodash');
calcInputs = calcInputs.calcInputs

const rentArray = (unitInput) => {
  const rentarray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= (calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1); i++) {
    let currentmonthrent = 1;
    currentmonthrent = unitInput * Math.pow((1 + calcInputs.growthRate / 12), (i));
    rentarray.push(currentmonthrent);
  }
  return rentarray;
};

const rentTotal = (unitType, unitTypeNo) => {
  const rentTotalArray = [];
  const rentroll = [];
  for (let i = calcInputs.growthPeriod; i <= (calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1); i++) {
    rentTotalArray.push(unitType[i]);
    rentroll.push(unitType[i] * unitTypeNo);
  }
  const rentTotalAmount = _.sum(rentroll);
  const rentData = {
    rentTotalArray: rentTotalArray,
    rentroll: rentroll,
    rentTotalAmount: rentTotalAmount,
  };
  return rentData;
};

// create array of full rents from month 0 onwards
const oneBedArray = rentArray(calcInputs.rents.rent1bed);
const twoBedArray = rentArray(calcInputs.rents.rent2bed);
const threeBedArray = rentArray(calcInputs.rents.rent3bed);


// calculate rent roll period before stabalistion
const interimRevenue = () => {
  const interim1bed = rentTotal(oneBedArray, calcInputs.units.bedno1);
  const interim2bed = rentTotal(twoBedArray, calcInputs.units.bedno2);
  const interim3bed = rentTotal(threeBedArray, calcInputs.units.bedno3);

  const total = interim1bed.rentTotalAmount + interim2bed.rentTotalAmount + interim3bed.rentTotalAmount;
  const rentData = [total, interim1bed, interim2bed, interim3bed];
  return rentData;
};

// calculate stabalised sale value
const capRevenue = () => {
  const grown1bed = oneBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];
  const grown2bed = twoBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];
  const grown3bed = threeBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];

  const rentRevenue =
  grown1bed * calcInputs.units.bedno1 +
  grown2bed * calcInputs.units.bedno2 +
  grown3bed * calcInputs.units.bedno3;

  const grossStabalisedRevenue = ((rentRevenue / calcInputs.yield) * 12);

  const purchasersCosts = calcInputs.purchasersCosts;
  const managementCost = calcInputs.managementCost;

  let netTotalRevenue = grossStabalisedRevenue * (1 - purchasersCosts);
  netTotalRevenue = netTotalRevenue * (1 - managementCost);
  return netTotalRevenue;
};

// add currency styling
const capRev = capRevenue().toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
const intRev = interimRevenue()[0].toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
const totalRevCurr = (interimRevenue()[0] + capRevenue()).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
const totalRev = (interimRevenue()[0] + capRevenue())

// dev appraisal start
const totalCosts = []
totalCosts.push(calcInputs.scheme.landPrice);
totalCosts.push(calcInputs.scheme.sdlt);
totalCosts.push(calcInputs.scheme.legalLand);
totalCosts.push(calcInputs.scheme.constructionCost);

Object.keys(calcInputs.scheme.fees).forEach(key => {
    totalCosts.push(calcInputs.scheme.fees[key] * calcInputs.scheme.constructionCost)
});

const sumTotalCosts = _.sum(totalCosts);
const profit = totalRev - sumTotalCosts;
const profitOC = profit / sumTotalCosts;
const sumTotalCostsCurr = sumTotalCosts.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });

console.log("Sale value: " + capRev);
console.log("Interim rental revenue: " + intRev);
console.log("Total receipts: " + totalRevCurr);
console.log("Total costs: " + sumTotalCostsCurr);
console.log("Profit: " + profit)
console.log("Profit on cost: " + profitOC)
