
import { SidebarDemo } from "./_components/sidebardemo";
import axios from "axios";

export default function Home() {
  axios.defaults.withCredentials = true;

  return (
    <main>
      {/* <Navbar /> */}
      <SidebarDemo />
    </main>
  );
}
