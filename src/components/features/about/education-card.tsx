import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EducationCardProps {
  institution: string;
  degree: string;
  period: string;
}

export default function EducationCard({
  institution,
  degree,
  period,
}: EducationCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-lg font-extrabold">{institution}</p>
          <span className="text-muted-foreground font-normal text-xs">
            {period}
          </span>
        </CardTitle>
        <CardDescription>{degree}</CardDescription>
      </CardHeader>
    </Card>
  );
}
