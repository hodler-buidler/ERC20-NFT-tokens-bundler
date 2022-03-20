import { BundleMode } from '@/types/app';

export const BundleModeService = Object.freeze({
  getName(mode: BundleMode): string {
    const namesMap: Record<BundleMode, string> = {
      [BundleMode.Wrap]: 'wrap',
      [BundleMode.Unwrap]: 'unwrap',
      [BundleMode.Approve]: 'approve',
    };

    return namesMap[mode];
  },
});
