"use client";

import { Button } from "@/components/ui/button";
import getUser from "@/lib/getUser";
import logoutUser from "@/lib/logoutUser";
import { useEffect } from "react";

function UserPage() {
  useEffect(() => {
    (async function () {
      const session = await getUser();

      console.log(session);
    })();
  }, []);
  return (
    <div>
      <Button
        onClick={async () => {
          await logoutUser();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default UserPage;
