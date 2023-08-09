import * as yup from 'yup';

export const profileSetter = yup.object().shape({
    mobileNumber: yup
        .string()
        .required("الزامی می باشد."),
    uniqueId: yup
        .string()
        .required("الزامی می باشد."),
    email: yup
        .string()
        .required("الزامی می باشد."),
    personType: yup
        .number()
        .required("الزامی می باشد."),
    countryId: yup
        .number()
        .required("الزامی می باشد."),
    captcha:yup
        .string()
        .required("کد کپچا را وارد کنید.")
})
export const mobileEntry = yup.object().shape({
    mobile: yup
        .string()
        .length(11,'شماره موبایل وارد شده اشتباه می باشد.')
        .required("الزامی می باشد."),
    captcha:yup
        .string()
        .required("کد کپچا را وارد کنید.")
})
export const getSejamProfileSchema = yup.object().shape({
    SejamToken: yup
        .string()
        .required("الزامی می باشد."),
    captcha:yup
        .string()
        .required("کد کپچا را وارد کنید.")
})

export const infoEntry = yup.object().shape({
    nationalId: yup
        .string()
        .required("الزامی می باشد."),
    firstName:yup
        .string()
        .required("الزامی می باشد."),
    lastName:yup
        .string()
        .required("الزامی می باشد."),
    email:yup
        .string()
        .email('فرمت ایمیل وارد شده صحیح نمی باشد.')
        .required("الزامی می باشد."),
})