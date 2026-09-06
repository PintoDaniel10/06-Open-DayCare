import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function TestAuth() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Auth Test</h1>
      <pre>
        user: {JSON.stringify(user, null, 2)}
      </pre>
      <pre>
        error: {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );
}
