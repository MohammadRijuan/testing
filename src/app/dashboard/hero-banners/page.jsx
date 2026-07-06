"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxios from "@/hooks/useAxios";

import HeroBannerTable from "@/components/hero-banner/HeroBannerTable";
import HeroBannerModal from "@/components/hero-banner/HeroBannerModal";
import DeleteBannerDialog from "@/components/hero-banner/DeleteBannerDialog";

export default function HeroBannerPage() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // =====================
  // STATE
  // =====================
  const [openModal, setOpenModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  // =====================
  // GET BANNERS
  // =====================
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: async () => {
      const res = await axios.get("/hero-banners");
      return res.data.data; // unwrap the array
    },
  });

  // =====================
  // CREATE
  // =====================
  const createMutation = useMutation({
    mutationFn: async (formData) => {
      return axios.post("/hero-banners", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero-banners"]);
      setOpenModal(false);

      Swal.fire({
        icon: "success",
        title: "Banner Added",
        text: "Hero banner was added successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error("Create banner failed:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text:
          err.response?.data?.message ||
          "Something went wrong while adding the banner.",
      });
    },
  });

  // =====================
  // UPDATE
  // =====================
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      return axios.patch(`/hero-banners/${selectedBanner._id}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero-banners"]);
      setOpenModal(false);
      setSelectedBanner(null);

      Swal.fire({
        icon: "success",
        title: "Banner Updated",
        text: "Hero banner was updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error("Update banner failed:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Failed to Update",
        text:
          err.response?.data?.message ||
          "Something went wrong while updating the banner.",
      });
    },
  });

  // =====================
  // DELETE
  // =====================
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/hero-banners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero-banners"]);

      Swal.fire({
        icon: "success",
        title: "Banner Deleted",
        text: "Hero banner was deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error("Delete banner failed:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Failed to Delete",
        text:
          err.response?.data?.message ||
          "Something went wrong while deleting the banner.",
      });
    },
  });

  // =====================
  // HANDLERS
  // =====================
  const handleSubmit = (formData) => {
    if (selectedBanner) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setOpenModal(true);
  };

  const handleDelete = (banner) => {
    setBannerToDelete(banner);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!bannerToDelete) return;

    deleteMutation.mutate(bannerToDelete._id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setBannerToDelete(null);
      },
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hero Banner Management</h1>

        <button
          onClick={() => {
            setSelectedBanner(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Add Banner
        </button>
      </div>

      {/* TABLE */}
      <HeroBannerTable
        banners={banners}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODAL */}
      <HeroBannerModal
        open={openModal}
        onOpenChange={setOpenModal}
        banner={selectedBanner}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* DELETE DIALOG */}
      <DeleteBannerDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}