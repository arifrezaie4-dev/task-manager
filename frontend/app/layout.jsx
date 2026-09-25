import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import BootstrapClient from "../components/bootstrapClient";
export const metadata = {
  title: "TaskFlow",
  description: "Task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        <BootstrapClient />
      </body>
    </html>
  );
}   