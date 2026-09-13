import { englishGlobalMessages } from "./global";
import { englishHomeMessages } from "./home";
import type { TranslationMessages, TranslationDictionary } from "../../types";

export const englishMessages = {
  ...englishGlobalMessages,
  ...englishHomeMessages,
} as const satisfies TranslationMessages<TranslationDictionary>;
