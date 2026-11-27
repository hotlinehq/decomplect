import { db } from "./db";

export type OrderRow = {
  id: string;
  customerId: string;
  subtotal: number;
  status: string;
  updatedAt: Date;
};

export async function getOrder(id: string): Promise<OrderRow | undefined> {
  const rows = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
  return rows[0];
}

export async function setStatus(id: string, status: string): Promise<void> {
  await db.query(
    "UPDATE orders SET status = $1, updated_at = now() WHERE id = $2",
    [status, id],
  );
}
