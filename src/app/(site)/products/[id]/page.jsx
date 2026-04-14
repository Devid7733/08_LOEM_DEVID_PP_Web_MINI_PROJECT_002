import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import ProductDetailClient from "../../../../components/product-detail/ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user) {
    redirect(`/login?callbackUrl=/products/${id}`);
  }

  const token = session?.accessToken;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!token) {
    throw new Error("No access token found in session");
  }

  const res = await fetch(`${baseUrl}/products/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.detail || data?.message || "Failed to fetch product detail"
    );
  }

  const item = data?.payload;

  const product = {
    id: item?.id,
    name: item?.name || "Unknown product",
    price: Number(item?.price || 0),
    oldPrice: Number(item?.price || 0) + 14,
    rating: item?.rating || 4,
    description: item?.description || "No description available.",
    image: item?.imageUrl || "/placeholder-product.png",
    colors: item?.colors || [],
    sizes: item?.sizes || [],
    returnTitle: "Free 30-day returns",
    returnDescription: "See return policy details in cart.",
  };

  return <ProductDetailClient product={product} />;
}