export default function MobileEntery({ setLevel }: { setLevel: any }) {

    const submitHandler = (e: any) => {
        e.preventDefault()
        setLevel('confirmation')
    }

    return (
        <>
            <h2>ثبت نام</h2>
            <form className="grow flex flex-col" onSubmit={submitHandler}>
                <label htmlFor="mobile">موبایل</label>
                <input type="number" name="mobile" dir="ltr" className="border border-gray-400 p-2 w-full rounded" />
                {/* <Captcha /> */}
                <button className="text-white bg-tavanaGreen text-center rounded py-2 w-full mt-auto" type="submit">
                    ورود
                </button>
            </form>
        </>
    )
}