import dayjs from "dayjs";
import IconText from "@/src/components/common/IconText";
import { IcCalendar, IcClock } from "@/src/assets/icons";

const PostTime = ({
  date,
  readingTime,
}: {
  date: string;
  readingTime: number;
}) => {
  return (
    <div className="flex gap-2 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
      <IconText Icon={IcCalendar} text={dayjs(date).format("YY.MM.DD")} />
      <IconText Icon={IcClock} text={`${readingTime}분`} />
    </div>
  );
};

export default PostTime;
