import { commonClassNames } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationBtn = () => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button className={commonClassNames.paginationButton}>
        <ArrowLeft />
      </button>
      <button className={commonClassNames.paginationButton}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default PaginationBtn;
