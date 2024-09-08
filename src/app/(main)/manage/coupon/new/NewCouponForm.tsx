"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { ECouponType } from "@/_types/enums";
import { couponTypes } from "@/constants";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { getAllCourses } from "@/lib/actions/course.action";
import { debounce } from "lodash";
import { Checkbox } from "@/components/ui/checkbox";
import InputFormatCurrency from "@/components/ui/input-format";
const formSchema = z.object({
  title: z
    .string({
      message: "Tiêu đề không được để trống",
    })
    .min(10, "Tiêu đề phải có ít nhất 10 ký tự"),
  code: z
    .string({
      message: "Mã giảm giá không được để trống",
    })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.string().optional(),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
const NewCouponForm = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active: true,
      type: ECouponType.PERCENT,
      value: "",
      limit: 0,
      title: "",
      code: "",
      start_date: "",
      end_date: "",
      courses: [],
    },
  });

  const couponTypeWatch = form.watch("type");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ""));
      if (
        couponType === ECouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError("value", {
          message: "Giá trị không hợp lệ",
        });
      }
      const newCoupon = await createCoupon({
        ...values,
        courses: selectedCourses.map((course) => course._id),
        value: couponValue,
        start_date: startDate,
        end_date: endDate,
      });
      if (newCoupon.code) {
        toast.success("Tạo mã giảm giá thành công");
        form.reset();
        setStartDate(undefined);
        setEndDate(undefined);
        setFindCourse([]);
        setSelectedCourses([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const courseList = await getAllCourses({ params: { search: value } });
      setFindCourse(courseList);
      if (!value) setFindCourse([]);
    },
    250
  );

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course]);
    } else {
      setSelectedCourses((prev) =>
        prev.filter((selectedCourse) => selectedCourse._id !== course._id)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    className="font-bold"
                    placeholder="Mã giảm giá"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    defaultValue={ECouponType.PERCENT}
                    className="flex gap-5"
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        className="flex items-center space-x-2"
                        key={type.value}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value} className="cursor-pointer">
                          {type.title}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <>
                    {couponTypeWatch === ECouponType.PERCENT ? (
                      <Input
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    ) : (
                      <InputFormatCurrency
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div className="flex flex-col justify-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Tìm kiếm khóa học..."
                      onChange={handleSearchCourse}
                    />
                    {findCourse && findCourse.length > 0 && (
                      <div className="flex flex-col gap-2 !mt-5">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                              checked={selectedCourses.some(
                                (el) => el._id === course._id
                              )}
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="flex items-start flex-wrap gap-2 !mt-5">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <X className="size-5 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="primary" className="w-[150px] ml-auto flex">
          Tạo mã
        </Button>
      </form>
    </Form>
  );
};

export default NewCouponForm;