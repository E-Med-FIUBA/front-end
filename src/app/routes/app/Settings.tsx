import { ContentLayout } from "@/components/layouts/ContentLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditProfileForm } from "@/features/settings/components/EditProfileForm";

export function SettingsRoute() {
  return (
    <ContentLayout title="Configuración">
      <ScrollArea className="h-full">
        <EditProfileForm />
      </ScrollArea>
    </ContentLayout>
  );
}
