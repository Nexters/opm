export type ARTICLE_STATUS = "INIT" | "EDITING" | "DONE" | "COMPLETE";
export interface BoardInfo {
  aId: string;
  uId: string;
  eId: string;
  aTitle: string;
  aDescription: string;
  aContent: string;
  aCategory: string;
  aCreateDate: string;
  aEditDate: string;
  aHit: number;
  aEditList: BoardEditData[];
  aStatus: ARTICLE_STATUS;
}

export interface BoardEditData {
  seq: number;
  aProofread: string;
  aProofreadDate: string;
}

export type CATEGORY =
  | "All"
  | "Story Writing"
  | "Summary Writing"
  | "Essays"
  | "Admissions/Applications"
  | "Business"
  | "Academic Writing"
  | "Assignments"
  | "Other Writings";
export const CategoryList: CATEGORY[] = [
  "All",
  "Story Writing",
  "Summary Writing",
  "Essays",
  "Admissions/Applications",
  "Business",
  "Academic Writing",
  "Assignments",
  "Other Writings",
];
