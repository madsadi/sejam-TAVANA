export default function LabelValue({
  title,
  value,
  valueClassName,
}: {
  title: string;
  value: any;
  valueClassName?: string;
}) {
  return (
    <div className={"space-y-2 font-medium text-sm"}>
      {title && <div>{title}:</div>}
      <div className={valueClassName}>{value ? value : "-"}</div>
    </div>
  );
}
