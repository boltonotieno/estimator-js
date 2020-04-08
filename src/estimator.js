const calculateCurrentlyInfected = (reportedCases, impactAmount) => reportedCases * impactAmount;

const calculateInfectionsByRequestedTime = (data, currentlyInfected) => {
  const { periodType, timeToElapse } = data;

  const days = {
    days: 1,
    weeks: 7,
    months: 30
  };

  const sets = (days[periodType] * timeToElapse) / 3;
  return currentlyInfected * (2 ** parseInt(sets, 10));
};

const calculateSevereCasesByRequestedTime = (infectionsByRequestedTime) => {
  const cases = infectionsByRequestedTime * 0.15;
  return cases;
};

const calculateHospitalBeds = (data, severeCasesByRequestedTime) => {
  const { totalHospitalBeds } = data;
  const expectedAvailableBeds = totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = expectedAvailableBeds - severeCasesByRequestedTime;
  return hospitalBedsByRequestedTime;
};


const impactFunction = (data, impactAmount) => {
  const { reportedCases } = data;
  const currentlyInfected = calculateCurrentlyInfected(reportedCases, impactAmount);
  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(data, currentlyInfected);
  const severeCasesByRequestedTime = calculateSevereCasesByRequestedTime(infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = calculateHospitalBeds(data, severeCasesByRequestedTime);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => {
  const impact = impactFunction(data, 10);

  const severeImpact = impactFunction(data, 50);

  const estimate = {
    impact,
    severeImpact
  };

  return estimate;
};

export default covid19ImpactEstimator;
