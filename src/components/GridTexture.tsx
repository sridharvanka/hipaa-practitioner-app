export default function GridTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,19,15,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,19,15,0.04) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
        WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%, #000 50%, transparent 100%)",
        maskImage: "radial-gradient(120% 90% at 50% 0%, #000 50%, transparent 100%)",
      }}
    />
  );
}
