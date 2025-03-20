"use client"

import { useState } from "react"
import { Trash2, WifiOff, Wifi, Calendar, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"

interface SmartDustbinProps {
  id: number
  name: string
  isActive: boolean
  token: string | null
  tokenExpire: string | null
  onlineStatus: boolean
  lastOnline: string | null
  lastIp: string | null
  fillLevel: number
  smsNotification: boolean
  notificationThreshold: number
  onUpdate?: (id: number, data: Partial<SmartDustbinProps>) => void
  onDelete?: (id: number, data: Partial<SmartDustbinProps>) => void
}

export default function SmartDustbinCard({
  id = 1,
  name = "Smart Bin #1",
  isActive = true,
  token = null,
  tokenExpire = null,
  onlineStatus = true,
  lastOnline = null,
  lastIp = null,
  fillLevel = 65,
  smsNotification = false,
  notificationThreshold = 90,
  onUpdate = () => {},
  onDelete = () => {},
}: SmartDustbinProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name,
    isActive,
    token,
    tokenExpire,
    smsNotification,
    notificationThreshold,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onUpdate(id, formData)
    setOpen(false)
  }

  const handleDelete = () => {
    onDelete(id, { isActive: false })
    setOpen(false)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    try {
      return format(new Date(dateString), "PPP")
    } catch {
      return "Invalid date"
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm cursor-pointer transition-all hover:shadow-md" onClick={() => setOpen(true)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
          <Badge variant={onlineStatus ? "default" : "destructive"} className="flex items-center gap-1">
            {onlineStatus ? (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5" />
                <span>Offline</span>
              </>
            )}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Trash2 className={`h-12 w-12 ${onlineStatus ? "text-primary" : "text-muted-foreground"}`} />
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fill Level</span>
                <span className="text-sm font-medium">{fillLevel}%</span>
              </div>
              <Progress
                value={fillLevel}
                className="h-3"
                style={{
                  background:
                    fillLevel > notificationThreshold
                      ? "var(--destructive)"
                      : fillLevel > notificationThreshold * 0.8
                        ? "var(--warning, orange)"
                        : "var(--primary)",
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Empty</span>
                <span>Full</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {fillLevel > notificationThreshold
                ? "Needs immediate attention"
                : fillLevel > notificationThreshold * 0.8
                  ? "Will need emptying soon"
                  : "Operating normally"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Smart Dustbin</DialogTitle>
            <DialogDescription>Make changes to your smart dustbin settings here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="col-span-3">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-right">
                Token
              </Label>
              <Input
                id="token"
                value={formData.token || ""}
                onChange={(e) => handleChange("token", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokenExpire" className="text-right">
                Token Expiry
              </Label>
              <Input
                id="tokenExpire"
                type="date"
                value={formData.tokenExpire ? formData.tokenExpire.split("T")[0] : ""}
                onChange={(e) => handleChange("tokenExpire", e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Online Status</Label>
              <div className="col-span-3 flex items-center gap-2">
                {onlineStatus ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5" />
                    <span>Online</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <WifiOff className="h-3.5 w-3.5" />
                    <span>Offline</span>
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Last Online</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(lastOnline)}</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Last IP</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{lastIp || "N/A"}</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fillLevel" className="text-right">
                Fill Level
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{fillLevel || "0 %"}</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="smsNotification" className="text-right">
                SMS Notifications
              </Label>
              <div className="col-span-3">
                <Switch
                  id="smsNotification"
                  checked={formData.smsNotification}
                  onCheckedChange={(checked) => handleChange("smsNotification", checked)}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notificationThreshold" className="text-right">
                Notification Threshold
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="notificationThreshold"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.notificationThreshold}
                  onChange={(e) => handleChange("notificationThreshold", Number.parseInt(e.target.value))}
                  className="w-20"
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="cursor-pointer mr-2 bg-red-500 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button type="submit" className="cursor-pointer" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
