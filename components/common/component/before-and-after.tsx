import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import { SejamContext } from "../../../pages/main";
import useMutation from "../../../hooks/useMutation";
import { SEJAM_URL } from "../../../api/constants";

export default function BeforeAfterComponent({
  condition,
  warning,
  onConfirm,
}: {
  condition: boolean;
  warning: string;
  onConfirm?: () => void;
}) {
  const { mutate: updateRegistrationState } = useMutation({
    url: `${SEJAM_URL}/api/request/UpdateRegistrationState`,
  });
  const { setLevel, level } = useContext<any>(SejamContext);
  const [loading, setLoading] = useState(false);
  const proceed = () => {
    if (condition) {
      const updateReg = async () => {
        setLoading(true);
        await updateRegistrationState({
          registrationState: 15,
        })
          .then(() => setLevel(level + 1))
          .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
          .finally(() => setLoading(false));
      };
      if (onConfirm) onConfirm();
      level === 3 ? updateReg() : null;
    } else {
      toast.warning(`${warning}`);
    }
  };

  return (
    <div className="flex justify-between mt-5">
      <button className="prevButton w-fit" onClick={() => setLevel(level - 1)}>
        مرحله قبل
      </button>
      <button
        className="button w-fit flex items-center"
        onClick={proceed}
        disabled={loading}
      >
        مرحله بعد
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
  );
}
