import { frenchGlobalMessages } from "./global";
import { frenchHomeMessages } from "./home";
import { frenchFoundationMessages } from "./foundation";
import type { TranslationDictionary } from "../../types";

export const frenchMessages = {
  ...frenchGlobalMessages,
  ...frenchHomeMessages,
  ...frenchFoundationMessages,
} as const satisfies TranslationDictionary;
