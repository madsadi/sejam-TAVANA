import React, {useCallback, useContext, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {formatNumber, jalali} from "../../common/functions";
import {
    accountTypeEnums,
    legalPersonTypeCategoryEnums,
    tradingKnowledgeLevelEnums,
    transactionLevelPrivatePersonEnums
} from "../../common/enums";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import PageHeaderFooter from "./PageHeaderFooter";
import LabelValue from "../../common/component/LabelValue";

export default function OnlineRegistrationAgreement() {
    const {userData, userDefaultBank} = useContext<any>(SejamContext)
    const [loading, setLoading] = useState(false);

    const componentRef = useRef(null);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const reactToPrintTrigger = () => {

        return (
            <button className={'flex item-center button bg-red-600 w-fit text-white float-left'}>
                Print
                {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> : <PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return (
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="Agreement"
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef} className={'mobileAgreement p-5'}>
                <table className={'w-full'}>
                    <thead>
                    <tr>
                        <td>
                            <div className="page-header-space">&nbsp;</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={'w-full content'}>
                            <div className={'relative leading-8 text-justify page'}>
                                <div className="text-center">
                                    <p>Lorem ipsum dolor sit amet</p>
                                </div>

                                <div className="text-center">
                                    <h4 className="font-weight-bolder">
                                        Lorem ipsum dolor sit amet
                                    </h4>
                                </div>
                                <div className="mt-4">
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </li>
                                        <li className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </li>
                                    </ul>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>

                                <div className="mt-4">

                                    <table className={'table table-compact w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5> Duis aute irure: </h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={'Name'}
                                                            value={userData?.privatePerson?.firstName + '-' + userData?.privatePerson?.lastName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Father Name'}
                                                            value={userData?.privatePerson?.fatherName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'ID No.'}
                                                            value={userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'National ID'} value={userData?.uniqueIdentifier}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={'Tel'} value={userData?.addresses?.[0]?.tel}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Postal Code'}
                                                            value={userData?.addresses?.[0]?.fax}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Phone Number'}
                                                            value={userData?.addresses?.[0]?.mobile}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Email'}
                                                            value={userData?.addresses?.[0]?.email}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={'Bank'}
                                                            value={userDefaultBank?.bank?.name + ' ' + (userDefaultBank?.branchCode ? userDefaultBank?.branchCode : '')}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Account'}
                                                            value={userDefaultBank?.accountNumber}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'Address'}
                                                            value={userData?.addresses?.[0]?.remnantAddress}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table className={'table table-compact w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>Duis aute irure:</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={'Name'}
                                                            value={userData?.agent ? (userData?.agent?.firstName + ' ' + userData?.agent?.lastName) : ''}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'National ID'} value={userData?.agent?.uniqueIdentifier}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4">
                                    <p>
                                    <span className="font-weight-bold">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </span>
                                    </p>
                                    <p>
                                    <span className="font-weight-bold">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </span>
                                    </p>
                                    <p>
                                    <span className="font-weight-bold">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </span>
                                    </p>
                                    <p><span
                                        className="font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <div className="page-footer-space">&nbsp;</div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                <PageHeaderFooter/>
            </div>
        </>
    )
}