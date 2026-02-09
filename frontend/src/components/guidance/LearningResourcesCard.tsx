import { GuidanceCard } from "@/components/GuidanceCard";
import { Library, Video, FileText, Globe } from "lucide-react";

interface Resource {
  name: string;
  link: string;
  type: "Free" | "Paid";
}

interface LearningResourcesData {
  learning: {
    courses?: Resource[];
    documentation?: Resource[];
    videoBlogs?: Resource[];
};
}

interface LearningResourcesCardProps {
  data: LearningResourcesData;
}

const ResourceGroup = ({
  title,
  icon: Icon,
  resources,
}: {
  title: string;
  icon: React.ElementType;
  resources: Resource[];
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      <Icon className="w-4 h-4 text-success" />
      {title}
    </div>
    <div className="pl-6 space-y-1.5">
      {resources.map((resource, idx) => (
        <div key={idx} className="flex items-center justify-between text-sm">
          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline hover:text-blue-500">{resource.name}</a>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              resource.type === "Free"
                ? "bg-success/10 text-success"
                : "bg-accent/10 text-accent"
            }`}
          >
            {resource.type}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const LearningResourcesCard = ({ data }: LearningResourcesCardProps) => {
console.log("LearningResourcesCard received data:", data);
  return (
    <GuidanceCard
      title="Where to Learn"
      icon={Library}
      accentColor="success"
      // defaultOpen
    >
      <div className="space-y-4">
        {data.learning.courses?.length > 0 && (
          <ResourceGroup title="Online Courses" icon={Globe} resources={data.learning.courses} />
        )}
        {data.learning.documentation?.length >= 0 && (  
          <ResourceGroup title="Documentation" icon={FileText} resources={data.learning.documentation} />
        )}
        {data.learning.videoBlogs?.length > 0 && (
          <ResourceGroup title="YouTube / Blogs" icon={Video} resources={data.learning.videoBlogs} />
        )}
      </div>
    </GuidanceCard>
  );
};
