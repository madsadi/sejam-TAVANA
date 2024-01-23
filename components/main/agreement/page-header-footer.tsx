import moment from "jalali-moment";
import Image from "next/image";
import { memo, useContext } from "react";
import { agreementContext } from "./agreement-level";

const PageHeaderFooter = () => {
  const { document } = useContext<any>(agreementContext);
  return (
    <>
      <div className="page-header">
        <div className="logo-card relative">
          <img
            src={"/logo-tavana.png"}
            className={"object-contain"}
            alt="tavana"
          />
        </div>
        <div className="mt-5 flex font-weight-bold ">
          <div className={"text-sm ml-2"}> تاریخ :</div>
          <span>{moment().locale("fa").format("YYYY/MM/DD")}</span>
        </div>
      </div>
      <div className="page-footer">
        <div className="text-right">
          <div className={"titleValue"}> امضاء مشتري / نماینده :</div>
          <div className="sign-card relative">
            <Image
              src={
                `${document?.[0]?.image ? document?.[0]?.image : ""}` || "null"
              }
              fill
              alt="signPhoto"
              objectPosition="right"
              objectFit="contain"
              quality={0}
              unoptimized={true}
            />
          </div>
        </div>
        <div className="text-left">
          <div className={"titleValue"}>امضاء مسئول پذیرش :</div>
          <div className="sign-card relative ">
            <Image
              src={"/taheri-signature.png"}
              fill
              objectFit="contain"
              objectPosition="left"
              alt="seal"
            />
            <Image
              src={"/tavana-seal.png"}
              fill
              objectFit="contain"
              objectPosition="left"
              alt="seal"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PageHeaderFooter);
