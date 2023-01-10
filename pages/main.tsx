import { useState } from 'react';
import FirstInfoBox from "../components/main/1stLevel/FirstInfoBox";
import SecondInfoBox from '../components/main/2ndLevel/SecondInfoBox';
import ProgressBar from "../components/main/ProgressBar";

export default function Main() {
    const [level, setLevel] = useState(1)
    const Components = {
        1: <FirstInfoBox setLevel={setLevel} />,
        2: <SecondInfoBox setLevel={setLevel} />
    }[level]

    return (
        <div className="container flex flex-col h-full py-10">
            <ProgressBar level={level} />
            {Components}
        </div>
    )
}