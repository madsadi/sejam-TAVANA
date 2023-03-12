import React, {Dispatch, useState} from "react";
import {accountNumber, bankAccount, cityType, countryType, provinceType} from "./types";
import {registerBankAccount, searchCity, searchCountry, searchProvince} from "../../../api/sejam-info.api";
import {accountTypeEnums} from "../../common/enums";

export default function AddAccountComponent({fetch,banks,setAddModal}:{fetch:Function,banks:accountNumber[],setAddModal:Dispatch<boolean>}){
    const [query,setQuery]=useState<bankAccount>({accountNumber:'',iban:'',type:1,cityId:0,isDefault:false})
    const [country,setCountry]=useState<countryType>({countryName:'کشور',countryId:0})
    const [countries,setCountries]=useState<countryType[]>([])
    const [province,setProvince]=useState<provinceType>({countryId:0,countryName:'',provinceId:0,provinceName:'استان'})
    const [provinces,setProvinces]=useState<provinceType[]>([])
    const [city,setCity]=useState<cityType>({countryId:0,countryName:'',provinceId:0,provinceName:'',cityId:0,cityName:'شهر'})
    const [cities,setCities]=useState<cityType[]>([])

    const searchCountryHandler = async (e:any)=>{
        await searchCountry(e.target.value)
            .then((res)=>setCountries(res?.result?.response))
    }

    const searchProvinceHandler = async (e:any)=>{
        await searchProvince(country.countryId,e.target.value)
            .then((res)=>setProvinces(res?.result?.response))
    }

    const searchCityHandler = async (e:any)=>{
        await searchCity({CountryId:country.countryId, ProvinceId:province.provinceId,CityName:e.target.value})
            .then((res)=>setCities(res?.result?.response))
    }

    const queryUpdateHandler = (key:string,value:any)=>{
        let _query:bankAccount | any= {...query};
        _query[key] = value;
        setQuery(_query)
    }

    const submitHandler = async (e:any)=>{
        e.preventDefault()
        let restOfAccounts = banks.map((b:accountNumber)=>{
            return ({
                "accountNumber": b.accountNumber,
                "iban": b.sheba,
                "type": accountTypeEnums.find((item:any)=>item.enTitle===b.type)?.id,
                "cityId": b.branchCity.id,
                "isDefault": b.isDefault
            })
        })
        await registerBankAccount({bankAccounts:[...restOfAccounts,query]})
            .then((res)=> {
                fetch();
                setAddModal(false)
            })
    }
    return(
        <form className={'grid grid-cols-2 gap-4'} onSubmit={submitHandler}>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">شماره حساب:</span>
                </label>
                <input type="number" className="input input-bordered w-full max-w-xs" value={query.accountNumber} onChange={(e)=>queryUpdateHandler('accountNumber',e.target.value)}/>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">شماره شبا:</span>
                </label>
                <input type="number" className="input input-bordered w-full max-w-xs" value={query.iban} onChange={(e)=>queryUpdateHandler('iban',e.target.value)}/>
            </div>
            <div className=" dropdown">
                <label className="label flex  px-0">
                    <span className="label-text">نوع سپرده:</span>
                    <div tabIndex={1} className="btn m-1">{accountTypeEnums.find((item:any)=>item.id===query.type)?.faTitle}</div>
                </label>
                <ul tabIndex={1} className="dropdown-content menu p-2 shadow-xl bg-base-100 w-full">
                    {
                        accountTypeEnums.map((item:any)=>{
                            return(
                                <li key={item.id} className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'} onClick={()=>queryUpdateHandler('type',item.id)}>
                                    {item.faTitle}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="dropdown">
                <label className="label flex px-0">
                    <input type="text" placeholder={'کشور'} className="input input-bordered w-full max-w-xs" onChange={searchCountryHandler}/>
                    <div tabIndex={1} className="btn m-1">{country.countryName}</div>
                </label>
                {countries.length ? <ul tabIndex={0} className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full" style={{flexWrap:'unset'}}>
                    {countries.map((c:countryType)=>{
                            return(
                                <li key={c.countryId} className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'} onClick={()=>setCountry(c)}>
                                    {c.countryName}
                                </li>
                            )
                        })}
                </ul>:null}
            </div>
            <div className="dropdown">
                <label className="label flex px-0">
                    <input type="text" placeholder={'استان'} className="input input-bordered w-full max-w-xs" onChange={searchProvinceHandler}/>
                    <div tabIndex={1} className="btn m-1">{province.provinceName}</div>
                </label>
                <ul tabIndex={0} className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full" style={{flexWrap:'unset'}}>
                    {(provinces.length || country.countryId>0) ?
                        provinces.map((p:provinceType)=>{
                            return(
                                <li key={p.provinceId} className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'} onClick={()=>setProvince(p)}>
                                    {p.provinceName}
                                </li>
                            )
                        }):'لطفا کشور را انتخاب کنید'
                    }
                </ul>
            </div>
            <div className="dropdown">
                <label className="label flex px-0">
                    <input type="text" placeholder={'شهر'} className="input input-bordered w-full max-w-xs" onChange={searchCityHandler}/>
                    <div tabIndex={1} className="btn m-1">{city.cityName}</div>
                </label>
                <ul tabIndex={0} className="dropdown-content max-h-[200px] overflow-y-auto menu p-2 shadow-md bg-base-100 w-full" style={{flexWrap:'unset'}}>
                    {(cities.length || province.countryId) ?
                        cities.map((c:cityType)=>{
                            return(
                                <li key={c.cityId} className={'odd:bg-gray-200 cursor-pointer hover:bg-gray-100 px-2 py-1'} onClick={()=> {
                                    setCity(c);
                                    queryUpdateHandler('cityId',c.cityId)
                                }}>
                                    {c.cityName}
                                </li>
                            )
                        }):'لطفا استان را انتخاب کنید'
                    }
                </ul>
            </div>
            <div className="flex items-center ">
                <input className="ml-2 checkbox" checked={query.isDefault} onChange={(e)=>queryUpdateHandler('isDefault',e.target.checked)} type="checkbox" dir={'ltr'} name="confirm"/>
                <label htmlFor="confirm">حساب پیش فرض</label>
            </div>
            <button className={'button w-fit mr-auto'} type={'submit'}>
                تایید
            </button>
        </form>
    )
}