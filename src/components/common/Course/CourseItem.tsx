import Image from "next/image";
import Link from "next/link";
import { ClockIcon, EyeIcon, StarIcon } from "@/components/icons";
import { ICourse } from "@/databases/corse.model";
import { commonClassNames } from "@/constants";
const CourseItem = ({
  data,
  cta,
  url,
}: {
  data: ICourse;
  cta?: string;
  url?: string;
}) => {
  const courseInfo = [
    {
      title: data.views,
      icon: (className?: string) => <EyeIcon className={className}></EyeIcon>,
    },
    {
      title: "5.0",
      icon: (className?: string) => <StarIcon className={className}></StarIcon>,
    },
    {
      title: "30h25p",
      icon: (className?: string) => (
        <ClockIcon className={className}></ClockIcon>
      ),
    },
  ];
  const courseUrl = url || `/course/${data.slug}`;
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10  flex flex-col">
      <Link href={courseUrl} className="block h-[180px] relative">
        <Image
          src={data.image}
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px, 100vw"
          priority
        />
        <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span>
      </Link>
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          {data.title}
        </h3>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-grayDark">
            {courseInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <span className="font-bold text-primary text-base">
            {data.price.toLocaleString()}đ
          </span>
        </div>

        <Link href={courseUrl} className={commonClassNames.btnPrimary}>
          {cta || "Xem chi tiết"}
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
