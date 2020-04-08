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
  return currentlyInfected * (2 ** sets);
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
  //   console.log(estimate, 'estimate');
  return estimate;
};

// const data = {
//   region: {
//     name: 'Africa', avgAge: 19.7, avgDailyIncomeInUSD: 5, avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

export default covid19ImpactEstimator;
