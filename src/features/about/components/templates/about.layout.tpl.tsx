import { PublicLayout } from "../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../shared/atoms/headers/header.atm";
import { AboutSection } from "../molecules/aboutSection.mol";
import { textContentSettings } from "../../../../settings/textContent.settings";

export function AboutLayout() {
  return (
    <PublicLayout>
      <Header title="About Su4u" />
      <main className="flex justify-center px-4 py-6 md:px-8 md:py-8">
        <AboutSection
          content={textContentSettings.about.text}
          sectionClassName="w-full max-w-3xl"
          contentClassName=""
          textClassName="text-primary"
        />
      </main>
    </PublicLayout>
  );
}
