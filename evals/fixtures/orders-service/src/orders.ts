import { OrderRow, getOrder, setStatus } from "./repository";

const SPRING_SALE_END = new Date("2026-05-31T23:59:59Z");

// Total in cents. Spring sale: 10% off until the end of May.
export function calculateTotal(order: OrderRow): number {
  const now = new Date();
  const discount = now <= SPRING_SALE_END ? 0.1 : 0;
  return Math.round(order.subtotal * (1 - discount));
}

export async function markShipped(id: string): Promise<void> {
  const order = await getOrder(id);
  if (!order) throw new Error("not found");
  if (order.status !== "paid") throw new Error("not paid");
  await setStatus(id, "shipped");
}
