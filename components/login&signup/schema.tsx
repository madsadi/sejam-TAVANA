import * as yup from 'yup';

export const mobileEntry = yup.object().shape({
    mobile: yup
        .string()
        .required("شماره همراه الزامی می باشد."),
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
        .required("الزامی می باشد."),
    password:yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "رمز عبور وارد شده از الگو پیروی نمی کند."
        )
        .required("الزامی می باشد."),
    passwordConfirm:yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "رمز عبور وارد شده از الگو پیروی نمی کند."
        )
        .required("الزامی می باشد."),
})