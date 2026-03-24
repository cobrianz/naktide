import { createBlogPost, deleteBlogPost, getBlogPosts, updateBlogPost } from "@/lib/mock-data";

export async function GET() {
  const blogs = await getBlogPosts();
  return Response.json({ data: blogs });
}

export async function POST(request: Request) {
  const body = await request.json();
  const blog = await createBlogPost(body);
  return Response.json({ data: blog });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const blog = await updateBlogPost(body.id, body);
  return Response.json({ data: blog });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteBlogPost(id);
  return Response.json({ data: result });
}
