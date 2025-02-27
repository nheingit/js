import {
  FullPublishMetadata,
  FullPublishMetadataSchemaOutput,
} from "../../schema/contracts/custom";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

/**
 * Fetch and parse the full metadata AFTER publishing a contract, with all the extra information (version, readme, etc)
 * @internal
 * @param publishMetadataUri
 * @param storage
 */
export async function fetchExtendedReleaseMetadata(
  publishMetadataUri: string,
  storage: ThirdwebStorage,
): Promise<FullPublishMetadata> {
  const meta = await (await storage.download(publishMetadataUri)).text();
  return FullPublishMetadataSchemaOutput.parse(JSON.parse(meta));
}
