"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Switch,
  Separator,
} from "@finance/ui";
import { useCurrentUser, UserButton } from "@finance/auth";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { user } = useCurrentUser();
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <UserButton />
            <div>
              <p className="font-medium">{user?.fullName || "User"}</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                defaultValue={user?.firstName || ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                defaultValue={user?.lastName || ""}
                disabled
              />
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Profile information is managed through your authentication provider.
            Click on your avatar to update.
          </p>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-muted-foreground text-sm">
                Toggle between light and dark themes
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Theme</Label>
              <p className="text-muted-foreground text-sm">
                Automatically match your system preference
              </p>
            </div>
            <Switch
              checked={theme === "system"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "system" : "light")
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Budget Alerts</Label>
              <p className="text-muted-foreground text-sm">
                Get notified when you&apos;re approaching budget limits
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Summary</Label>
              <p className="text-muted-foreground text-sm">
                Receive a weekly email with your spending summary
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Large Transaction Alerts</Label>
              <p className="text-muted-foreground text-sm">
                Get notified for transactions over a certain amount
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or delete your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Export Data</p>
              <p className="text-muted-foreground text-sm">
                Download all your transactions and settings as a JSON file
              </p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-destructive font-medium">Delete Account</p>
              <p className="text-muted-foreground text-sm">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
