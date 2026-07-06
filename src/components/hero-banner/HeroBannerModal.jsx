"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HeroBannerModal({
  open,
  onOpenChange,
  banner,
  onSubmit,
  loading,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (banner) {
      setAlt(banner.alt || "");
      setPreview(banner.imageUrl);
      setImage(null);
    } else {
      setAlt("");
      setPreview("");
      setImage(null);
    }
  }, [banner, open]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!banner && !image) {
      alert("Please select a banner image.");
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    formData.append("alt", alt);

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {banner ? "Update Hero Banner" : "Add Hero Banner"}
          </DialogTitle>

          <DialogDescription>
            Upload a banner image that will appear in the homepage carousel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <Label>Banner Image</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={preview}
                alt="Preview"
                width={900}
                height={450}
                className="h-60 w-full object-cover"
              />
            </div>
          )}

          <div>
            <Label>Alt Text</Label>

            <Input
              placeholder="Summer Sale Banner"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : banner
              ? "Update Banner"
              : "Add Banner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}