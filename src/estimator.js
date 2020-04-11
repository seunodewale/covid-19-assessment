const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
