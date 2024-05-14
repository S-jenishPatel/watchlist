import Navbar from "@/components/navbar";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="px-28 max-sm:px-2">{children}</section>
    </>
  );
}
