export async function GET({ url }) {
  const scriptName = url.searchParams.get("scriptName");

  // Server-side sessions don't have access to sessionStorage (that's client-side)
  // So this check won't work — see note below.

  switch (scriptName) {
    case "script1":
      console.log("Executing script1...");
      return new Response("Executed script1", { status: 200 });
    case "script2":
      console.log("Executing script2...");
      return new Response("Executed script2", { status: 200 });
    default:
      console.log("Unknown script name:", scriptName);
      return new Response("Unknown script-name", { status: 400 });
  }
}
