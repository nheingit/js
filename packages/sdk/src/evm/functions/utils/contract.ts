import { getContractTypeForRemoteName } from "../../contracts";
import { ContractType } from "../../contracts";
import IThirdwebContractABI from "@thirdweb-dev/contracts-js/dist/abis/IThirdwebContract.json";
import { Contract, utils, type providers } from "ethers";

type ResolveContractTypeParams = {
  address: string;
  provider: providers.Provider;
};

export async function resolveContractType(
  params: ResolveContractTypeParams,
): Promise<ContractType> {
  try {
    const contract = new Contract(
      params.address,
      IThirdwebContractABI,
      params.provider,
    );
    const remoteContractType = utils
      .toUtf8String(await contract.contractType())
      // eslint-disable-next-line no-control-regex
      .replace(/\x00/g, "");
    return getContractTypeForRemoteName(remoteContractType);
  } catch (err) {
    return "custom";
  }
}
