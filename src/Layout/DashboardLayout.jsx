import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SiSkillshare } from "react-icons/si";
import { FaRProject } from "react-icons/fa";
import { RiProjectorLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { SiBloglovin } from "react-icons/si";
import { FaRegRegistered } from "react-icons/fa";

// Catalog of nav entries, grouped like sections in a ledger.
// The two-digit codes are a stable index into "the archive", not a workflow order.
const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { code: "01", to: "/dashboard", label: "Dashboard", icon: RxDashboard, end: true },
      { code: "02", to: "/", label: "Home", icon: FaHome },
    ],
  },
  {
    label: "Content",
    items: [
      { code: "03", to: "/dashboard/add_to_skills", label: "Add to Skills", icon: SiSkillshare },
      { code: "04", to: "/dashboard/allskills", label: "All Skills", icon: SiSkillshare },
      { code: "05", to: "/dashboard/addproject", label: "Add to Project", icon: FaRProject },
      { code: "06", to: "/dashboard/allprojects", label: "All Projects", icon: RiProjectorLine },
      { code: "07", to: "/dashboard/add_to_blogs", label: "Post Blog", icon: MdPostAdd },
      { code: "08", to: "/dashboard/all_blogs", label: "All Blogs", icon: SiBloglovin },
    ],
  },
  {
    label: "Account",
    items: [
      { code: "09", to: "/dashboard/change_password", label: "Change Password", icon: MdOutlinePassword },
      { code: "10", to: "/dashboard/create_new_account", label: "New Account", icon: FaRegRegistered },
    ],
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#12151C] text-[#EDEAE2]">
      {/* Top bar */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#12151C]/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A063]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8891A3]">
              Studio
            </span>
            <span className="text-lg font-semibold tracking-tight">Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-[#EDEAE2]/80 transition hover:border-[#C9A063]/60 hover:text-[#C9A063]"
            >
              Home
            </Link>
            <Link
              
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-[#EDEAE2]/80 transition hover:border-[#C9A063]/60 hover:text-[#C9A063]"
            >
              Profile
            </Link>
            <button
              onClick={handelLogout}
              className="rounded-full bg-[#C9A063] px-4 py-1.5 text-sm font-medium text-[#12151C] transition hover:bg-[#dbb377]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col p-6">
          <Outlet />
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>

          <aside className="min-h-full w-64 border-r border-white/10 bg-[#191E28] px-4 py-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-7 last:mb-0">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8891A3]">
                  {group.label}
                </p>

                <ul className="relative border-l border-white/10 pl-4">
                  {group.items.map(({ code, to, label, icon: Icon, end }) => (
                    <li key={to} className="relative mb-1 last:mb-0">
                      <NavLink
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          [
                            "group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition",
                            isActive
                              ? "bg-white/5 text-[#EDEAE2]"
                              : "text-[#8891A3] hover:bg-white/5 hover:text-[#EDEAE2]",
                          ].join(" ")
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* tick mark on the spine */}
                            <span
                              className={[
                                "absolute -left-4 h-px w-3",
                                isActive ? "bg-[#C9A063]" : "bg-white/10 group-hover:bg-[#C9A063]/60",
                              ].join(" ")}
                            />
                            <span
                              className={[
                                "font-mono text-[11px] tabular-nums",
                                isActive ? "text-[#C9A063]" : "text-[#8891A3]/70 group-hover:text-[#C9A063]",
                              ].join(" ")}
                            >
                              {code}
                            </span>
                            <Icon className="text-base shrink-0" />
                            <span className="truncate">{label}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;