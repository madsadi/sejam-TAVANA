import {createContext, useState} from 'react';
import ProgressBar from "../components/common/component/ProgressBar";
import AgreementLevel from "../components/main/agreement/Agreement.level";
import ProfileSetter from "../components/main/Profile-setter";
import GetSejamProfile from "../components/main/Get-sejam-profile";
import SejamInfoLevel from "../components/main/sejam-info/SejamInfo.level";
import UploadDocumentsLevel from "../components/main/upload-documents/UploadDocuments.level";
import TestLevel from "../components/main/test/Test.level";
import SixthInfoBox from "../components/main/final/SixthInfoBox";
import {SejamInfoType} from "../components/main/sejam-info/types";

export const SejamContext = createContext({})
export default function Main() {
    const [level, setLevel] = useState<number>(0)
    const [userData, setUserData] = useState<SejamInfoType[]|any>({})

    const Components = {
        0: <ProfileSetter/>,
        1: <GetSejamProfile/>,
        2: <SejamInfoLevel />,
        3: <UploadDocumentsLevel />,
        4: <TestLevel />,
        5: <AgreementLevel />,
        6: <SixthInfoBox setLevel={setLevel}/>
    }[level]

    return (
        <SejamContext.Provider value={{setLevel,setUserData,userData,level}}>
            <div className="container flex flex-col h-full py-10 text-sm md:text-md">
                <ProgressBar />
                {Components}
            </div>
        </SejamContext.Provider>
    )
}