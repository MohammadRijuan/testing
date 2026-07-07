"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductModal({
  open,
  onOpenChange,
  product,
  onSubmit,
  loading,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const [stock, setStock] = useState("");

  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCategory(product.category || "");
      setDescription(product.description || "");

      setPrice(product.price || "");
      setDiscountPrice(product.discountPrice || "");

      setStock(product.stock || "");

      setFeatured(product.featured || false);

      setPreview(product.images?.[0]?.imageUrl || "");

      setImage(null);
    } else {
      setName("");
      setCategory("");
      setDescription("");

      setPrice("");
      setDiscountPrice("");

      setStock("");

      setFeatured(false);

      setPreview("");
      setImage(null);
    }
  }, [product, open]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Product Name Required",
        text: "Please enter product name.",
      });

      return;
    }

    if (!category.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Category Required",
        text: "Please enter category.",
      });

      return;
    }

    if (!price) {
      Swal.fire({
        icon: "warning",
        title: "Price Required",
        text: "Please enter product price.",
      });

      return;
    }

    if (!stock) {
      Swal.fire({
        icon: "warning",
        title: "Stock Required",
        text: "Please enter available stock.",
      });

      return;
    }

    if (!product && !image) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please select a product image.",
      });

      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);

    formData.append("price", price);
    formData.append("discountPrice", discountPrice);

    formData.append("stock", stock);

    formData.append("featured", featured);

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Update Product" : "Add Product"}
          </DialogTitle>

          <DialogDescription>Fill in the information below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Product Image</Label>

            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={800}
              height={400}
              className="h-56 w-full rounded-lg border object-cover"
            />
          )}

          <div>
            <Label>Product Name</Label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="iPhone 16 Pro"
            />
          </div>

          <div>
            <Label>Category</Label>

            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Smartphones"
            />
          </div>

          <div>
            <Label>Description</Label>

            <Textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>

              <Input
                type="number"
                placeholder="999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Label>Discount Price</Label>

              <Input
                type="number"
                placeholder="899"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Stock</Label>

              <Input
                type="number"
                placeholder="100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <Checkbox
                checked={featured}
                onCheckedChange={(checked) => setFeatured(checked === true)}
              />

              <Label className="cursor-pointer">Featured Product</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSave} disabled={loading}>
            {loading
              ? product
                ? "Updating..."
                : "Adding..."
              : product
                ? "Update Product"
                : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
