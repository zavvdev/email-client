import { FOLDER_NAMES } from "@/domain/emails/config";
import { LangSwitch } from "@/app/components/molecules/lang-switch";
import { ThemeToggle } from "@/app/components/molecules/theme-toggle";
import { getI18n } from "@/app/i18n";
import { Folder } from "@/app/components/organisms/sidebar/folder";
import { LogoutButton } from "@/app/components/molecules/logout-button";

interface Props {
  lng: string;
}

export async function Sidebar({ lng }: Props) {
  const { t } = await getI18n(lng, "common");

  return (
    <div className="flex flex-col justify-between h-full pb-3">
      <div className="flex flex-col overflow-auto no-scrollbar gap-1">
        <Folder
          name={FOLDER_NAMES.inbox}
          count={99}
          href={`/${lng}/folder/${FOLDER_NAMES.inbox}`}
        >
          {t(`folderName.${FOLDER_NAMES.inbox}`)}
        </Folder>
        <Folder
          name={FOLDER_NAMES.spam}
          count={0}
          href={`/${lng}/folder/${FOLDER_NAMES.spam}`}
        >
          {t(`folderName.${FOLDER_NAMES.spam}`)}
        </Folder>
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
