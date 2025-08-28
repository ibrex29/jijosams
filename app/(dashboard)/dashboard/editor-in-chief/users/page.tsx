import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";
import UsersPageClient from "./tabs/create-user/UsersPageClient";

export const metadata = {
  title: "Users",
};

export default function UsersPage() {
  return (
    <PageLayout>
      <PageTitleBar title="Users" />
      <UsersPageClient />
    </PageLayout>
  );
}
