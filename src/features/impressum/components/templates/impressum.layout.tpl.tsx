import { PublicLayout } from "../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../shared/atoms/headers/header.atm";
import { ImpressumSection } from "../molecules/impressumSection.mol";
import { textContentSettings } from "../../../../settings/textContent.settings";

export function ImpressumLayout() {
  return (
    <PublicLayout>
      <Header title="Impressum" />
      <main className="flex justify-center px-4 py-6 md:py-8">
        <div className="flex w-full max-w-3xl flex-col gap-4">
          {textContentSettings.impressum.sections.map((section) => (
            <ImpressumSection
              key={section.content}
              content={section.content}
              sectionClassName="rounded-lg bg-surface-muted p-4 md:p-6"
              contentClassName=""
              textClassName="text-text"
            />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}
