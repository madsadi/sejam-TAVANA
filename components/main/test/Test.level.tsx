import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import {useState} from "react";
import BeforeAfterComponent from "../../common/component/Before&After.component";

export default function TestLevel() {
    const [answers,setAnswers] = useState<any>({0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:''})
    const questions = [
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            options: ['veniam', 'nostrud ', 'ullamco', 'voluptate ']
        },
    ]

    const answerHandler = (respond:any,question:any)=>{
        let _answers = {...answers};
        if (answers[question] === respond){
            _answers[question] = ''
            setAnswers(_answers)
        }else{
            _answers[question] = respond
            setAnswers(_answers)
        }
    }

    return (
        <>
            <div className="bg-white/50 p-5 rounded-md backdrop-blur-md">
                <div className="flex items-center mb-5">
                    <ExclamationCircleIcon className='h-7 w-7 ml-2 text-tavanaGreen' />
                    <span>Please take the test to proceed</span>
                </div>
                {
                    questions.map((question: any, index: number) => {
                        return (
                            <div key={question.title} className='mb-3 border border-gray-300 p-3'>
                                <span className='text-tavanaGreen text-lg'>
                                    {index + 1}
                                    -
                                    {question.title}
                                </span>
                                <div className='space-y-2 mt-3'>
                                    {
                                        question.options.map((option: string,i:number) => {
                                            return (
                                                <div className={'flex items-center'} key={option}>
                                                    <input className={'checkbox checkbox-accent'} checked={answers[index]!=='' ? Number(answers[index])===i:false} onChange={()=>answerHandler(i,index)} type="checkbox" />
                                                    <label className='ml-2'>{option}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <BeforeAfterComponent condition={Object.values(answers).every((item:any)=>item!=='')} warning={'Please answer all questions'}/>
        </>
    )
}