import { auth } from "@/auth";

async function UserPage() {
  const session = await auth();
  console.log(session);

  return <div className="">{session?.toString()}</div>;
}

export default UserPage;
