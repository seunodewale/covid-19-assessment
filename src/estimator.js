const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse } = data;
  const impact = {};
  const severeImpact = {};
  const factor = 2 ** Math.trunc(timeToElapse / 3);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
