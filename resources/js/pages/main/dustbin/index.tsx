import SmartDustbinCard from '@/components/ui/smart-dustbin-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dustbins',
        href: '/dustbins',
    },
];

// Mock data based on your database schema
const initialBins = [
    {
        id: 1,
        name: 'Kitchen Bin',
        isActive: true,
        token: 'kt-bin-token-123',
        tokenExpire: '2025-12-31',
        onlineStatus: true,
        lastOnline: '2023-06-15T14:30:00Z',
        lastIp: '192.168.1.101',
        fillLevel: 65,
        smsNotification: true,
        notificationThreshold: 85,
    },
    {
        id: 2,
        name: 'Office Bin',
        isActive: true,
        token: 'of-bin-token-456',
        tokenExpire: '2025-10-15',
        onlineStatus: true,
        lastOnline: '2023-06-15T15:45:00Z',
        lastIp: '192.168.1.102',
        fillLevel: 32,
        smsNotification: false,
        notificationThreshold: 90,
    },
    {
        id: 3,
        name: 'Bathroom Bin',
        isActive: false,
        token: 'bt-bin-token-789',
        tokenExpire: null,
        onlineStatus: false,
        lastOnline: '2023-06-10T09:15:00Z',
        lastIp: '192.168.1.103',
        fillLevel: 88,
        smsNotification: true,
        notificationThreshold: 80,
    },
];

export default function Dustbins() {

    const [bins, setBins] = useState(initialBins);

    const handleUpdate = (id: number, data: any) => {
        setBins((prev) => prev.map((bin) => (bin.id === id ? { ...bin, ...data } : bin)));
        console.log(`Updated bin ${id} with data:`, data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dustbins" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                    {bins.map((bin) => (
                        <SmartDustbinCard
                            key={bin.id}
                            id={bin.id}
                            name={bin.name}
                            isActive={bin.isActive}
                            token={bin.token}
                            tokenExpire={bin.tokenExpire}
                            onlineStatus={bin.onlineStatus}
                            lastOnline={bin.lastOnline}
                            lastIp={bin.lastIp}
                            fillLevel={bin.fillLevel}
                            smsNotification={bin.smsNotification}
                            notificationThreshold={bin.notificationThreshold}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
