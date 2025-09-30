import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

const sample = products[0];

describe("ProductCard", () => {
  it("renders product name and price and calls onAdd", async () => {
    const handle = jest.fn();
    render(<ProductCard product={sample as any} onAdd={handle} />);

    expect(screen.getByText(sample.name)).toBeInTheDocument();
    const priceText = new RegExp(String(sample.price).replace(/\B(?=(\d{3})+(?!\d))/g, "."), "i");
    expect(screen.getByText(priceText)).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: new RegExp(`Tambah`, "i") });
    await userEvent.click(btn);
    expect(handle).toHaveBeenCalledTimes(1);
    const payload = handle.mock.calls[0][0];
    expect(payload).toMatchObject({
      id: sample.id,
      name: sample.name,
      price: sample.price,
      qty: 1
    });
  });

  it("image has alt text", () => {
    render(<ProductCard product={sample as any} />);
    const img = screen.getByAltText(sample.name);
    expect(img).toBeInTheDocument();
  });
});
