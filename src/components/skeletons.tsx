import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FormSkeleton() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Loading form...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function EditLeadFormSkeleton() {
  return <FormSkeleton />;
}

export function LeadDetailsSkeleton() {
  return (
    <Card className="w-full min-w-[400px] max-w-[800px]">
      <CardHeader>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadNotesSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded">
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function MeetingFormSkeleton() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Loading Meeting Form...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function EditMeetingFormSkeleton() {
  return <MeetingFormSkeleton />;
}

export function MeetingDetailsSkeleton() {
  return (
    <Card className="w-full min-w-[400px] max-w-[800px]">
      <CardHeader>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AddMessageFormSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">New Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function MessageDetailsSkeleton() {
  return (
    <Card className="w-full min-w-[400px] max-w-[800px]">
      <CardHeader>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}