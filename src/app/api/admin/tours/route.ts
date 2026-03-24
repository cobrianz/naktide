import { createTour, deleteTour, getCatalogue, updateTour } from "@/lib/mock-data";

export async function GET() {
  const tours = await getCatalogue();
  return Response.json({ data: tours });
}

export async function POST(request: Request) {
  const body = await request.json();
  const tour = await createTour(body);
  return Response.json({ data: tour });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const tour = await updateTour(body.id, body);
  return Response.json({ data: tour });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteTour(id);
  return Response.json({ data: result });
}
