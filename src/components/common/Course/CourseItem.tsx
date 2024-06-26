import Image from "next/image";
import Link from "next/link";
import { ClockIcon, EyeIcon, StarIcon } from "@/components/icons";
import { ICourse } from "@/databases/corse.model";
const CourseItem = ({ data }: { data: ICourse }) => {
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
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10">
      <Link href={`/course/${data.slug}`} className="block h-[180px] relative">
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
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3 flex justify-between items-center">
          {data.title}
          <span className="font-bold text-primary ml-auto text-base">
            {data.price.toLocaleString()}đ
          </span>
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/course/${data.slug}`}
          className="flex items-center justify-center w-full mt-5 rounded-lg text-white font-semibold bg-primary h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
