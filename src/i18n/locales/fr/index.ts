import { frenchGlobalMessages } from "./global";
import { frenchHomeMessages } from "./home";
import type { TranslationDictionary } from "../../types";

export const frenchMessages = {
  ...frenchGlobalMessages,
  ...frenchHomeMessages,
} as const satisfies TranslationDictionary;
