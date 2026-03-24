import { createMediaAsset, deleteMediaAsset, getMediaAssets, updateMediaAsset } from "@/lib/mock-data";

export async function GET() {
  const media = await getMediaAssets();
  return Response.json({ data: media });
}

export async function POST(request: Request) {
  const body = await request.json();
  const media = await createMediaAsset(body);
  return Response.json({ data: media });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const media = await updateMediaAsset(body.id, body);
  return Response.json({ data: media });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteMediaAsset(id);
  return Response.json({ data: result });
}
