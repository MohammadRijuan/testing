async function getBanners() {
  const res = await fetch("http://localhost:3000/api/banners", {
    cache: "no-store",
  });

  return res.json();
}

export default async function BannersPage() {
  const banners = await getBanners();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Banners</h1>

      <div className="grid grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b._id} className="border p-2">
            <img src={b.image} className="w-full h-40 object-cover" />
            <p>{b.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}