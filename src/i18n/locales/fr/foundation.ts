import type { TranslationDictionary } from "../../types";

export const frenchFoundationMessages = {
  foundation: {
    mission: {
      kicker: "Mission",
      title: "Donner à chacun des moyens concrets pour comprendre, agir et avancer.",
      body: "OnJarama conçoit un écosystème accessible où l’éducation, l’autonomie, la progression et les connexions utiles peuvent se renforcer mutuellement.",
    },
    vision: {
      kicker: "Notre vision",
      title: "Une technologie utile, guidée par une responsabilité humaine.",
      body: "OJF porte la vision, les principes et les engagements qui donnent une continuité institutionnelle aux initiatives OnJarama.",
      principles: {
        usefulTitle: "Utile et accessible",
        usefulBody: "Des outils compréhensibles, adaptés aux réalités d’usage et ouverts au plus grand nombre.",
        autonomousTitle: "Autonome et cohérent",
        autonomousBody: "Des parcours qui renforcent la capacité d’agir tout en reliant les composantes de l’écosystème.",
        humanTitle: "Humain et durable",
        humanBody: "Des choix responsables, inscrits dans le temps et attentifs aux personnes comme aux institutions.",
      },
    },
  },
} as const satisfies Pick<TranslationDictionary, "foundation">;
