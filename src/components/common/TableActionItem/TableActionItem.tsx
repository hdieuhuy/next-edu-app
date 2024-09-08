import { DocumentIcon } from "@/components/icons";
import { commonClassNames } from "@/constants";
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
type TableActionIcon = "edit" | "delete" | "view" | "study";
const TableActionItem = ({
  onClick,
  type,
  url,
}: {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
}) => {
  const icon: Record<TableActionIcon, any> = {
    edit: <Edit2Icon />,
    delete: <Trash2Icon />,
    view: <EyeIcon />,
    study: <DocumentIcon />,
  };
  if (url)
    return (
      <Link href={url} className={commonClassNames.action}>
        {icon[type]}
      </Link>
    );
  return (
    <button className={commonClassNames.action} onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
