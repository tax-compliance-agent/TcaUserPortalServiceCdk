import { StageName } from "../configs/types";

export class ResourceUtils {
  static getResourceName(
    baseName: string,
    stage: StageName,
    region: string
  ): string {
    return `${baseName}-${stage}-${region}`;
  }
}
