const initialValues = {};

initialValues.paymentCreditCard = (sof, indexSof) => {
  return {
    isSuccessOwnCCDetails: false,
    accountIndexOwnCC: null,
    whenToTransfer: {
      name: 'Now',
      value: '0',
    },
    recurringStart: {
      valueCategory: 'month',
      dayValue: 0,
      weekValue: 0,
      monthValue: 1,
    },
  };
};

export default initialValues;
