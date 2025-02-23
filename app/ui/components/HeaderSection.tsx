export default function HeaderSection({ title }: { title: string }) {
  return (
    <div className="relative flex justify-between rounded-b-lg bg-black text-text-dark">
      <div className="relative flex justify-between" style={{ width: "5%" }}>
        <div className="rounded-l" style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
        <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
      </div>
      <div style={{ width: "80%", padding: "10px" }}>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div style={{ width: "10%", padding: "10px" }}>
        <div className="w-[80%] md:w-[100%]">
          <img src="/logo.svg" alt="Author Image" />
        </div>
      </div>
    </div>
  );
}