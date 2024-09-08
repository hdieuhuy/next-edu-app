import { PlusCircle } from "lucide-react";
import Link from "next/link";

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      href={url}
      className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
    >
      <PlusCircle />
    </Link>
  );
};

export default BouncedLink;
