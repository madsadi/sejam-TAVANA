import Image from "next/image";
import { useState } from 'react'
import Confirmation from "../components/login&signup/confirmation";
import MobileEntery from "../components/login&signup/MobileEntery";
import NationalCode from "../components/login&signup/NationalCode";

export default function Home() {
  const [level, setLevel] = useState('mobileEntry')

  const Components = {
    'mobileEntry': <MobileEntery setLevel={setLevel} />,
    'confirmation': <Confirmation setLevel={setLevel} />,
    'nationalCode': <NationalCode />
  }[level]

  return (
    <div className="flex h-2/3 w-3/5 m-auto shadow-md rounded-md overflow-hidden">
      <div className="grow h-full bg-white basis-1/2 p-10 flex flex-col">
        {Components}
      </div>
      <div className="h-full bg-tavanaGreen grow flex basis-1/2">
        <span className="h-1/2 w-1/2 m-auto relative">
          <Image src={'/logo-full.svg'} alt={'tavana'} fill />
        </span>
      </div>
    </div>
  )
}
