import ProductsView from "./ProductsView";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/products");
  }

  const token = session?.accessToken;

  if (!token) {
    throw new Error("No access token found in session");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const productsRes = await fetch(`${baseUrl}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const categoriesRes = await fetch(`${baseUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const productsData = await productsRes.json();
  const categoriesData = await categoriesRes.json();

  console.log("session:", session);
  console.log("productsData:", productsData);
  console.log("categoriesData:", categoriesData);

  if (!productsRes.ok) {
    throw new Error(productsData.message || "Failed to fetch products");
  }

  if (!categoriesRes.ok) {
    throw new Error(categoriesData.message || "Failed to fetch categories");
  }

  const categoriesOption = categoriesData.payload.map(c => ({
  value: c.categoryId,
  label: c.name
}));

  return (
    <ProductsView
      allProducts={productsData.payload || []}
      categoryOptions={categoriesOption}
    />
  );
}