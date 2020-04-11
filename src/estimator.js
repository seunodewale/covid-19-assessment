const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType, totalHospitalBeds } = data;
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

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = impact.severeCasesByRequestedTime - Math.trunc(totalHospitalBeds * 0.35);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);
  severeImpact.hospitalBedsByRequestedTime = severeImpact.severeCasesByRequestedTime - Math.trunc(totalHospitalBeds * 0.35);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
