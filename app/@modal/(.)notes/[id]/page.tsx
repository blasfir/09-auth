import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
import { fetchNoteServerById } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>
}

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params; 
  const queryClient = new QueryClient();

  
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteServerById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}

