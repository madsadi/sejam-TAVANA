import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AccordionComponent from "../../common/component/accordion";
import { agreement } from "./types";
import OnlineRegistrationAgreement from "./تعهد نامه ثبت نام غیر حضوری";
import TotalBrokerageAgreement from "./قرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار)";
import PrivatePersonAgreement from "./تفاهم\u200Cنامه شخص حقیقی";
import PhoneTradingAgreement from "./قرارداد معاملات تلفنی";
import OfflineTradingAgreement from "./قرارداد معاملات اینترنتی";
import OnlineTradingAgreement from "./قرارداد استفاده از خدمات معاملات برخط اوراق بهادار";
import { SejamContext } from "../../../pages/main";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import OptionalAgreement from "./قراردادمعاملات اختیاری";
import useQuery from "../../../hooks/useQuery";
import { FILE_SERVER_URL, SEJAM_URL } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import Resizer from "react-image-file-resizer";
import PrivatePersonValue from "./قرارداد اعتبار حقیقی";
import OTCFaraBourseTradingRiskAgreement from "./اقرارنامه و بیانیه پذیرش ریسک معاملات سهام و حق تقدم خرید سهام در بازار توافقی فرابورس ایران";

export const agreementContext = createContext({});
export default function AgreementLevel() {
  const { fetchAsyncData: getAllPossibleAgreements } = useQuery({
    url: `${SEJAM_URL}/api/request/GetAllPossibleAgreements`,
  });
  const { fetchAsyncData: getSejamInfo } = useQuery({
    url: `${SEJAM_URL}/api/request/GetSejamInfo`,
  });
  const { fetchAsyncData: getBankAccounts } = useQuery({
    url: `${SEJAM_URL}/api/request/GetAllBankAccounts`,
  });
  const { mutate: approveAgreements } = useMutation({
    url: `${SEJAM_URL}/api/request/ApproveUserAgreements`,
  });
  const { fetchAsyncData: getContent } = useQuery({
    url: `${FILE_SERVER_URL}/api/file-manager/get-content`,
  });

  const { setLevel, level } = useContext<any>(SejamContext);
  const initialApprovedStates = [
    {
      agreementId: 1,
      status: 3,
    },
    {
      agreementId: 2,
      status: 3,
    },
    {
      agreementId: 6,
      status: 3,
    },
    {
      agreementId: 5,
      status: 3,
    },
    {
      agreementId: 3,
      status: 3,
    },
    {
      agreementId: 7,
      status: 3,
    },
    {
      agreementId: 4,
      status: 3,
    },
    {
      agreementId: 8,
      status: 3,
    },
    {
      agreementId: 9,
      status: 3,
    },
  ];
  const { userData, setUserData, setUserDefaultBank, userDefaultBank } =
    useContext<any>(SejamContext);
  const [agreements, setAgreements] = useState<agreement[]>([]);
  const [approvedAgreements, setApprove] = useState<any>(initialApprovedStates);
  const [loading, setLoading] = useState<boolean>(false);
  const [document, setDocuments] = useState<any>([]);

  let initialDocuments: any = [
    {
      title: "تصویر امضاء دریافت شده از سجام",
      fileType: 1,
      image: null,
    },
  ];

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        100,
        "PNG",
        20,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const resizeHandlder = async (file: any) => {
    const image = await resizeFile(file);
    let __D = document;
    setDocuments([{ ...__D, image: image }]);
  };
  const getDocument = useCallback(async () => {
    await getContent({ fileOwnerSoftware: 1, type: 1 }).then((res) => {
      let _D = initialDocuments;
      if (res?.data.result.length) {
        res?.data.result?.map((item: any) => {
          let _documentIndex = _D.findIndex(
            (i: any) => i.fileType === item.fileType
          );
          if (_documentIndex >= 0 && item?.content) {
            fetch(
              `data:image/${item.extension.split(".")[1]};base64,` +
                item.content
            )
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], "File name", {
                  type: "image/png",
                });
                resizeHandlder(file);
              });
          }
        });
      }
      setDocuments(_D);
    });
  }, []);

  const approveHandler = (key: number, status: number = -1) => {
    let _approves: any = [...approvedAgreements];
    let index = _approves.findIndex((item: any) => item.agreementId === key);
    if (status > 0) {
      _approves.splice(index, 1, { agreementId: key, status: status });
    } else {
      if (_approves[index].status === 3) {
        _approves.splice(index, 1, { agreementId: key, status: 2 });
      } else {
        _approves.splice(index, 1, { agreementId: key, status: 3 });
      }
    }
    setApprove(_approves);
  };

  useEffect(() => {
    const getAgreements = async () => {
      await getAllPossibleAgreements().then((res) => {
        let agreements = res?.data.result?.agreements;
        let _approves: any = [...approvedAgreements];
        setAgreements(agreements);
        agreements?.map((a: any) => {
          let index = _approves.findIndex(
            (item: any) => item.agreementId === a.code
          );
          _approves.splice(index, 1, { agreementId: a.code, status: a.status });
        });
        setApprove(_approves);
      });
    };
    const sejamInfo = async () => {
      await getSejamInfo().then((res) => {
        setUserData(JSON.parse(res?.data.result?.sejamProfile));
      });
    };
    const bankAccounts = async () => {
      await getBankAccounts().then((res) => {
        setUserDefaultBank(
          res?.data.result?.bankAccounts.find((item: any) => item.isDefault)
        );
      });
    };
    getAgreements();
    getDocument();
    if (!userData) {
      sejamInfo();
    }
    if (!userDefaultBank) {
      bankAccounts();
    }
  }, []);

  const agreementsContext: any = {
    1: <OnlineRegistrationAgreement />,
    2: <TotalBrokerageAgreement />,
    6: <PrivatePersonAgreement />,
    5: <PhoneTradingAgreement />,
    3: <OfflineTradingAgreement />,
    7: <OnlineTradingAgreement />,
    4: <OptionalAgreement />,
    8: <PrivatePersonValue />,
    9: <OTCFaraBourseTradingRiskAgreement />,
  };

  const proceed = async () => {
    setLoading(true);
    await approveAgreements({ agreements: approvedAgreements })
      .then(() => setLevel(level + 1))
      .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <agreementContext.Provider value={{ document }}>
      <div className="grow">
        {agreements
          .filter((item: any) => !item.isDeleted)
          .map((a: agreement) => {
            return (
              <div className={"flex"} key={a.id}>
                <input
                  className={"checkbox checkbox-accent ml-2 md:ml-7 mt-4"}
                  checked={
                    approvedAgreements.find(
                      (item: any) => item.agreementId === a.code
                    )?.status === 2
                  }
                  onChange={() => approveHandler(a.code)}
                  type="checkbox"
                />
                <AccordionComponent
                  title={a.name}
                  extra={
                    a.isRequired ? (
                      <div className={"min-w-5 mr-auto md:mr-2"}>
                        <ExclamationCircleIcon
                          className={"h-5 w-5 text-red-500"}
                        />
                      </div>
                    ) : null
                  }
                >
                  {agreementsContext[a.code]}
                </AccordionComponent>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="prevButton w-fit"
          onClick={() => setLevel(level - 1)}
        >
          مرحله قبل
        </button>
        <button
          className="button w-fit flex items-center"
          onClick={proceed}
          disabled={loading}
        >
          تایید قراردادها
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </agreementContext.Provider>
  );
}

//2 taeed 3 rad
