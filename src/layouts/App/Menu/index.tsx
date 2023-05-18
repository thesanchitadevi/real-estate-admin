import useAuth from "@/hooks/useAuth";
import Iconify from "@components/iconify";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Icon,
} from "@mui/material";
import { Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const AppMenu: React.FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const locations: {
    icon: React.ReactNode;
    label: string;
    color?: "primary" | "secondary" | "inherit" | "error";
    to?: string;
    func?: () => void;
  }[] = [
    {
      icon: <Iconify icon={"solar:home-angle-bold-duotone"} />,
      label: "Dashboard",
      to: "",
    },
    {
      icon: <Iconify icon={"solar:user-bold-duotone"} />,
      label: "Employee",
      to: "employee",
    },
    {
      icon: <Iconify icon={"solar:stars-bold-duotone"} />,
      label: "Testimonial",
      to: "testimonials",
    },
    // {
    // 	icon: <Iconify icon={"solar:map-arrow-down-bold-duotone"} />,
    // 	label: "Map",
    // 	to: "map",
    // },
    // {
    // 	icon: <Iconify icon={"solar:user-bold-duotone"} />,
    // 	label: "Critics",
    // 	to: "critics",
    // },
    // {
    // 	icon: <Iconify icon={"solar:devices-bold-duotone"} />,
    // 	label: "Platforms",
    // 	to: "platforms",
    // },
    {
      icon: <Iconify icon={"solar:shield-user-bold-duotone"} />,
      label: "Moderators",
      to: "mods",
    },
    {
      icon: <Iconify icon={"solar:settings-bold-duotone"} />,
      label: "Settings",
      to: "settings",
    },
    {
      icon: <Iconify icon={"solar:logout-3-bold-duotone"} />,
      label: "Signout",
      func: logout,
      color: "error",
    },
  ];

	const [search, setSearch] = React.useState("");
	const onSearch = (value: string) => {
		setSearch(value);
	};

	React.useEffect(() => {
		onSearch("");
	}, [open]);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			scroll="body"
			PaperProps={{
				sx: {
					background: "transparent",
					boxShadow: 0,
				},
			}}
			BackdropProps={{
				className: "backdrop-blur-lg",
			}}
		>
			<DialogTitle className="sticky">
				<Input
					bordered={false}
					placeholder="Search Page.."
					className="bg-slate-300 bg-opacity-10 text-xl p-4 px-7 font-bold rounded-full mb-9"
					size="large"
					allowClear
					value={search}
					onChange={(e) => onSearch(e.target.value)}
				/>
			</DialogTitle>
			<DialogContent className="bg-transparent grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
				{locations?.map?.((l) =>
					l.label.toLowerCase().includes(search?.toLowerCase()) ? (
						<Button
							className="flex-col items-center gap-2 p-4 px-7"
							color={l?.color || "inherit"}
							key={l.label}
							onClick={() => {
								if (l.to !== undefined) navigate(`/app/${l.to}`);

								if (l.func) l.func();

								onClose();
							}}
						>
							<Icon className="text-4xl">{l.icon}</Icon>
							<div>{l.label}</div>
						</Button>
					) : (
						<></>
					)
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AppMenu;
