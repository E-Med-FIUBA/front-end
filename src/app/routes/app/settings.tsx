import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { EditProfileForm } from '@/features/settings/components/edit-profile-form';

export function SettingsRoute() {
  return (
    <ContentLayout title="Configuración">
      <ScrollArea className="h-full">
        <EditProfileForm />
      </ScrollArea>
    </ContentLayout>
  );
}
