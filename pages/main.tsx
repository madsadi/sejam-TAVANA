import React, { createContext, useEffect, useState } from "react";
import ProgressBar from "../components/common/component/progress-bar";
import AgreementLevel from "../components/main/agreement/agreement-level";
import ProfileSetter from "../components/main/Profile-setter";
import GetSejamProfile from "../components/main/Get-sejam-profile";
import SejamInfoLevel from "../components/main/sejam-info/sejam-info-level";
import UploadDocumentsLevel from "../components/main/upload-documents/upload-documents-level";
import TestLevel from "../components/main/test/test-level";
import { SejamInfoType } from "../components/main/sejam-info/types";
import UserStateLevel from "../components/main/final/user-state-level";
import { toast } from "react-toastify";
import { SejamiStatus } from "../components/main/sejami-status";
import Lottie from "react-lottie";
import Loader from "../public/multi-shape-loader.json";
import { SEJAM_URL } from "../api/constants";
import useQuery from "../hooks/useQuery";

export const SejamContext = createContext({});
export default function Main() {
  const { fetchAsyncData } = useQuery({
    url: `${SEJAM_URL}/api/request/GetRegistrationState`,
  });
  const [level, setLevel] = useState<number>(4);
  const [regInfo, setRegInfo] = useState<any>({});
  const [userData, setUserData] = useState<SejamInfoType[] | any>(null);
  const [error, setError] = useState<string>("");
  const [userDefaultBank, setUserDefaultBank] = useState<any>(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
  };

  const findLevel = (no: number) => {
    //Enums(OnlineRegistrationStatus) are available in ../components/common/enums
    switch (true) {
      case no <= 5:
        setLevel(0);
        break;
      case no < 14:
        //sejAM-INFO
        setLevel(2);
        break;
      case no === 14:
        //upload
        setLevel(3);
        break;
      case no === 15:
        //test
        setLevel(4);
        break;
      case no === 16:
      case no === 17:
        //agreement
        setLevel(5);
        break;
      case no >= 18:
        //status
        setLevel(6);
        break;
      default:
        setLevel(0);
        return;
    }
  };
  const registrationState = async (changeLevel: boolean = true) => {
    await fetchAsyncData()
      .then((res) => {
        if (changeLevel) {
          setTimeout(() => {
            findLevel(res?.data.result?.registrationState);
          }, 200);
        }
        setRegInfo(res?.data.result);
      })
      .catch((err) => {
        setError("مشکلی پیش آمده.");
        toast.error(`${err?.response?.data?.error?.message}`);
      });
  };

  useEffect(() => {
    // registrationState();
  }, []);

  const Components = {
    0: <ProfileSetter />,
    0.5: <SejamiStatus />,
    1: <GetSejamProfile />,
    2: <SejamInfoLevel />,
    3: <UploadDocumentsLevel />,
    4: <TestLevel />,
    5: <AgreementLevel />,
    6: <UserStateLevel />,
  }[level];

  return (
    <SejamContext.Provider
      value={{
        setLevel,
        setUserData,
        userData,
        level,
        setUserDefaultBank,
        userDefaultBank,
        regInfo,
        registrationState,
      }}
    >
      <div className="relative flex flex-col h-full md:py-0 pt-5 text-sm md:text-md">
        <ProgressBar />
        {level >= 0 ? (
          <div
            className={
              "flex overflow-y-auto flex-col grow bg-content border-t-2 border-tavanaPurple"
            }
          >
            <div className={"container py-10 flex flex-col grow "}>
              {Components}
            </div>
          </div>
        ) : (
          <div
            className={
              "flex flex-col grow pt-5 md:pt-5 pb-5 bg-white/30 backdrop-blur-md rounded w-full"
            }
          >
            <div
              className={
                "m-auto md:h-[400px] h-[250px] md:w-[400px] w-[250px] lottie"
              }
            >
              <Lottie options={defaultOptions} />
              <p className={"text-center"}>{error}</p>
            </div>
          </div>
        )}
      </div>
    </SejamContext.Provider>
  );
}
