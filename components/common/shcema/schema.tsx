import * as yup from 'yup';

export const mobileEntry = yup.object().shape({
    mobile: yup
        .string()
        .required(),
    captcha:yup
        .string()
        .required()
})
export const getSejamProfileSchema = yup.object().shape({
    SejamToken: yup
        .string()
        .required(),
    captcha:yup
        .string()
        .required()
})

export const infoEntry = yup.object().shape({
    nationalId: yup
        .string()
        .required(),
    firstName:yup
        .string()
        .required(),
    userName:yup
        .string()
        .required(),
    lastName:yup
        .string()
        .required(),
    email:yup
        .string()
        .email()
        .required(),
    password:yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        )
        .required(),
    passwordConfirm:yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        )
        .required(),
})