"use client";

import { useState } from "react";

export default function useSidebar() {

	const [collapsed, setCollapsed] =
		useState(false);

	const toggleSidebar = () => {
		setCollapsed(prev => !prev);
	};

	return {

		collapsed,

		setCollapsed,

		toggleSidebar,

	};

}