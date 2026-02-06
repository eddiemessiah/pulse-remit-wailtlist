'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <Sidebar />
            <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-4 md:p-8 pt-24 lg:pt-8 transition-all duration-300">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
