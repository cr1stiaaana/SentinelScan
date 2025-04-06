export async function GET({ url }) {
  const scriptName = url.searchParams.get("scriptName");
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
