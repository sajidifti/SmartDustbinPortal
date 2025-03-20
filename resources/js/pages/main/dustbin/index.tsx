import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SmartDustbinCard from '@/components/ui/smart-dustbin-card';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Dustbin {
    id: number;
    name: string;
    isActive: boolean;
    token: string;
    tokenExpire: string | null;
    onlineStatus: boolean;
    lastOnline: string;
    lastIp: string;
    fillLevel: number;
    smsNotification: boolean;
    notificationThreshold: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dustbins',
        href: '/dustbins',
    },
];

export default function Dustbins({ dustbins }: { dustbins: Dustbin[] }) {
    const [bins, setBins] = useState(dustbins);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newDustbin, setNewDustbin] = useState({
        name: '',
        isActive: true,
        token: '',
        tokenExpire: null,
        smsNotification: false,
        notificationThreshold: 80,
    });

    const handleUpdate = (id: number, data: Partial<Dustbin>) => {
        router.put(`/dustbins/${id}`, data, {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`Updated dustbin`);
                router.visit('/dustbins');
            },
            onError: (errors) => console.error('Update failed:', errors),
        });
    };

    const handleCreate = () => {
        router.post('/dustbins', newDustbin, {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`Created dustbin`);
                router.visit('/dustbins');
            },
            onError: (errors) => console.error('Create failed:', errors),
        });
    };

    const handleDelete = (id: number) => {
        router.delete(`/dustbins/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`Deleted dustbin`);
                router.visit('/dustbins');
            },
            onError: (errors) => console.error('Delete failed:', errors),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dustbins" />
            <div className="flex items-center justify-end px-4 py-2">
                <Button size="sm" onClick={() => setIsAddModalOpen(true)} className='cursor-pointer'>
                    +
                </Button>
            </div>
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
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            {/* Add Dustbin Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add Smart Dustbin</DialogTitle>
                        <DialogDescription>Enter details for the new smart dustbin.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newDustbin.name}
                                onChange={(e) => setNewDustbin({ ...newDustbin, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="isActive" className="text-right">
                                Active
                            </Label>
                            <Switch
                                id="isActive"
                                checked={newDustbin.isActive}
                                onCheckedChange={(checked) => setNewDustbin({ ...newDustbin, isActive: checked })}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="token" className="text-right">
                                Token
                            </Label>
                            <Input
                                id="token"
                                value={newDustbin.token}
                                onChange={(e) => setNewDustbin({ ...newDustbin, token: e.target.value })}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notificationThreshold" className="text-right">
                                Notification Threshold
                            </Label>
                            <Input
                                id="notificationThreshold"
                                type="number"
                                min="0"
                                max="100"
                                value={newDustbin.notificationThreshold}
                                onChange={(e) => setNewDustbin({ ...newDustbin, notificationThreshold: Number(e.target.value) })}
                                className="col-span-3 w-20"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="smsNotification" className="text-right">
                                SMS Notifications
                            </Label>
                            <Switch
                                id="smsNotification"
                                checked={newDustbin.smsNotification}
                                onCheckedChange={(checked) => setNewDustbin({ ...newDustbin, smsNotification: checked })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreate}>Add Dustbin</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
