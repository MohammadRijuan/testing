"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function HeroBannerTable({
  banners = [],
  onEdit,
  onDelete,
}) {
  if (!banners.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            No Hero Banner Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload your first hero banner.
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
            <TableHead className="w-[220px]">
              Banner
            </TableHead>

            <TableHead>
              Alt Text
            </TableHead>

            <TableHead>
              Created At
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner._id}>
              <TableCell>
                <Image
                  src={banner.imageUrl}
                  alt={banner.alt || "Hero Banner"}
                  width={220}
                  height={120}
                  className="h-24 w-52 rounded-lg border object-cover"
                />
              </TableCell>

              <TableCell>
                {banner.alt || "-"}
              </TableCell>

              <TableCell>
                {new Date(
                  banner.createdAt
                ).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(banner)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete(banner)}
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