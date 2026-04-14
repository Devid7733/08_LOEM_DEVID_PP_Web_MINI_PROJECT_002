import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import ManageProductsClient from "./ManageProductsClient";

export default async function ManageProductsPage() {
  const session = await auth();

  console.log("server session:", session);

  if (!session?.user) {
    redirect("/login?callbackUrl=/manage-products");
  }

  const token = session?.accessToken;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!token) {
    throw new Error("No access token found in session");
  }

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  console.log("products status:", res.status);
  console.log("products response:", data);

  if (!res.ok) {
    throw new Error(
      data?.detail || data?.message || "Failed to fetch products"
    );
  }

  const items = Array.isArray(data?.payload) ? data.payload : [];

  const products = items.map((item) => ({
    id: item?.productId,
    name: item?.name || "Unknown product",
    price: Number(item?.price || 0),
    rating: Number(item?.star || 0),
    image: item?.imageUrl || "/placeholder-product.png",
    description: item?.description || "",
    colors: item?.colors || [],
    sizes: item?.sizes || [],
    categoryId: item?.categoryId || "",
  }));

  return (
    <ManageProductsClient
      initialProducts={products}
      token={token}
      baseUrl={baseUrl}
    />
  );
}