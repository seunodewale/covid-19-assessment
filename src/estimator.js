const covid19ImpactEstimator = (data) => {
    const { reportedCases } = data;
    let output = {
        data,
        impact: {},
        severeImpact: {}
    }

    output.impact.currentlyInfected = reportedCases * 10;
    output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * 1024; 

    output.severeImpact.currentlyInfected = reportedCases * 50;
    output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected * 1024;
    
    return output
};

export default covid19ImpactEstimator;
