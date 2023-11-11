import moment from "jalali-moment";

const banks = [
  { number: 627412, name: "بانک اقتصاد نوین", logo: "EGHTESAD_NOVIN" },
  { number: 627381, name: "بانک سپه", logo: "SEPAH" },
  { number: 505785, name: "بانک ایران زمین", logo: "IRANZAMIN" },
  { number: 622106, name: "بانک پارسیان", logo: "PARSIAN" },
  { number: 639194, name: "بانک پارسیان", logo: "PARSIAN" },
  { number: 627884, name: "بانک پارسیان", logo: "PARSIAN" },
  { number: 639347, name: "بانک پاسارگاد", logo: "PASARGAD" },
  { number: 502229, name: "بانک پاسارگاد", logo: "PASARGAD" },
  { number: 636214, name: "بانک آینده", logo: "AYANDEH" },
  { number: 627353, name: "بانک تجارت", logo: "TEJARAT" },
  { number: 585983, name: "بانک تجارت", logo: "TEJARAT" },
  { number: 502908, name: "بانک توسعه تعاون", logo: "TOSEAH_SADERAT" },
  { number: 627648, name: "بانک توسعه صادرات ایران", logo: "TOSEAH_TAAVON" },
  { number: 207177, name: "بانک توسعه صادرات ایران", logo: "TOSEAH_TAAVON" },
  { number: 636949, name: "بانک سپه", logo: "SEPAH" },
  { number: 502938, name: "بانک دی", logo: "DAY" },
  { number: 589463, name: "بانک رفاه کارگران", logo: "REFAH" },
  { number: 621986, name: "بانک سامان", logo: "SAMAN" },
  { number: 589210, name: "بانک سپه", logo: "SEPAH" },
  { number: 639607, name: "بانک سرمایه", logo: "SARMAYEH" },
  { number: 639346, name: "بانک سینا", logo: "SINA" },
  { number: 502806, name: "بانک شهر", logo: "SHAHR" },
  { number: 504706, name: "بانک شهر", logo: "SHAHR" },
  { number: 603769, name: "بانک صادرات ایران", logo: "SADERAT" },
  { number: 627961, name: "بانک صنعت و معدن", logo: "SANAT_VA_MADAN" },
  { number: 606373, name: "بانک قرض الحسنه مهر ایران", logo: "MEHR_IRAN" },
  { number: 639599, name: "بانک سپه", logo: "SEPAH" },
  { number: 627488, name: "بانک کارآفرین", logo: "KARAFARIN" },
  { number: 502910, name: "بانک کارآفرین", logo: "KARAFARIN" },
  { number: 603770, name: "بانک کشاورزی", logo: "KESHAVARZI" },
  { number: 639217, name: "بانک کشاورزی", logo: "KESHAVARZI" },
  { number: 505416, name: "بانک گردشگری", logo: "GARDESHGARI" },
  { number: 636795, name: "بانک مرکزی", logo: "MARKAZI" },
  { number: 628023, name: "بانک مسکن", logo: "MASKAN" },
  { number: 610433, name: "بانک ملت", logo: "MELLAT" },
  { number: 991975, name: "بانک ملت", logo: "MELLAT" },
  { number: 603799, name: "بانک ملی ایران", logo: "MELLI" },
  { number: 639370, name: "بانک مهر اقتصاد", logo: "MehrEghtesad" },
  { number: 627760, name: "پست بانک ایران", logo: "" },
  { number: 628157, name: "موسسه اعتباری توسعه", logo: "" },
  { number: 505801, name: "موسسه اعتباری کوثر", logo: "" },
  { number: 606256, name: "مؤسسه اعتباری ملل (عسکریه سابق)", logo: "" },
  { number: 504172, name: "بانک قرض الحسنه رسالت", logo: "RESALAT" },
  { number: 505809, name: "بانک خاورمیانه", logo: "KHAVARMIANEH" },
];

export function findBank(account: string) {
  if (account) {
    // const bankSelected : any = banks.find((item:any)=>String(item.number).startsWith(account?.slice(0,6)))
    const bankSelected: any = banks.find((item: any) => item.name === account);
    return bankSelected;
  } else {
    return "";
  }
}

export const jalali = (date: string) => {
  const jalali = moment(date).locale("fa");
  return { date: jalali.format("YYYY/MM/DD"), time: jalali.format("HH:mm:ss") };
};

export const formatNumber = (params: any) => {
  return Math.floor(params)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export function numberWithCommas(x: any) {
  const value = x
    ?.toString()
    .replace(/^00+/, "0")
    .replace(/^0+[1-9]/, (d: any) => parseInt(d))
    .replace(/^.+/, (d: any) =>
      parseFloat(d) <= 1 && d[0] == "." ? `0${d}` : d
    );
  return value?.split(".").length
    ? value.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (value.split(".").length > 1
          ? `.${value.split(".")[1].substring(0, 8)}`
          : "")
    : "";
}

export function p2e(x: any) {
  return x
    ?.toString()
    .replace(/[٠-٩]/g, (d: string) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export function numberInput(x: any) {
  return p2e(x)
    ?.replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
}
