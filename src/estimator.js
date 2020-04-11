const covid19ImpactEstimator = (data) => {
    const { reportedCases } = data;
    let impact = {};
    let severeImpact = {};

    impact.currentlyInfected = reportedCases * 10;
    impact.infectionsByRequestedTime = impact.currentlyInfected * 512; 

    severeImpact.currentlyInfected = reportedCases * 50;
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;
    
    return {
        data,
        impact,
        severeImpact
    }
};

export default covid19ImpactEstimator;
