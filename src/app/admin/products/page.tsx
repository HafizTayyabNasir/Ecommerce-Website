export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[rgb(var(--background))] p-5 rounded-xl border border-[rgb(var(--border))]">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Manage your store catalog and inventory.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
          />
        </div>
        <select className="px-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
          <option value="">All Categories</option>
          <option value="apparel">Apparel</option>
          <option value="accessories">Accessories</option>
        </select>
        <select className="px-4 py-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
          <option value="">Status</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--secondary)/0.5)]">
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Inventory
                </th>
                <th className="text-right text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Price
                </th>
                <th className="text-right text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[rgb(var(--muted-foreground))]">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const totalInventory = product.variants.length > 0 
                    ? product.variants.reduce((acc, curr) => acc + curr.quantity, 0)
                    : product.quantity || 0;
                    
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-[rgb(var(--secondary)/0.3)] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-[rgb(var(--muted))] shrink-0 flex items-center justify-center text-[8px] uppercase font-bold text-[rgb(var(--muted-foreground))]">
                            IMG
                          </div>
                          <div>
                            <Link href={`/admin/products/${product.id}`} className="font-medium text-sm hover:text-[rgb(var(--accent))] transition-colors">
                              {product.name}
                            </Link>
                            <p className="text-xs text-[rgb(var(--muted-foreground))]">
                              {product.variants.length} variants
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm">{product.category?.name || "—"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={product.status === "ACTIVE" ? "success" : product.status === "DRAFT" ? "secondary" : "default"}
                          className="text-[10px]"
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm ${totalInventory <= 5 ? "text-[rgb(var(--warning))] font-medium" : ""}`}>
                          {totalInventory} in stock
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-medium">
                          {formatPrice(Number(product.price))}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                            <Link href={`/admin/products/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-[rgb(var(--destructive))] hover:text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive)/0.1)]">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[rgb(var(--border))] flex items-center justify-between text-sm text-[rgb(var(--muted-foreground))]">
          <span>Showing {products.length} products</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

