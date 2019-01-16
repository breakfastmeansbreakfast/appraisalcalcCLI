const calcInputs = {
  type: 'ResiSale',
  name: 'Equitable Buildings',
  version: 1.0,
  rents: {
    rent1bed: 950,
    rent2bed: 1250,
    rent3bed: 1750,
  },
  units: {
    bedno1: 108,
    bedno2: 207,
    bedno3: 15,
  },
  yield: 0.0425,
  purchasersCosts: 0.06,
  managementCost: 0.225,
  stabalisationPeriod: 28, // period to hold the investment for
  growthRate: 0.035,
  // eslint-disable-next-line max-len
  growthPeriod: 27, // pre planning period + planning period + tender period + contruction period up to PC,
  scheme: {
    landPrice: 6064270,
    sdlt: 353356,
    legalLand: 100000,
    constructionCost: 65098414,
    fees: {
      architect: 0.045,
      qs: 0.015,
      structuralEngineer: 0.01,
      mande: 0.01,
      transport: 0.0008,
      planning: 0.0008,
      services: 0.0035,
      buildingRegs: 0.0002,
      pD: 0.0008,
      acoustic: 0.0025,
      fire: 0.0025,
      rol: 0.0003,
    },
    saleLegal: 0.0001,
    saleAgent: 0.01,
    otherCosts: {
      planningCosts: 200000,
      demolition: 500000,
      marketing: 50000,
      si: 50000,
      rol: 100000,
      hands: 5000,
    },
    contingency: 0.005,
    finance: {
      devFundingpercent: 0.3,
      invFundingpercent: 0.6,
      mezzFundingpercent: 0.1,
      invFundingmonthstart: 15,
      mezzFundingmonthstart: this.growthPeriod + 3,
    },
  },
};

module.exports = calcInputs;
