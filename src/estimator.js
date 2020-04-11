const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
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

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
