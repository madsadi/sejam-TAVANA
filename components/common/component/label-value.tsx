export default function LabelValue({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className={"space-y-2 font-medium text-sm"}>
      {title && <div>{title}:</div>}
      <div>{value ? value : "-"}</div>
    </div>
  );
}
