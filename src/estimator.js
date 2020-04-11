const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds
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

  const bedsEstimate = (severeCases) => severeCases - Math.trunc(totalHospitalBeds * 0.35);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  impact.severeCasesByRequestedTime = severeEstimate(impact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = bedsEstimate(impact.severeCasesByRequestedTime);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;
  severeImpact.severeCasesByRequestedTime = severeEstimate(severeImpact.infectionsByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = bedsEstimate(severeImpact.severeCasesByRequestedTime);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
