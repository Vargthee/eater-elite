import { SkeletonPremium } from "@/components/ui/skeleton";

const ProfileDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background noise">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <SkeletonPremium className="h-6 w-32" />
          <SkeletonPremium className="h-4 w-16" />
        </div>
      </nav>

      <div className="container max-w-3xl mx-auto pt-20 sm:pt-24 pb-20 px-4">
        {/* Profile header */}
        <div className="border border-border p-5 sm:p-8 mb-4">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <SkeletonPremium className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
            <div className="flex-1 space-y-3 min-w-0">
              <SkeletonPremium className="h-7 w-48" />
              <SkeletonPremium className="h-3 w-32" />
              <SkeletonPremium className="h-4 w-full" />
              <SkeletonPremium className="h-4 w-3/4" />
              <div className="flex gap-4">
                <SkeletonPremium className="h-3 w-20" />
                <SkeletonPremium className="h-3 w-20" />
                <SkeletonPremium className="h-3 w-20" />
              </div>
            </div>
            <div className="border border-border p-4 sm:min-w-[100px] w-full sm:w-auto">
              <SkeletonPremium className="h-8 w-12 mx-auto mb-2" />
              <SkeletonPremium className="h-4 w-20 mx-auto mb-1" />
              <SkeletonPremium className="h-3 w-16 mx-auto" />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="border border-border p-5 sm:p-7 mb-4">
          <SkeletonPremium className="h-3 w-32 mb-5" />
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <SkeletonPremium className="h-4 w-20" />
                  <SkeletonPremium className="h-4 w-16" />
                </div>
                <SkeletonPremium className="h-1.5 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <SkeletonPremium className="flex-1 h-11" />
          <SkeletonPremium className="flex-1 h-11" />
        </div>

        {/* Reviews */}
        <div>
          <SkeletonPremium className="h-3 w-24 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border p-5">
                <div className="flex items-start gap-4 mb-3">
                  <SkeletonPremium className="w-10 h-10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <SkeletonPremium className="h-4 w-32" />
                    <SkeletonPremium className="h-3 w-20" />
                  </div>
                  <SkeletonPremium className="h-6 w-12" />
                </div>
                <div className="space-y-2 mb-3">
                  <SkeletonPremium className="h-3 w-full" />
                  <SkeletonPremium className="h-3 w-4/5" />
                </div>
                <div className="flex gap-4">
                  <SkeletonPremium className="h-3 w-24" />
                  <SkeletonPremium className="h-3 w-24" />
                  <SkeletonPremium className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailSkeleton;
