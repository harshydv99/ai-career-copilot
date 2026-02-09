import { useState } from "react";
import { Briefcase, MapPin, Zap, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Placement {
    id: string;
    role: string;
    company: string;
    experienceLevel: string;
    location: string;
    skillMatch: "High" | "Medium" | "Low";
    roleType: string;
    applyLink: string;
  }

interface PlacementOpportunitiesProps {
  data: {
    placements: Placement[];
  };
}

// const mockJobs: JobListing[] = [
//   {
//     id: "1",
//     role: "Frontend Developer",
//     company: "TechCorp Inc.",
//     experienceLevel: "0-2 years",
//     location: "Remote",
//     skillMatch: "High",
//     roleType: "Frontend",
//     applyLink: "https://techcorp.example.com/apply",
//   },
//   {
//     id: "2",
//     role: "Full Stack Engineer",
//     company: "StartupXYZ",
//     experienceLevel: "1-3 years",
//     location: "Bangalore, India",
//     skillMatch: "High",
//     roleType: "Full Stack",
//     applyLink: "https://startupxyz.example.com/careers",
//   },
//   {
//     id: "3",
//     role: "React Developer",
//     company: "InnovateTech",
//     experienceLevel: "0-1 years",
//     location: "Remote",
//     skillMatch: "Medium",
//     roleType: "Frontend",
//     applyLink: "https://innovatetech.example.com/jobs",
//   },
//   {
//     id: "4",
//     role: "Backend Developer",
//     company: "DataFlow Systems",
//     experienceLevel: "2-4 years",
//     location: "Mumbai, India",
//     skillMatch: "Medium",
//     roleType: "Backend",
//     applyLink: "https://dataflowsystems.example.com/opportunities",
//   },
//   {
//     id: "5",
//     role: "ML Engineer",
//     company: "AI Solutions",
//     experienceLevel: "1-3 years",
//     location: "Hyderabad, India",
//     skillMatch: "Low",
//     roleType: "AI",
//     applyLink: "https://aisolutions.example.com/careers",
//   },
//   {
//     id: "6",
//     role: "Node.js Developer",
//     company: "CloudFirst",
//     experienceLevel: "0-2 years",
//     location: "Remote",
//     skillMatch: "High",
//     roleType: "Backend",
//     applyLink: "https://cloudfirst.example.com/apply",
//   },
// ];

const skillMatchColors = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-accent/10 text-accent border-accent/20",
  Low: "bg-success/10 text-success border-success/20",
};

export const PlacementOpportunities = ({ data }: PlacementOpportunitiesProps) => {
  // export const PlacementOpportunities = () => {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = data.placements.filter((job) => {
    if (roleFilter !== "all" && job.roleType !== roleFilter) return false;
    if (experienceFilter !== "all" && job.experienceLevel !== experienceFilter) return false;
    return true;
  });

  return (
    <section className="space-y-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-success/10">
            <Briefcase className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Placement Opportunities for You</h2>
            <p className="text-sm text-muted-foreground">
              Jobs matched to your skills and experience level
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card rounded-xl p-4 flex flex-wrap gap-4 animate-fade-in">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Role Type</label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Type</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                {/* <SelectItem value="Full Stack">Full Stack</SelectItem> */}
                {/* <SelectItem value="AI">AI / ML</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Experience</label>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="0-1 years">0-1 years</SelectItem>
                <SelectItem value="0-2 years">0-2 years</SelectItem>
                <SelectItem value="1-3 years">1-3 years</SelectItem>
                <SelectItem value="2-4 years">2-4 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Job Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.placements.map((job, idx) => (
          <div
            key={idx}
            className="glass-card rounded-xl p-4 space-y-3 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{job.role}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full border whitespace-nowrap ${skillMatchColors[job.skillMatch]}`}
              >
                {job.skillMatch} Match
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
                <Zap className="w-3 h-3" />
                {job.experienceLevel}
              </span>
              <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
            </div>

            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              Apply Fast
            </Button>
            </a>
          </div>
        ))}
      </div>

      {data.placements.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No jobs match your current filters.</p>
          <Button
            variant="link"
            onClick={() => {
              setRoleFilter("all");
              setExperienceFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
};
