import { Ornament } from "./Ornament";

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground pt-16 pb-8 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <Ornament className="mx-auto w-48 text-gold mb-8" />

        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl text-gold mb-2">Kalakruti 2.0</h3>
            <p className="font-script text-2xl text-gold/80">A Fusion Work of Art</p>
            <p className="text-sm opacity-80 mt-4 max-w-md">
              Organized by the Mechanical Engineering Association at
              Basaveshwar Engineering College, Bagalkot.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg text-gold mb-3 text-center">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80 text-center">
              <li><a href="#about" className="hover:text-gold transition">About</a></li>
              <li><a href="#events" className="hover:text-gold transition">Events</a></li>
              <li><a href="#schedule" className="hover:text-gold transition">Schedule</a></li>
              <li><a href="#events" className="hover:text-gold transition">Register</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-gold mb-3 text-center">Contact</h4>
            <p className="text-sm opacity-80 text-center">+91 78991 32365</p>
            <p className="text-sm opacity-80 text-center">+91 96869 37632</p>
            <p className="text-sm opacity-80 text-center">+91 81237 08779</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-70">© 2026 MEA · Basaveshwar Engineering College</p>
          <p className="font-script text-xl text-gold/80">कलाकृति · कला · संस्कृति</p>
        </div>
      </div>
    </footer>
  );
}
