export default function Confirmation({ setLevel }: { setLevel: any }) {

    const submitHandler = (e: any) => {
        e.preventDefault()
        setLevel('nationalCode')
    }
    return (
        <>
            <h2>ورود کد پیامک شده</h2>
            <form className="grow flex flex-col" onSubmit={submitHandler}>
                <label htmlFor="code">کد ارسال شده</label>
                <input type="number" name="code" dir="ltr" className="border border-gray-400 p-2 w-full rounded" />
                {/* <Captcha /> */}
                <span className="text-center my-5">برای ارسال مجدد کد و یا ورود، تیک من ربات نیستم را بزنید</span>
                <button className="text-white bg-tavanaGreen text-center rounded py-2 w-full mt-auto" type="submit">
                    ورود
                </button>
                <button className="text-white bg-tavanBrown text-center rounded py-2 w-full mt-5">
                    ارسال مجدد کد
                </button>
            </form>
        </>
    )
}