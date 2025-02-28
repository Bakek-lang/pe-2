import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NotificationContainer from "./NotificationContainer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow min-h-screen max-w-screen-xl mx-auto">
        <NotificationContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
