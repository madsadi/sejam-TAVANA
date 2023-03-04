import { useState } from 'react';
import FirstInfoBox from "../components/main/1stLevel/FirstInfoBox";
import SecondInfoBox from '../components/main/2ndLevel/SecondInfoBox';
import ThirdInfoBox from '../components/main/3rdLevel/ThirdInfoBox';
import ForthInfoBox from '../components/main/4thLevel/ForthInfoBox';
import FifthInfoBox from '../components/main/5thLevel/FifthInfoBox';
import SixthInfoBox from '../components/main/6thLevel/SixthInfoBox';
import ProgressBar from "../components/main/ProgressBar";

export default function Main() {
    const [level, setLevel] = useState(1)
    const Components = {
        1: <FirstInfoBox setLevel={setLevel} />,
        2: <SecondInfoBox setLevel={setLevel} />,
        3: <ThirdInfoBox setLevel={setLevel} />,
        4: <ForthInfoBox setLevel={setLevel} />,
        5: <FifthInfoBox setLevel={setLevel} />,
        6: <SixthInfoBox setLevel={setLevel} />
    }[level]

    return (
        <div className="container flex flex-col h-full py-10 text-sm md:text-md">
            <ProgressBar level={level} setLevel={setLevel} />
            {Components}
        </div>
    )
}