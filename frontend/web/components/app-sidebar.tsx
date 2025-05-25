import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar, } from './ui/sidebar'
import Link from 'next/link'
import { BarChartBigIcon, PillBottle, LayoutGrid, Settings2, Menu, User } from 'lucide-react'
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function AppSidebar() {
    const [selectedTab, setSelectedTab] = useState("Dashboard");

    const tabs = [
        {
            icon: <BarChartBigIcon />,
            title: "Dashboard",
            href: "/home",
            selected: selectedTab
        },
        {
            icon: <PillBottle />,
            title: "Products",
            href: "",
            selected: false
        },
        {
            icon: <LayoutGrid />,
            title: "Categories",
            href: "",
            selected: false
        },
        {
            icon: <Settings2 />,
            title: "Settings",
            href: "",
            selected: false
        },
    ];
    return (
        <Sidebar collapsible='icon' className='overflow-hidden'>
            <SidebarHeader >
                <span>App</span>
            </SidebarHeader>
            <SidebarContent className='p-2'>
                <SidebarGroup />
                <SidebarMenu>
                    {tabs.map((tab) =>

                        <SidebarMenuItem key={tab.title}>
                            <SidebarMenuButton className={`${selectedTab === tab.title ? "text-orange-400! bg-orange-100!" : "hover:bg-gray-100!"} text-[16px] h-10 font-[family-name:var(--font-geist-sans)]`} asChild>
                                <Link href={tab.href} onClick={() => setSelectedTab(tab.title)} className={`flex gap-3 items-center p-2 rounded-md`}>
                                    {tab.icon}
                                    <span>{tab.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <ProfileSideCard />
            </SidebarFooter>
            <SidebarRail></SidebarRail>
        </Sidebar >
    )
}

export function AppSidebarTrigger() {
    const { toggleSidebar } = useSidebar();
    return (
        <Button variant={'ghost'} className='cursor-pointer' onClick={toggleSidebar}>
            <Menu />
        </Button>
    )
}
