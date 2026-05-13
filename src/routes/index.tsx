import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Schedule } from "@/components/Schedule";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalakruti 2.0 — A Fusion Work of Art | MEA × PIESA" },
      {
        name: "description",
        content:
          "Kalakruti 2.0 cultural fest at Basaveshwar Engineering College — dance, singing, rangoli and fashion. Organized by MEA in association with PIESA.",
      },
      { property: "og:title", content: "Kalakruti 2.0 — A Fusion Work of Art" },
      { property: "og:description", content: "A celebration of dance, music, art and fashion at BEC." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Schedule />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
