import * as Yup from 'yup';

const validationSchema = {};

validationSchema.massPayment = limitUserData => {
  return Yup.object({});
};

export default validationSchema;