import { Outlet } from "react-router-dom";

export function InvitationLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
