import { type } from "os";

type PropsCard =  {
  cardName?: string;
  cardName2?: string;
  cardType?: number;
  codeorFill?: number;
  colorType?: number;
  createTime?: string | null;
  examNoLen?: number;
  fillType?: number;
  headConfig?: string | null;
  id?: string | number;
  notice?: number;
  pageSize?:string | null;
  paperAbType?: number;
  paperId?: string | null;
  period?: number;
  quesConfJson?: string | null;
  showQues?: number;
  subName?: string | null;
  updateTime?: string | null;
}

// -------------------------------
export type subType ={
  value:string,
  label:string,
}
export interface Props {
	sheetCardVo: any,
	widthPage: string,
	fillType: string,
	pageColor: string,
}



