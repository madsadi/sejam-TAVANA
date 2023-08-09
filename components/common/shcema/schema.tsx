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
    captcha: yup
        .string()
        .required("کد کپچا را وارد کنید.")
})
export const mobileEntry = yup.object().shape({
    mobile: yup
        .string()
        .length(11, 'شماره موبایل وارد شده اشتباه می باشد.')
        .required("الزامی می باشد."),
    captcha: yup
        .string()
        .required("کد کپچا را وارد کنید.")
})
export const getSejamProfileSchema = yup.object().shape({
    SejamToken: yup
        .string()
        .required("الزامی می باشد."),
    captcha: yup
        .string()
        .required("کد کپچا را وارد کنید.")
})

export const infoEntry = yup.object().shape({
    nationalId: yup
        .string()
        .required("الزامی می باشد."),
    userName: yup
        .string()
        .matches(
            /^[A-Za-z\d]+$/,
            "لطفا از حروف فارسی و علامت ها استفاده نکنید."
        )
        .required("لطفا از حروف فارسی و علامت ها استفاده نکنید."),
    firstName: yup
        .string()
        .required("الزامی می باشد."),
    lastName: yup
        .string()
        .required("الزامی می باشد."),
    email: yup
        .string()
        .email('فرمت ایمیل وارد شده صحیح نمی باشد.')
        .required("الزامی می باشد."),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "رمز عبور وارد شده از الگو پیروی نمی کند."
        )
        .required("الزامی می باشد."),
    passwordConfirm: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "رمز عبور وارد شده از الگو پیروی نمی کند."
        )
        .required("الزامی می باشد."),
})

export const changePasswordSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required("الزامی می باشد."),
    newPassword: yup
        .string()
        .required("الزامی می باشد."),
})

export const changeMobileSchema = yup.object().shape({
    newPhoneNumber: yup
        .string()
        .required("الزامی می باشد."),
    token: yup
        .string()
        .required("الزامی می باشد."),
})

export const editInfoSchema = yup.object().shape({
    userName: yup
        .string()
        .required("الزامی می باشد."),
    firstName: yup
        .string()
        .required("الزامی می باشد."),
    lastName: yup
        .string()
        .required("الزامی می باشد."),
    email: yup
        .string()
        .required("الزامی می باشد."),
    nationalId: yup
        .string()
        .required("الزامی می باشد."),
})
