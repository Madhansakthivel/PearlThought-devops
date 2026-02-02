import type { Upgrader } from '../../../modules/upgrader';
import type { UpgradeOptions } from '../types';
/**
 * Handles the upgrade prompts when using the latest tag.
 *
 * - checks if an upgrade involves a major bump, warning and asking for user confirmation before proceeding
 */
export declare const latest: (upgrader: Upgrader, options: UpgradeOptions) => Promise<void>;
//# sourceMappingURL=latest.d.ts.map