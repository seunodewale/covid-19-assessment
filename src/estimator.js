const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region
  } = data;
  const impact = {};
  const severeImpact = {};
  let factor;

  switch (periodType) {
    case 'days':
      factor = 2 ** Math.trunc(timeToElapse / 3);
      break;
    case 'weeks':
      factor = 2 ** Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'months':
      factor = 2 ** Math.trunc((timeToElapse * 30) / 3);
      break;
    default:
      factor = 2 ** Math.trunc(timeToElapse / 3);
  }

  const severeEstimate = (value) => Math.trunc(value * 0.15);

  const icuCases = (value) => Math.trunc(value * 0.05);

  const vCases = (value) => Math.trunc(value * 0.02);

  const bedsEstimate = (severeCases) => Math.trunc((totalHospitalBeds * 0.35) - severeCases);

  const dollarsLost = (severeCases) => {
    const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
    const res = (severeCases * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse;
    return Math.trunc(res);
  };

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  impact.severeCasesByRequestedTime = severeEstimate(impact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = bedsEstimate(impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = icuCases(impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = vCases(impact.infectionsByRequestedTime);
  impact.dollarsInFlight = dollarsLost(impact.infectionsByRequestedTime);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;
  severeImpact.severeCasesByRequestedTime = severeEstimate(severeImpact.infectionsByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = bedsEstimate(severeImpact.severeCasesByRequestedTime);
  severeImpact.casesForICUByRequestedTime = icuCases(severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = vCases(severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = dollarsLost(severeImpact.infectionsByRequestedTime);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
