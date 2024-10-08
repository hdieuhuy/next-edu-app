import { DocumentIcon } from "@/components/icons";
import { PlayCircleIcon, User } from "lucide-react";
import React, { useState } from "react";
import ButtonEnroll from "./ButtonEnroll";
import CouponForm from "./CouponForm";

function CourseWidget({ data, findUser }: { data: any; findUser: any }) {
  const [price, setPrice] = useState<number>(data.price);
  const [coupon, setCoupon] = useState("");
  return (
    <>
      <div className="bg-white rounded-lg p-5 dark:bg-grayDarker dark:border-slate-500">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-xl font-bold ">
            {price.toLocaleString("en-EN")}đ
          </strong>
          <span className="text-slate-400 line-through text-sm ">
            {data.sale_price.toLocaleString()}đ
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm ">
            {Math.floor((data.price / data.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="font-bold mb-3 text-sm">Khóa học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500 dark:text-white">
          <li className="flex items-center gap-2">
            <PlayCircleIcon className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <PlayCircleIcon className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <User className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <DocumentIcon className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
          amount={price}
          coupon={coupon}
        ></ButtonEnroll>
        <CouponForm
          setCouponId={setCoupon}
          originalPrice={data.price}
          setPrice={setPrice}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        ></CouponForm>
      </div>
    </>
  );
}

export default CourseWidget;
