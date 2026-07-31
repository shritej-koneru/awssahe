import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventDetail from "../../components/EventDetail";
import { getEventById, getEventIds } from "../../lib/events";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEventIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return { title: "Event not found — AWS Student Builders Group" };
  }

  return {
    title: `${event.title} — AWS Student Builders Group`,
    description: event.tagline,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
