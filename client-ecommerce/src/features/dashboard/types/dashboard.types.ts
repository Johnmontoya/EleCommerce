export interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  status: "In Transit" | "Delivered";
  total: number;
}
