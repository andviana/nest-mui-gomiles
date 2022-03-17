export interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    align: "left" | "center" | "inherit" | "right" | "justify";
    onlyHeader?:boolean;
  }
  