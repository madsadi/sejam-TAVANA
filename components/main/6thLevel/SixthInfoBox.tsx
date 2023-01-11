import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export default function SixthInfoBox({ setLevel }: { setLevel: any }) {
    const [open, setOpen] = useState(1);

    const handleOpen = (value: any) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <>
            <div className="grow flex flex-col bg-white p-5">
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>
                        اطلاعات هویتی
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="grid grid-cols-4">
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        اطلاعات شغلی
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="grid grid-cols-4">
                            <div>
                                عنوان شغل: دانشجوی دانشگاه
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        اطلاعات ارتباطی
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="grid grid-cols-4">
                            <div>
                                عنوان شغل: دانشجوی دانشگاه
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        حساب های بانکی
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="grid grid-cols-4">
                            <div>
                                عنوان شغل: دانشجوی دانشگاه
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5}>
                    <AccordionHeader onClick={() => handleOpen(5)}>
                        اطلاعات مالی
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="grid grid-cols-4">
                            <div>
                                عنوان شغل: دانشجوی دانشگاه
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                            <div>
                                کد ملی: 0021427321
                            </div>
                        </div>
                    </AccordionBody>
                </Accordion>
                <div className="flex items-center mt-auto">
                    <input className="ml-2" type="checkbox" name="confirm" />
                    <label htmlFor="confirm">اطلاعات مورد تایید است</label>
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <button className="bg-tavanBrown text-white rounded" onClick={() => setLevel(5)}>
                    مرحله قبل
                </button>
                <button className="bg-tavanaGreen text-white rounded">
                    تایید نهایی
                </button>
            </div>
        </>
    )
}