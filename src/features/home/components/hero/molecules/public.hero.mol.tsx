import { GetStartedBtn } from "../atoms/hero.getStarted.btn.atm";
import { HeroHeader } from "../atoms/hero.header.atm";
import { DisplayTextContent } from "../../../../../shared/atoms/textContent/textContent.atm";
import type { TPublicHeroProps } from "../types/public.hero.types";
import { textContentSettings } from "../../../../../settings/textContent.settings";

export function PublicHero({ title, backgroundImageUrl }: TPublicHeroProps) {
  return (
    <section
      className="flex flex-1 items-center bg-cover bg-center px-4 py-12 md:py-16"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center text-center md:ml-[15%] md:mr-auto">
        <HeroHeader title={title} />
        <DisplayTextContent
          className="text-hero-text"
          content={textContentSettings.hero.text}
        />
        <GetStartedBtn url="/game" label="Play now!" />
      </div>
    </section>
  );
}
