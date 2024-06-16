import { LangSwitch } from "@/app/components/molecules/lang-switch";
import { ThemeToggle } from "@/app/components/molecules/theme-toggle";
import { getI18n } from "@/app/i18n";
import { Folder } from "@/app/components/organisms/sidebar/folder";
import { LogoutButton } from "@/app/components/molecules/logout-button";
import { getEmailsCountByFolder } from "@/domain/emails";
import { Skeleton } from "./skeleton";

interface Props {
  lng: string;
}

export async function Sidebar({ lng }: Props) {
  const { t } = await getI18n(lng, "common");
  const folderAmounts = await getEmailsCountByFolder();

  return (
    <div className="flex flex-col justify-between h-full pb-3">
      <div className="flex flex-col overflow-auto no-scrollbar gap-1">
        {folderAmounts.map((folder) => (
          <Folder
            key={folder.name}
            name={folder.name}
            count={folder.amount}
            href={`/${lng}/folder/${folder.name}`}
          >
            {t(`folder_name.${folder.name}`)}
          </Folder>
        ))}
      </div>
      <div className="flex flex-col justify-end pt-3">
        <div className="flex gap-2">
          <LogoutButton lng={lng} />
          <LangSwitch />
          <ThemeToggle t={t("theme", { returnObjects: true })} />
        </div>
      </div>
    </div>
  );
}

Sidebar.Skeleton = Skeleton;
