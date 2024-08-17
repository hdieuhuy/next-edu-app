import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(str: string) {
  // Chuyển đổi chuỗi sang chữ thường
  let slug = str.toLowerCase();

  // Thay thế các ký tự đặc biệt và dấu tiếng Việt bằng gạch ngang
  slug = slug.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  slug = slug.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  slug = slug.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  slug = slug.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  slug = slug.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  slug = slug.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  slug = slug.replace(/đ/g, "d");

  // Thay thế các khoảng trắng bằng gạch ngang
  slug = slug.replace(/\s+/g, "-");

  // Xóa bỏ các ký tự đặc biệt
  slug = slug.replace(/[^a-z0-9-]/g, "");

  return slug;
}

export const createOrderCode = () =>
  `ORDER-${new Date().getTime().toString().slice(-6)}`;
