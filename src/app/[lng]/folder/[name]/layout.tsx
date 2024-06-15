import { PropsWithChildren } from "react";

export default function FolderLayout({
  children,
  params,
}: PropsWithChildren & { params: { name: string } }) {
  return (
    <div className="h-screen flex justify-between gap-2 px-4 pt-4">
      <div className="flex-1 max-w-[300px] overflow-auto p-2 no-scrollbar border-r">
        Folders
      </div>
      <div className="flex-1 max-w-[300px] overflow-auto p-2 no-scrollbar border-r">
        Folder {params.name}
      </div>
      <div className="flex-[2] p-2">{children}</div>
    </div>
  );
}
