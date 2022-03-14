export interface HeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    align: "left" | "center" | "inherit" | "right" | "justify";
  }
  