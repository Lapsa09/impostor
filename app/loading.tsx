import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 mx-auto animate-pulse">
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}
