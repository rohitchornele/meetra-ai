import { corsair } from "@/server/corsair";

// export async function POST(req: NextRequest) {
//   
// }

export async function GET() {
    const ownerId = "rohitchornele"
  try {
    const ops = await corsair.github.api.repositories.list({owner : "rohitchornele"});

    return Response.json(ops);
  } catch (err) {
    return Response.json(err);
  }
}