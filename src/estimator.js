const calculateCurrentlyInfected = (reportedCases, impactAmount) => reportedCases * impactAmount;

const calculateInfectionsByRequestedTime = (data, impactAmount) => {
  const { reportedCases, periodType, timeToElapse } = data;

  const days = {
    days: 1,
    weeks: 7,
    months: 30
  };

  const sets = (days[periodType] * timeToElapse) / 3;

  const currentlyInfected = calculateCurrentlyInfected(reportedCases, impactAmount);
  return currentlyInfected * (2 ** parseInt(sets, 10));
};


const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: calculateInfectionsByRequestedTime(data, 10)
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: calculateInfectionsByRequestedTime(data, 50)
  };


  const estimate = {
    impact,
    severeImpact
  };

  return estimate;
};

export default covid19ImpactEstimator;
