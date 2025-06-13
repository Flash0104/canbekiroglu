import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md w-full text-center shadow-lg border-0 bg-card">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Your message has been sent successfully.
              </p>
              <p className="text-muted-foreground">
                I appreciate your interest and will get back to you soon.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go to Home Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 