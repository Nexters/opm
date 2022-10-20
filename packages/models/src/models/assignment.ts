export type CorrectQuestion =
  | "In december 4th, a volcano was erupted in indonesia and killed more than 40 people."
  | "I think that humans will have to leave and we will go to mars."
  | "I think living independent form parents is better than living together with parent because it can provide experience that can be helpful throughout your life, and it will help you gain responsibility."
  | "I believe young adults want independence from their parents as soon as possible is better because it allows parents and young adults to be free and give more time to get used to society."
  | "At first, the countries were alleys, and also part of the soviet union. But, after the division of the soviet union, they become 3 different countries."
  | "The CNN news about the tonga which is a volcanic island that eruption happen last week, was not able to prevent, or connect to the situations until the weekends."
  | "Students who were required to volunteer rushed to complete their service hours in early high school, they then did significantly less regular volunteer work on the twelfth grade than the service hours of those not required to volunteer."
  | "A recent finding of handedness in marsupials suggests that a trait, other than the presence of a corpus callosum correlates on handedness: bipedalism."
  | "After doing stints at an insurance company and then a bank, the US Department of Agriculture offered Dorothy Andrews the opportunity to employ predictive analytics, and she eagerly accepted it."
  | "The effectiveness of acupuncture in reducing pain has long been attributed by the stimulation of these acupoints, the locations of them were identified thousands of years of ago in China.";

export type ParaphraseQuestion =
  | "Living alone and having independence is better than living together with parents because living by yourself can provide a lot of experience that can benefit your life, and we can gain responsibility of our lives."
  | "Proponents of compulsory volunteering who are in favor of it point out that it allows young people to garner the benefits that volunteering offers."
  | "There are three reasons why computer users were afraid of January 1st because reason one, computers might process 00 as 1900. The second reason is that computers might explode. The third up is the reason that computers might start talking. In 1999 experts of tech feared that in the new year of 2000, the computer’s calendar might process the change of numbers as 99 to 00 and might read it as 1900. The year 2000’s new year was labelled Y2K."
  | "News of violent acts, dismaying her, cause Simone to write and perform her first protest song to express her anguish."
  | "In 1747 the author Samuel Johnson announced an ambitious plan for a new English-language dictionary. He did so with the encouragement of a group of London booksellers."
  | "Stores could increase their prices to make up for this expenditure; the additional cost to consumers if they did so would average 30 cents per shopping trip – hardly enough to keep most consumers away.";

export const CorrectAssignments: Record<number, CorrectQuestion> = {
  1: "In december 4th, a volcano was erupted in indonesia and killed more than 40 people.",
  2: "I think that humans will have to leave and we will go to mars.",
  3: "I think living independent form parents is better than living together with parent because it can provide experience that can be helpful throughout your life, and it will help you gain responsibility.",
  4: "I believe young adults want independence from their parents as soon as possible is better because it allows parents and young adults to be free and give more time to get used to society.",
  5: "At first, the countries were alleys, and also part of the soviet union. But, after the division of the soviet union, they become 3 different countries.",
  6: "The CNN news about the tonga which is a volcanic island that eruption happen last week, was not able to prevent, or connect to the situations until the weekends.",
  7: "Students who were required to volunteer rushed to complete their service hours in early high school, they then did significantly less regular volunteer work on the twelfth grade than the service hours of those not required to volunteer.",
  8: "A recent finding of handedness in marsupials suggests that a trait, other than the presence of a corpus callosum correlates on handedness: bipedalism.",
  9: "After doing stints at an insurance company and then a bank, the US Department of Agriculture offered Dorothy Andrews the opportunity to employ predictive analytics, and she eagerly accepted it.",
  10: "The effectiveness of acupuncture in reducing pain has long been attributed by the stimulation of these acupoints, the locations of them were identified thousands of years of ago in China.",
};

export const ParaphraseAssignments: Record<number, ParaphraseQuestion> = {
  1: "Living alone and having independence is better than living together with parents because living by yourself can provide a lot of experience that can benefit your life, and we can gain responsibility of our lives.",
  2: "Proponents of compulsory volunteering who are in favor of it point out that it allows young people to garner the benefits that volunteering offers.",
  3: "There are three reasons why computer users were afraid of January 1st because reason one, computers might process 00 as 1900. The second reason is that computers might explode. The third up is the reason that computers might start talking. In 1999 experts of tech feared that in the new year of 2000, the computer’s calendar might process the change of numbers as 99 to 00 and might read it as 1900. The year 2000’s new year was labelled Y2K.",
  4: "News of violent acts, dismaying her, cause Simone to write and perform her first protest song to express her anguish.",
  5: "In 1747 the author Samuel Johnson announced an ambitious plan for a new English-language dictionary. He did so with the encouragement of a group of London booksellers.",
  6: "Stores could increase their prices to make up for this expenditure; the additional cost to consumers if they did so would average 30 cents per shopping trip – hardly enough to keep most consumers away.",
};
