import { SkeletonPremium } from "@/components/ui/skeleton";

const ProfileCardSkeleton = () => {
  return (
    <div className="border border-border p-5 bg-card">
      <div className="flex items-start gap-4 mb-4">
        <SkeletonPremium className="w-14 h-14 shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonPremium className="h-5 w-32" />
          <SkeletonPremium className="h-3 w-20" />
        </div>
        <SkeletonPremium className="w-12 h-12 shrink-0" />
      </div>
      
      <div className="space-y-2 mb-4">
        <SkeletonPremium className="h-3 w-full" />
        <SkeletonPremium className="h-3 w-4/5" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <SkeletonPremium className="h-5 w-16" />
        <SkeletonPremium className="h-5 w-20" />
        <SkeletonPremium className="h-5 w-14" />
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="space-y-1.5">
          <SkeletonPremium className="h-3 w-20" />
          <SkeletonPremium className="h-1.5 w-full" />
        </div>
        <div className="space-y-1.5">
          <SkeletonPremium className="h-3 w-20" />
          <SkeletonPremium className="h-1.5 w-full" />
        </div>
        <div className="space-y-1.5">
          <SkeletonPremium className="h-3 w-20" />
          <SkeletonPremium className="h-1.5 w-full" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <SkeletonPremium className="h-3 w-24" />
        <SkeletonPremium className="h-3 w-20" />
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
