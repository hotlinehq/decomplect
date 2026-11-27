import { db } from "./db";
import { calculateTotal, markShipped } from "./orders";
import { getOrder } from "./repository";

export async function getOrderHandler(req: any, res: any) {
  const order = await getOrder(req.params.id);
  if (!order) return res.status(404).end();
  res.json({ id: order.id, status: order.status, total: calculateTotal(order) });
}

export async function shipHandler(req: any, res: any) {
  await markShipped(req.params.id);
  res.status(204).end();
}

// Added for the support team: orders shipped in the last week.
export async function recentShipmentsHandler(_req: any, res: any) {
  const rows = await db.query(
    "SELECT id, customer_id FROM orders WHERE status = 'shipped' AND updated_at > now() - interval '7 days'",
  );
  res.json(rows);
}
