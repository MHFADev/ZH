import { formatCurrency } from "./currency";

export function formatWhatsAppUrl(phone: string, text: string) {
  const normalized = phone.replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

type OrderSummaryItem = {
  id: string;
  qty: number;
  size?: string;
  name: string;
  price: number;
  total: number;
};

export function buildOrderMessage(items: OrderSummaryItem[], total: number, customerName: string, address: string) {
  let body = "Pesanan Zhkitchen:%0A";
  items.forEach((it) => {
    const sizePart = it.size ? ` (${it.size})` : "";
    body += `- ${it.qty}x ${it.name}${sizePart}: ${formatCurrency(it.price)}%0A`;
  });
  body += `Total: ${formatCurrency(total)}%0A`;
  body += `Nama: ${customerName}%0A`;
  body += `Alamat: ${address}`;
  return body;
}
