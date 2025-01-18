import * as Yup from 'yup'

export const DetailsSchema =  Yup.object({
    destination: Yup.string()
      // .required('Name is required')
      .min(3, 'Name must be at least 3 characters long'),
      startDate: Yup.date()
      // .required('Start Date is required')
      .nullable(),
      endDate: Yup.date()
      // .required('End Date is required')
      .nullable()
      .test('isAfter', 'End date must be after start date', function (value) {
        const { startDate } = this.parent;
        return !value || new Date(value) > new Date(startDate);
      })
  })