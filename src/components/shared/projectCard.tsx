import { TCampaign } from "@/lib/drizzle/schema/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function ProjectCard({ campaign }: { campaign: TCampaign }) {
  return (
    <Link href={`project/${campaign.slug}` || ""}>
      <Card className="max-w-2xl hover:bg-secondary">
        <CardHeader>
          <CardTitle>{campaign.name}</CardTitle>
          {campaign.description && (
            <CardDescription>{campaign.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProjectCard;
