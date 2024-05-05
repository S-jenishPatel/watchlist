type TLink = {
  title: string;
  link: string;
};
const links: TLink[] = [
  { title: "Home", link: "/home" },
  { title: "Wishlist", link: "/wishlist" },
  { title: "Profile", link: "/profile" },
];
function Navbar() {
  return <div>navbar</div>;
}

export default Navbar;
