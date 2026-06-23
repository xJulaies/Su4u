import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { RulesSection } from "../../molecules/rulesSection.mol";
import { textContentSettings } from "../../../../../settings/textContent.settings";
import rulesImage from "../../../../../assets/images/rules/rules.png";

export function RulesLayout() {
  return (
    <PublicLayout>
      <Header title="The rules of the game" />
      <RulesSection
        content={textContentSettings.rules.text}
        imageUrl={rulesImage}
        sectionClassName="px-4 py-8 md:px-12 md:py-10"
        contentClassName="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
        textClassName="text-primary"
        imageWrapperClassName="justify-self-center"
      />
    </PublicLayout>
  );
}
