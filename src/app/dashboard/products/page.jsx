"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import { Plus } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAxios from "@/hooks/useAxios";

import { Button } from "@/components/ui/button";
import ProductTable from "@/components/products/productTable";


import ProductModal from "@/components/products/productModal";
// import DeleteProductDialog from "@/components/products/deleteProductDialoge";

export default function ProductsPage() {
  const axios = useAxios();

  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);

  const {
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const res = await axios.get("/products");

      return res.data.data;
    },
  });

  // Create Product

  const createMutation = useMutation({
    mutationFn: async (formData) => {
      return axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setOpenModal(false);

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Product created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong!",
      });
    },
  });

  // Update Product

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      return axios.patch(
        `/products/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setOpenModal(false);

      setSelectedProduct(null);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong.",
      });
    },
  });

    // Delete Product

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/products/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setDeleteOpen(false);

      setProductToDelete(null);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong.",
      });
    },
  });

  const handleSubmit = (formData) => {
    if (selectedProduct) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleDeleteClick = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(product._id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-muted-foreground">
          Loading products...
        </p>
      </div>
    );
  }
    return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage all products from here.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>

      </div>

      {/* Product Table */}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Product Modal */}

      <ProductModal
        open={openModal}
        onOpenChange={(value) => {
          setOpenModal(value);

          if (!value) {
            setSelectedProduct(null);
          }
        }}
        product={selectedProduct}
        onSubmit={handleSubmit}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
      />

    </div>
  );
}