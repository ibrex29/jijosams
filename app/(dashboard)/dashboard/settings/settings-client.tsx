"use client";

import dynamic from "next/dynamic";

const ChangePasswordForm = dynamic(
  () => import("@/app/(dashboard)/dashboard/author/settings/tabs/change-password"),
  { ssr: false },
);

export default function SettingsClient() {
  return <ChangePasswordForm />;
}
