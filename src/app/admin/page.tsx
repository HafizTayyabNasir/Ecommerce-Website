export const dynamic = "force-dynamic";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
    description: "vs last 30 days",
  },
  {
    title: "Orders",
    value: "356",
    change: "+15.3%",
    trend: "up" as const,
    icon: ShoppingCart,
    description: "vs last 30 days",
  },
  {
    title: "Customers",
    value: "2,350",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
    description: "Total registered",
  },
  {
    title: "Avg. Order Value",
    value: "$127.08",
    change: "-3.1%",
    trend: "down" as const,
    icon: TrendingUp,
    description: "vs last 30 days",
  },
];

const recentOrders = [
  {
    id: "ORD-2025-0356",
    customer: "John Doe",
    email: "john@example.com",
    total: "$245.00",
    status: "Processing",
    date: "2 min ago",
  },
  {
    id: "ORD-2025-0355",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: "$189.00",
    status: "Paid",
    date: "15 min ago",
  },
  {
    id: "ORD-2025-0354",
    customer: "Mike Wilson",
    email: "mike@example.com",
    total: "$95.50",
    status: "Shipped",
    date: "1 hour ago",
  },
  {
    id: "ORD-2025-0353",
    customer: "Sarah Lee",
    email: "sarah@example.com",
    total: "$312.00",
    status: "Delivered",
    date: "3 hours ago",
  },
  {
    id: "ORD-2025-0352",
    customer: "Chris Brown",
    email: "chris@example.com",
    total: "$67.00",
    status: "Processing",
    date: "5 hours ago",
  },
];

const lowStockProducts = [
  { name: "Phantom Oversized Tee - Black/XL", stock: 3, sku: "PHT-BLK-XL" },
  { name: "Urban Cargo Jogger - Olive/M", stock: 2, sku: "UCJ-OLV-M" },
  { name: "Stealth Hoodie - Gray/L", stock: 1, sku: "STH-GRY-L" },
  { name: "Drift Training Shorts - Black/S", stock: 4, sku: "DTS-BLK-S" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Paid":
      return "success";
    case "Processing":
      return "warning";
    case "Shipped":
      return "accent";
    case "Delivered":
      return "default";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-[rgb(var(--secondary))]">
                <stat.icon className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up"
                    ? "text-[rgb(var(--success))]"
                    : "text-[rgb(var(--destructive))]"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))]">
          <div className="p-5 border-b border-[rgb(var(--border))]">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Recent Orders</h2>
              <a
                href="/admin/orders"
                className="text-xs text-[rgb(var(--accent))] hover:underline"
              >
                View All
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgb(var(--border))]">
                  <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-3">
                    Order
                  </th>
                  <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-3">
                    Total
                  </th>
                  <th className="text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider px-5 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[rgb(var(--border))] last:border-0 hover:bg-[rgb(var(--secondary)/0.5)] transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="text-sm font-medium">{order.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-semibold">{order.total}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={getStatusColor(order.status) as "default" | "secondary" | "accent" | "destructive" | "success" | "warning" | "outline"}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-xs text-[rgb(var(--muted-foreground))]">
                        {order.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[rgb(var(--background))] rounded-xl border border-[rgb(var(--border))]">
          <div className="p-5 border-b border-[rgb(var(--border))]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[rgb(var(--warning))]" />
              <h2 className="font-semibold">Low Stock Alerts</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.sku}
                className="flex items-center justify-between"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">
                    SKU: {product.sku}
                  </p>
                </div>
                <Badge
                  variant={product.stock <= 2 ? "destructive" : "warning"}
                  className="shrink-0"
                >
                  {product.stock} left
                </Badge>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-[rgb(var(--border))]">
            <a
              href="/admin/inventory"
              className="text-xs text-[rgb(var(--accent))] hover:underline"
            >
              View All Inventory →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

