import {createContext, useState} from 'react';
import UploadDocumentsLevel from '../components/main/3rdLevel/UploadDocuments.level';
import TestLevel from '../components/main/4thLevel/Test.level';
import FifthInfoBox from '../components/main/5thLevel/FifthInfoBox';
import SixthInfoBox from '../components/main/6thLevel/SixthInfoBox';
import ProgressBar from "../components/main/ProgressBar";
import ProfileSetter from "../components/main/ProfileSetter";
import GetSejamProfile from "../components/main/GetSejamProfile";
import SejamInfoLevel from "../components/main/1stLevel/SejamInfo.level";

export const SejamContext = createContext({})
export default function Main() {
    const [level, setLevel] = useState(0)
    const [userData, setUserData] = useState([])

    const Components = {
        0: <ProfileSetter/>,
        1: <GetSejamProfile/>,
        2: <SejamInfoLevel />,
        3: <UploadDocumentsLevel />,
        4: <TestLevel />,
        5: <FifthInfoBox setLevel={setLevel}/>,
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