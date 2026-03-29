const ImpactStats = () => {
  const stats = [
    { value: "500+", label: "People Helped" },
    { value: "1+", label: "Year's of Service" },
    { value: "100+", label: "Volunteers" },
  ];

  return (
    <section className=" bg-gradient-to-r from-red-200 to-blue-300 py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 text-center sm:grid-cols-2 md:grid-cols-3">
        {stats.map((s, i) => (
          <div key={i}>
            <h3 className="text-5xl font-extrabold text-red-500">
              {s.value}
            </h3>
            <p className="mt-3 text-s tracking-widest uppercase opacity-80">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
