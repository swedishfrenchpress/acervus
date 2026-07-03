// Registry of French in-site reproduced texts, keyed by book slug — the French
// mirror of content/texts/index.ts. The /fr/book view looks a slug up here; a
// hit renders this prose in the .prose reader, a miss falls back to the English
// text under a "pas encore traduit" note (see app/fr/book/[slug]/page.tsx).
//
// Adding a text is a three-point contract — see lib/i18n.ts (FR_SLUGS, frBooks).

import type { ComponentType } from "react";

import ACypherpunksManifesto from "./a-cypherpunks-manifesto";
import TheCryptoAnarchistManifesto from "./the-crypto-anarchist-manifesto";
import ADeclarationOfTheIndependenceOfCyberspace from "./a-declaration-of-the-independence-of-cyberspace";
import YourSecretRightToCash from "./your-secret-right-to-cash";
import DefinitionOfDemocraticCivilization from "./definition-of-democratic-civilization";
import LibertariaInCyberspace from "./libertaria-in-cyberspace";
import MeditationsOnCypherpunkNightmares from "./meditations-on-cypherpunk-nightmares";
import TheBeautyOfECash from "./the-beauty-of-ecash";
import TheConscienceOfAHacker from "./the-conscience-of-a-hacker";
import WhyIWrotePGP from "./why-i-wrote-pgp";

export const frTexts: Record<string, ComponentType> = {
  "a-cypherpunks-manifesto": ACypherpunksManifesto,
  "the-crypto-anarchist-manifesto": TheCryptoAnarchistManifesto,
  "a-declaration-of-the-independence-of-cyberspace":
    ADeclarationOfTheIndependenceOfCyberspace,
  "your-secret-right-to-cash": YourSecretRightToCash,
  "definition-of-democratic-civilization": DefinitionOfDemocraticCivilization,
  "libertaria-in-cyberspace": LibertariaInCyberspace,
  "meditations-on-cypherpunk-nightmares": MeditationsOnCypherpunkNightmares,
  "the-beauty-of-ecash": TheBeautyOfECash,
  "the-conscience-of-a-hacker": TheConscienceOfAHacker,
  "why-i-wrote-pgp": WhyIWrotePGP,
};
