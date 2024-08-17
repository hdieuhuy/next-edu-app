"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/databases/user.model";
import { createOrder } from "@/lib/actions/order.action";
import { createOrderCode } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ButtonEnroll = ({
  user,
  courseId,
  amount,
}: {
  user: IUser;
  courseId: string;
  amount: number;
}) => {
  const router = useRouter();

  const handleEnrollCourse = async () => {
    if (!user?.name || !user._id) {
      toast.error("Vui lòng đăng nhập để mua khóa học");
      return;
    }
    // create new order DH-12345
    try {
      const newOrder = await createOrder({
        code: createOrderCode(),
        user: user._id.toString(),
        course: courseId,
        total: amount,
        amount: amount,
      });

      if (newOrder.code) {
        router.push(`/order/${newOrder.code}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="primary" className="w-full" onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
