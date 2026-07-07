"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
}) {
  if (!products.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            No Products Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Add your first product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">
              Image
            </TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Price</TableHead>

            <TableHead>Stock</TableHead>

            <TableHead>Featured</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Image
                  src={
                    product.images?.[0]?.imageUrl ||
                    "/placeholder.png"
                  }
                  alt={product.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg border object-cover"
                />
              </TableCell>

              <TableCell className="font-medium">
                {product.name}
              </TableCell>

              <TableCell>
                {product.category}
              </TableCell>

              <TableCell>
                ${product.price}
              </TableCell>

              <TableCell>
                {product.stock}
              </TableCell>

              <TableCell>
                {product.featured ? (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                    Yes
                  </span>
                ) : (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold">
                    No
                  </span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}