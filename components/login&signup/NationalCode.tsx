import { useRouter } from "next/router"

export default function NationalCode() {
    const router = useRouter()

    const submitHandler = (e: any) => {
        e.preventDefault()
        router.push('/main')
    }
    return (
        <>
            <h2>ثبت نام</h2>
            <form className="grow flex flex-col" onSubmit={submitHandler}>
                <label htmlFor="nationalCode">کد ملی</label>
                <input type="number" name="nationalCode" dir="ltr" className="border border-gray-400 p-2 w-full rounded" />
                {/* <Captcha /> */}
                <button className="text-white bg-tavanaGreen text-center rounded py-2 w-full mt-auto" type="submit">
                    شروع ثبت نام
                </button>
            </form>
        </>
    )
}