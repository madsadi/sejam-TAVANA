import React, { Fragment } from "react";
import { useContext } from "react";
import { SejamContext } from "../../../pages/main";
import Image from "next/image";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Router from "next/router";
import { useAuth } from "react-oidc-context";
import { ChartPieIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import useQuery from "../../../hooks/useQuery";
import { IDP_URL } from "../../../api/constants";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import useSWR from "swr";

interface ProgressBarProps {
  showSteps?: boolean;
}
export default function ProgressBar(props: ProgressBarProps) {
  const { showSteps = true } = props;
  const { level, regInfo } = useContext<any>(SejamContext);
  const { data } = useSWR(`${IDP_URL}/api/users/GetCurrentUserInfo`, {
    revalidateOnMount: true,
  });

  const registerLogin =
    typeof window !== "undefined" && localStorage.getItem("register-login");
  const progress = [
    {
      title: "ایجاد پروفایل",
      level: 0,
    },
    {
      title: "وضعیت سجامی",
      level: 0.5,
    },
    {
      title: "دریافت اطلاعات سجامی",
      level: 1,
    },
    {
      title: "تکمیل اطلاعات",
      level: 2,
    },
    {
      title: "بارگذاری مدارک",
      level: 3,
    },
    {
      title: "تکمیل آزمون",
      level: 4,
    },
    {
      title: "تکمیل تعهدنامه",
      level: 5,
    },
    {
      title: "وضعیت ثبت نام",
      level: 6,
    },
  ];
  const auth = useAuth();

  const logoutHandler = () => {
    if (registerLogin) {
      localStorage.clear();
    } else {
      void auth.signoutRedirect({ id_token_hint: auth.user?.id_token });
    }
    Router.push("/");
  };

  const solutions = [
    {
      name: "پروفایل",
      description: `${data?.result?.firstName + " " + data?.result?.lastName}`,
      href: "/profile",
      icon: ChartPieIcon,
    },
  ];
  return (
    <div
      className={
        "container relative flex flex-row md:flex-col items-center z-10"
      }
    >
      <div className="flex items-center ml-10 md:m-0">
        <Link href={"/main"} className={"!mx-auto md:mt-5 mb-2 min-w-[60px]"}>
          <Image
            src={"/logo-white.svg"}
            height={60}
            width={60}
            alt={"tavana"}
          />
        </Link>
        <div className="absolute hidden md:block left-14">
          <div className="flex ">
            <Popover className={"mr-auto relative h-full"}>
              {data ? (
                <Popover.Button className="flex md:m-0 mr-5 bg-content focus:outline-none  border-2 py-2 px-5 md:h-fit h-full w-fit hover:opacity-70 transition-colors">
                  <UserCircleIcon className={"h-5 w-5 ml-2"} />
                  <p className={"hidden md:block"}>
                    {data?.result?.firstName + " " + data?.result?.lastName}
                  </p>
                </Popover.Button>
              ) : null}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 z-10 mt-5 flex w-full">
                  <div className="overflow-hidden w-full rounded-xl bg-content text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    {solutions.map((item) => (
                      <div
                        key={item.name}
                        className="relative flex gap-x-4 p-2 hover:bg-tavanaPurple hover:text-white text-gray-500 transition-all"
                      >
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                        <div>
                          <a href={item.href} className="font-semibold ">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-black">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex bg-gray-50 w-full text-center">
                      <button
                        className="flex w-full items-center justify-center text-tavanaRed p-3 font-semibold  hover:bg-gray-100 transition-colors"
                        onClick={logoutHandler}
                      >
                        خروج
                        <ArrowLeftOnRectangleIcon
                          className={"h-5 w-5 light:text-black mr-2"}
                        />
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
      {showSteps ? (
        <div className={"relative w-full"}>
          <ul className="flex">
            {progress.map((step: any, index: number) => {
              return (
                <li
                  suppressHydrationWarning={true}
                  className={`relative md:justify-end justify-center items-center font-extrabold grow text-center bg-no-repeat bg-center p-2 md:h-[130px] h-[81px] ${
                    level > step.level
                      ? "step-done"
                      : level === step.level
                      ? regInfo.registrationState === 18 && step.level === 6
                        ? "step-done"
                        : "step-active shadow-[0_2px_0px_0px_#D9D9D9]"
                      : "step-done"
                  }`}
                  key={step.level}
                >
                  <p
                    className={`absolute text-[#262626] flex flex-col text-center justify-center top-0 right-0 w-full h-full text-[120px] font-black ${
                      level > step.level
                        ? ""
                        : level === step.level
                        ? regInfo.registrationState === 18 && step.level === 6
                          ? ""
                          : "text-[#b8b8b8]"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </p>
                  <p
                    className={
                      "pb-5 md:-translate-y-1/2 translate-y-1/2 text-2xl md:text-sm md:p-0"
                    }
                  >
                    {step.title}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <Popover className={"md:hidden mr-auto h-full"}>
        <Popover.Button className="flex flex-col mr-5 bg-content h-full focus:outline-none text-tavanaRed border-b-0 translate-y-0.5 border-2 shadow-[0_2px_0px_0px_#D9D9D9] border-tavanaRed p-2 w-fit hover:opacity-70 transition-colors">
          <UserCircleIcon className={"h-12 w-12 m-auto"} />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div>
                {solutions.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex bg-gray-50">
                <button
                  className="flex mx-auto items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                  onClick={logoutHandler}
                >
                  خروج
                  <ArrowLeftOnRectangleIcon
                    className={"h-5 w-5 light:text-black mr-2"}
                  />
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
