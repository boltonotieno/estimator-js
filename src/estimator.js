const calculateCurrentlyInfected = (reportedCases, impactAmount) => reportedCases * impactAmount;

const calculateInfectionsByTime = (days, currentlyInfected) => {
  const sets = days / 3;
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
  const {
    reportedCases, region, periodType, timeToElapse
  } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD: avgDailyIncome } = region;

  const daysObject = {
    days: 1,
    weeks: 7,
    months: 30
  };
  const days = daysObject[periodType] * timeToElapse;

  const currentlyInfected = calculateCurrentlyInfected(reportedCases, impactAmount);
  const infectionsByRequestedTime = calculateInfectionsByTime(days, currentlyInfected);
  const severeCasesByRequestedTime = calculateSevereCasesByRequestedTime(infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = calculateHospitalBeds(data, severeCasesByRequestedTime);
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
  const dollarsInF = (infectionsByRequestedTime * avgDailyIncomePopulation) * avgDailyIncome * days;
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: dollarsInF
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
