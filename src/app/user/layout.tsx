import Navbar from "@/components/navbar";

export default async function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="min-h-[80vh] md:px-28 px-2 pt-4 bg-accent">
        {children}
      </section>
    </>
  );
}
