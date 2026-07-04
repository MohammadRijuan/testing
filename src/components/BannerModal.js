"use client";

import { useState } from "react";

export default function BannerModal({ onClose }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const submit = async () => {
    await fetch("/api/banners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, image }),
    });

    onClose();
  };

  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-4">Add Banner</h2>

        <input
          type="text"
          placeholder="Banner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-black placeholder-gray-500 mb-4"
        />

        <input
          type="file"
          onChange={handleImage}
          className="w-full border border-gray-300 rounded-md p-2 text-black mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}