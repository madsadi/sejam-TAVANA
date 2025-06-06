import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import BeforeAfterComponent from "../../common/component/before-and-after";
import useQuery from "../../../hooks/useQuery";
import { SEJAM_URL } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import { SejamContext } from "../../../pages/main";
import { toast } from "react-toastify";

export default function TestLevel() {
  const { fetchAsyncData: getExamResult } = useQuery({
    url: `${SEJAM_URL}/api/request/GetExamResult`,
  });
  const { mutate: addExamResult } = useMutation({
    url: `${SEJAM_URL}/api/request/AddExamResult`,
  });
  const { setLevel, level } = useContext<any>(SejamContext);
  const [answers, setAnswers] = useState<any>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });
  const questions = [
    {
      title: "در نماد وبانک، حرف اول *و* چه چیز را نشان می دهد؟",
      options: ["صنعت", "نوع اوراق", "نام شرکت", "هیچکدام"],
      answer: "1",
    },
    {
      title: "اولوّیت انجام معاملات به چه صورتی می باشد؟",
      options: [
        "قیمت سفارش",
        "قیمت سپس زمان ورود سفارش",
        "زمان سپس قیمت ورود",
        "زمان سفارش",
      ],
      answer: "2",
    },
    {
      title: "کارگزار ناظر کیست؟",
      options: [
        "کارگزاری می باشد که سهامدار می تواند تعداد سهام های خود را در آن افزایش دهد",
        "کارگزاری می باشد که سهامدار از طریق آن شرکت اقدام به خرید سهام نموده است.",
        "کارگزاری است که سهامداران می توانند دارایی سهام خود تحت نظر آن کارگزار را صرفاً از طریق همان کارگزار به فروش برسانند",
        "همه موارد",
      ],
      answer: "3",
    },
    {
      title: "تسویه معاملات در چند روز بعد از انجام معامله صورت می گیرد؟",
      options: ["٢ روز", "٣ روز", "٣ روز کاری", "٢ روز کاری"],
      answer: "4",
    },
    {
      title: "کدام یک از وظایف مجمع عمومی فوق العاده است؟",
      options: [
        "تغییر اساسنامه",
        "انحلال شرکت",
        "تغییر سرمایه شرکت",
        "همه موارد",
      ],
      answer: "4",
    },
    {
      title: "نماد شپنا مربوط به کدامیک از شرکت های زیر می باشد؟",
      options: [
        "پالایش نفت تهران",
        "پالایش نفت تبریز",
        "پالایش نفت اصفهان",
        "پالایش نفت بندرعباس",
      ],
      answer: "3",
    },
    {
      title: "جامع ترین و بهترین گزینه کدام است؟",
      options: [
        "قیمت سهام در بازار توسط خریدار تعیین می شود",
        "قیمت سهام در بازار بر اساس عرضه و تقاضا تعیین می شود",
        "قیمت سهام در بازار توسط فروشنده تعیین می شود",
        "قیمت سهام در بازار توسط شرکت بورس تعیین می شود",
      ],
      answer: "2",
    },
    {
      title: ' کدام "دامنه نوسان قیمت مجاز" در بازار سرمایه صحیح است:',
      options: ["از -5 تا +5", "از -10 تا +10", "از -3 تا +3", "همه موارد "],
      answer: "4",
    },
    {
      title: " معاملات اوراق بهادار در بورس تهران در چه ساعاتی انجام می گیرد؟",
      options: [
        "09:00 تا 12:30",
        "08:30 تا 11:50",
        "08:50 تا 12:50",
        "08:30 تا 12:00",
      ],
      answer: "1",
    },
    {
      title: "ارزش اسمی هر سهم شرکت‌های سهامی عام معمولاً چند ریال است؟",
      options: ["100 ریال", "10000 ریال", "10 ریال", "1000 ریال"],
      answer: "4",
    },
  ];

  const answerHandler = (respond: any, question: any) => {
    let _answers = { ...answers };
    if (answers[question] === respond) {
      _answers[question] = "";
      setAnswers(_answers);
    } else {
      _answers[question] = respond;
      setAnswers(_answers);
    }
  };

  useEffect(() => {
    getExamResult().then((res) => {
      let result: any = {};
      res.data.result.examResult.map((item: number, index: number) => {
        result[index] = item.toString();
      });
      setAnswers(result);
    });
  }, []);

  const sendExamResult = async () => {
    await addExamResult({
      examResult: Object.values(answers),
    })
      .then(() => setLevel(level + 1))
      .catch((err) => toast.error(`${err?.response?.data?.error?.message}`));
  };

  console.log(answers);

  return (
    <>
      <div>
        <div className="flex items-center mb-5">
          <ExclamationCircleIcon className="h-7 w-7 ml-2 text-tavanaPurple" />
          <span> آزمون آنلاین بورس را تکمیل نمایید</span>
        </div>
        {questions.map((question: any, index: number) => {
          return (
            <div
              key={question.title}
              className="mb-3 border border-black bg-bankCard p-3"
            >
              <span className="text-tavanaGreen text-lg">
                {index + 1}-{question.title}
              </span>
              <div className="space-y-2 mt-3">
                {question.options.map((option: string, i: number) => {
                  return (
                    <div className={"flex items-center"} key={option}>
                      <input
                        className={"checkbox checkbox-accent"}
                        checked={
                          answers[index] !== ""
                            ? Number(answers[index]) === i + 1
                            : false
                        }
                        onChange={() => answerHandler(`${i + 1}`, index)}
                        type="checkbox"
                      />
                      <label
                        className={`mr-2 ${
                          question.answer !== answers[index] &&
                          answers[index] >= "1" &&
                          answers[index] === `${i + 1}`
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <BeforeAfterComponent
        condition={
          Object.values(answers).every((item: any) => item !== "") &&
          Object.values(answers).filter(
            (item: any, index: number) => item === questions[index].answer
          ).length > 6
        }
        onConfirm={sendExamResult}
        warning={
          " لطفا تمام سوالات را پاسخ دهید و حداقل 7 جواب درست داشته باشید ."
        }
      />
    </>
  );
}
