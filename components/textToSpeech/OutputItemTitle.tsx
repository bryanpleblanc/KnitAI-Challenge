import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
const OutputItemTitle = ({
  status,
  genre,
  time,
}: {
  status: string;
  genre: string;
  time: string;
}) => {
  const statusClass =
    status === "Converting" ? "text-yellow-500" : "text-green-500";
  const now = dayjs();
  const timeSince = dayjs(time);
  const formattedTime =
    now.diff(timeSince, "minute") < 1
      ? "now"
      : now.diff(timeSince, "hour") < 1
      ? `${now.diff(timeSince, "minute")} mins ago`
      : now.diff(timeSince, "day") < 1
      ? `${now.diff(timeSince, "hour")} hours ago`
      : `${now.diff(timeSince, "day")} days ago`;

  return (
    <div className="flex items-center justify-left mb-1 pl-2 pr-2 pt-2">
      <span className={`text-xs ${statusClass} mr-2`}>● {status}</span>
      <span className="text-xs text-gray-500 mr-2">● {formattedTime} ●</span>
      <span className="text-xs text-gray-600 mr-2 underline">{genre}</span>
    </div>
  );
};

export default OutputItemTitle;
