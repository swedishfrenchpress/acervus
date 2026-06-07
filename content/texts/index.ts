// Registry of in-site reproduced texts, keyed by book slug. The book-view page
// looks a slug up here: a hit means "render this prose in the .prose reader"
// (these books carry `source`/`sourceLabel` in lib/books.ts but no pdf/external).
// Each module default-exports a server component of semantic prose only.

import type { ComponentType } from "react";

import ACypherpunksManifesto from "./a-cypherpunks-manifesto";
import TheCryptoAnarchistManifesto from "./the-crypto-anarchist-manifesto";
import ADeclarationOfTheIndependenceOfCyberspace from "./a-declaration-of-the-independence-of-cyberspace";
import TheConscienceOfAHacker from "./the-conscience-of-a-hacker";
import WhyIWrotePGP from "./why-i-wrote-pgp";
import TheBeautyOfECash from "./the-beauty-of-ecash";
import MeditationsOnCypherpunkNightmares from "./meditations-on-cypherpunk-nightmares";
import DefinitionOfDemocraticCivilization from "./definition-of-democratic-civilization";
import YourSecretRightToCash from "./your-secret-right-to-cash";

export const texts: Record<string, ComponentType> = {
  "a-cypherpunks-manifesto": ACypherpunksManifesto,
  "the-crypto-anarchist-manifesto": TheCryptoAnarchistManifesto,
  "a-declaration-of-the-independence-of-cyberspace":
    ADeclarationOfTheIndependenceOfCyberspace,
  "the-conscience-of-a-hacker": TheConscienceOfAHacker,
  "why-i-wrote-pgp": WhyIWrotePGP,
  "the-beauty-of-ecash": TheBeautyOfECash,
  "meditations-on-cypherpunk-nightmares": MeditationsOnCypherpunkNightmares,
  "definition-of-democratic-civilization": DefinitionOfDemocraticCivilization,
  "your-secret-right-to-cash": YourSecretRightToCash,
};
