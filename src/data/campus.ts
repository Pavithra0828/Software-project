import hero from "@/assets/campus-hero.jpg";
import library from "@/assets/library.jpg";
import lab from "@/assets/lab.jpg";
import canteen from "@/assets/canteen.jpg";
import sports from "@/assets/sports.jpg";
import auditorium from "@/assets/auditorium.jpg";
import fest from "@/assets/fest.jpg";
import hackathon from "@/assets/hackathon.jpg";
import hostel from "@/assets/hostel.jpg";
import transport from "@/assets/transport.jpg";

export const img = { hero, library, lab, canteen, sports, auditorium, fest, hackathon, hostel, transport };

export const nav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/departments", label: "Departments" },
  { to: "/student-hub", label: "Student Hub" },
  { to: "/events", label: "Events" },
  { to: "/clubs", label: "Campus Life" },
  { to: "/about", label: "About" },
] as const;

export const allPages = [
  { to: "/explore", label: "Campus Explorer" },
  { to: "/campus-3d", label: "Interactive 3D Campus" },
  { to: "/departments", label: "Departments" },
  { to: "/student-hub", label: "Student Hub" },
  { to: "/events", label: "Events" },
  { to: "/clubs", label: "Clubs & Activities" },
  { to: "/food", label: "Food & Canteen" },
  { to: "/facilities", label: "Campus Facilities" },
  { to: "/transport", label: "Transport" },
  { to: "/emergency", label: "Emergency" },
  { to: "/stories", label: "Campus Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 25, suffix: "+", label: "Departments" },
  { value: 40, suffix: "+", label: "Labs" },
  { value: 5, suffix: "K+", label: "Students" },
  { value: 100, suffix: "+", label: "Campus Activities" },
];

export type Building = {
  id: string; name: string; tagline: string; hours: string; floors: number;
  facilities: string[]; pos: [number, number, number]; size: [number, number, number]; image: string;
};

export const buildings: Building[] = [
  { id: "main", name: "Main Block", tagline: "The administrative and academic heart of campus.", hours: "8:00 AM – 6:00 PM", floors: 5, facilities: ["Admin Office", "Lecture Halls", "Exam Cell"], pos: [0, 0, 0], size: [3.2, 2.6, 2], image: hero },
  { id: "library", name: "Central Library", tagline: "Your quiet space for study, research and discovery.", hours: "8:00 AM – 10:00 PM", floors: 3, facilities: ["60K+ Books", "Digital Library", "Reading Rooms"], pos: [-4.2, 0, -1.5], size: [2.2, 1.8, 1.8], image: library },
  { id: "labs", name: "Computer Labs", tagline: "Hands-on computing with modern workstations.", hours: "9:00 AM – 8:00 PM", floors: 4, facilities: ["12 Labs", "GPU Cluster", "IoT Studio"], pos: [4.2, 0, -1.5], size: [2.2, 2.2, 1.8], image: lab },
  { id: "canteen", name: "Canteen", tagline: "Good food, good breaks, good company.", hours: "7:30 AM – 9:00 PM", floors: 1, facilities: ["400 Seats", "Veg & Non-veg", "Juice Bar"], pos: [-3.8, 0, 3], size: [2, 0.9, 1.6], image: canteen },
  { id: "auditorium", name: "Auditorium", tagline: "Where symposiums, fests and ideas take the stage.", hours: "On event days", floors: 2, facilities: ["1,200 Seats", "Surround Audio", "Green Rooms"], pos: [3.8, 0, 3], size: [2.4, 1.3, 2], image: auditorium },
  { id: "sports", name: "Sports Ground", tagline: "Play, train and compete under open skies.", hours: "6:00 AM – 7:00 PM", floors: 0, facilities: ["Football Field", "400m Track", "Indoor Courts"], pos: [0, 0, 5.2], size: [4, 0.08, 2.2], image: sports },
];

export const destinations = buildings.map((b) => ({ title: b.name, text: b.tagline, image: b.image }));

export const hubItems = [
  { icon: "BookOpen", title: "Notes", text: "Unit-wise notes shared by faculty." },
  { icon: "FileText", title: "Question Papers", text: "Five years of previous papers." },
  { icon: "CalendarClock", title: "Exam Schedule", text: "Internal and semester exam dates." },
  { icon: "FlaskConical", title: "Lab Manuals", text: "Experiments, procedures, records." },
  { icon: "GraduationCap", title: "Academic Calendar", text: "Holidays, terms and deadlines." },
  { icon: "Link2", title: "Student Resources", text: "Portals, forms and helpful links." },
] as const;

export const events = [
  { title: "Tech Symposium 2026", date: "Nov 14", location: "Auditorium", category: "Symposium", image: auditorium },
  { title: "Applied AI Workshop", date: "Nov 21", location: "Computer Lab 3", category: "Workshop", image: lab },
  { title: "Rangrez Cultural Fest", date: "Dec 05", location: "Open Air Theatre", category: "Cultural", image: fest },
  { title: "36-Hour Hackathon", date: "Dec 12", location: "Innovation Lab", category: "Technical", image: hackathon },
  { title: "Annual Sports Meet", date: "Jan 18", location: "Sports Ground", category: "Sports", image: sports },
  { title: "Research Paper Day", date: "Jan 25", location: "Central Library", category: "Symposium", image: library },
];
export const eventCategories = ["All", "Technical", "Cultural", "Sports", "Workshop", "Symposium"];

export const food = [
  { name: "Masala Dosa", category: "Breakfast", price: 45, veg: true },
  { name: "Idli Vada Combo", category: "Breakfast", price: 40, veg: true },
  { name: "South Indian Thali", category: "Lunch", price: 90, veg: true },
  { name: "Chicken Biryani", category: "Lunch", price: 120, veg: false },
  { name: "Samosa (2 pcs)", category: "Snacks", price: 25, veg: true },
  { name: "Egg Puff", category: "Snacks", price: 20, veg: false },
  { name: "Filter Coffee", category: "Drinks", price: 15, veg: true },
  { name: "Fresh Lime Soda", category: "Drinks", price: 30, veg: true },
];

export const facilities = [
  { title: "Library", image: library, span: "md:col-span-2 md:row-span-2" },
  { title: "Laboratories", image: lab, span: "" },
  { title: "Auditorium", image: auditorium, span: "" },
  { title: "Sports Complex", image: sports, span: "md:col-span-2" },
  { title: "Hostel", image: hostel, span: "" },
  { title: "Medical Centre", image: hero, span: "" },
  { title: "Innovation Lab", image: hackathon, span: "md:col-span-2" },
  { title: "Cafeteria", image: canteen, span: "md:col-span-2" },
];

export const explorerCategories = [
  { cat: "Academic", items: [{ t: "Main Block", i: hero }, { t: "Computer Labs", i: lab }, { t: "Central Library", i: library }] },
  { cat: "Food", items: [{ t: "Main Canteen", i: canteen }, { t: "Juice Bar", i: canteen }] },
  { cat: "Sports", items: [{ t: "Sports Ground", i: sports }, { t: "Indoor Courts", i: sports }] },
  { cat: "Accommodation", items: [{ t: "Boys Hostel", i: hostel }, { t: "Girls Hostel", i: hostel }] },
  { cat: "Student Services", items: [{ t: "Auditorium", i: auditorium }, { t: "Innovation Lab", i: hackathon }, { t: "Transport Bay", i: transport }] },
];

export const departments = [
  { name: "Computer Science & Engineering", text: "Software, systems, AI and the theory behind them.", labs: 8, facilities: ["AI Lab", "Cloud Lab"], image: lab },
  { name: "Electronics & Communication", text: "Circuits, signals and embedded systems.", labs: 6, facilities: ["VLSI Lab", "IoT Studio"], image: hackathon },
  { name: "Mechanical Engineering", text: "Design, manufacturing and thermal sciences.", labs: 7, facilities: ["CAD Centre", "Workshop"], image: hero },
  { name: "Civil Engineering", text: "Structures, surveying and sustainable cities.", labs: 5, facilities: ["Survey Lab", "Materials Lab"], image: transport },
  { name: "Information Technology", text: "Networks, data and enterprise applications.", labs: 6, facilities: ["Network Lab", "Data Lab"], image: library },
  { name: "Management Studies", text: "Business, finance and entrepreneurship.", labs: 2, facilities: ["Seminar Hall", "Incubator"], image: auditorium },
];

export const clubs = [
  { name: "Coding Club", text: "Weekly contests and open-source sprints.", image: lab },
  { name: "Robotics Club", text: "Build, wire and race autonomous bots.", image: hackathon },
  { name: "Cultural Club", text: "Dance, music, drama and the annual fest.", image: fest },
  { name: "Photography Club", text: "Photo walks and campus storytelling.", image: hero },
  { name: "Sports Club", text: "Inter-college leagues and fitness drives.", image: sports },
  { name: "Entrepreneurship Club", text: "Pitch nights and startup mentoring.", image: auditorium },
];

export const stories = [
  { title: "A Day on Campus", text: "From 8 AM lectures to late-night library sessions.", image: hero },
  { title: "Inside the Innovation Lab", text: "Where student prototypes become products.", image: hackathon },
  { title: "Meet the Student Clubs", text: "Six clubs, hundreds of members, one campus.", image: fest },
  { title: "From Classroom to Hackathon", text: "How a second-year team won in 36 hours.", image: lab },
];

export const campusLifeRail = [
  { title: "Students", image: hero }, { title: "Clubs", image: fest }, { title: "Sports", image: sports },
  { title: "Cultural Events", image: fest }, { title: "Hackathons", image: hackathon }, { title: "Workshops", image: auditorium },
];

export const busRoutes = [
  { no: "R1", route: "City Centre → Campus", stops: 8, depart: "7:15 AM" },
  { no: "R2", route: "Railway Station → Campus", stops: 6, depart: "7:30 AM" },
  { no: "R3", route: "North Suburbs → Campus", stops: 10, depart: "7:00 AM" },
  { no: "R4", route: "Lake Road → Campus", stops: 7, depart: "7:20 AM" },
];

export const emergency = [
  { name: "Campus Security", phone: "+91 00000 11111", note: "24 × 7" },
  { name: "Medical Centre", phone: "+91 00000 22222", note: "8 AM – 8 PM" },
  { name: "Ambulance", phone: "108", note: "24 × 7" },
  { name: "Fire Services", phone: "101", note: "24 × 7" },
  { name: "Women's Helpline", phone: "181", note: "24 × 7" },
  { name: "Student Counselling", phone: "+91 00000 33333", note: "Mon – Sat" },
];
