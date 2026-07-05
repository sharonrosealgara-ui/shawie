"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BusinessPanel } from "@/components/businesses/business-panel";
import { useBusinessStore } from "@/store/business-store";

export default function BusinessesPage() {
  const businesses = useBusinessStore((s) => s.businesses);

  if (businesses.length === 0) {
    return (
      <div>
        <PageHeader title="Businesses" description="Manage all your ventures in one place." />
        <p className="text-sm text-muted-foreground">No businesses yet.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Businesses" description="Manage all your ventures in one place." />
      <Tabs defaultValue={businesses[0].id}>
        <TabsList className="mb-4 h-auto flex-wrap">
          {businesses.map((b) => (
            <TabsTrigger key={b.id} value={b.id}>
              {b.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {businesses.map((b) => (
          <TabsContent key={b.id} value={b.id}>
            {b.tagline && <p className="mb-4 text-sm text-muted-foreground">{b.tagline}</p>}
            <BusinessPanel business={b} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
