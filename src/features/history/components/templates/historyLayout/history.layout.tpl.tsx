import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { HistorySection } from "../../molecules/historySection.mol";
import { textContentSettings } from "../../../../../settings/textContent.settings";

export function HistoryLayout() {
  return (
    <PublicLayout>
      <Header title="The history of the game" />
      <main className="flex flex-col gap-10 md:gap-16">
        {textContentSettings.history.sections.map((section) => (
          <HistorySection
            key={section.content}
            content={section.content}
            imageUrl={section.imageUrl}
            sectionClassName="flex justify-center px-4 py-8 md:px-12 md:py-12"
            contentClassName="grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
            textClassName="text-text"
            reverse={section.reverse}
          />
        ))}
      </main>
    </PublicLayout>
  );
}
