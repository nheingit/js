import { ChainIcon } from "../../components/ChainIcon";
import { CopyIcon } from "../../components/CopyIcon";
import { Img } from "../../components/Img";
import { Modal } from "../../components/Modal";
import { Skeleton } from "../../components/Skeleton";
import { Spacer } from "../../components/Spacer";
import { ToolTip } from "../../components/Tooltip";
import { IconButton } from "../../components/buttons";
import {
  fontSize,
  iconSize,
  media,
  radius,
  spacing,
  Theme,
} from "../../design-system";
import { shortenString } from "../../evm/utils/addresses";
import { isMobile } from "../../evm/utils/isMobile";
import { NetworkSelector, type NetworkSelectorProps } from "./NetworkSelector";
import { ExitIcon } from "./icons/ExitIcon";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronRightIcon,
  EnterIcon,
  PinBottomIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";
import { Localhost } from "@thirdweb-dev/chains";
import {
  useChain,
  useAddress,
  useBalance,
  useChainId,
  useDisconnect,
  useSDK,
  useSupportedChains,
  useWallet,
  WalletInstance,
} from "@thirdweb-dev/react-core";
import { useState } from "react";
import { fadeInAnimation } from "../../components/FadeIn";
import { MetaMaskWallet, walletIds } from "@thirdweb-dev/wallets";
import { Flex } from "../../components/basic";
import { FundsIcon } from "./icons/FundsIcon";
import { ExportLocalWallet } from "../wallets/localWallet/ExportLocalWallet";
import { ErrorMessage } from "../../components/formElements";
import { useWalletContext } from "@thirdweb-dev/react-core";
import { useWalletConfig } from "@thirdweb-dev/react-core";
import type { LocalWalletConfig } from "../wallets/localWallet/types";

export type DropDownPosition = {
  side: "top" | "bottom" | "left" | "right";
  align: "start" | "center" | "end";
};

const TW_CONNECTED_WALLET = "tw-connected-wallet";

export const ConnectedWalletDetails: React.FC<{
  dropdownPosition?: DropDownPosition;
  onDisconnect: () => void;
  theme: "dark" | "light";
  style?: React.CSSProperties;
  networkSelector?: Omit<NetworkSelectorProps, "theme" | "onClose" | "chains">;
  className?: string;
  detailsBtn?: () => JSX.Element;
  hideTestnetFaucet?: boolean;
}> = (props) => {
  const disconnect = useDisconnect();
  const chains = useSupportedChains();
  const walletChainId = useChainId();
  const address = useAddress();
  const balanceQuery = useBalance();
  const activeWallet = useWallet();
  const activeWalletConfig = useWalletConfig();
  const [showExportModal, setShowExportModal] = useState(false);
  const [wrapperWallet, setWrapperWallet] = useState<
    WalletInstance | undefined
  >();
  const walletContext = useWalletContext();

  const chain = useChain();
  const activeWalletIconURL = activeWalletConfig?.meta.iconURL || "";

  const [showNetworkSelector, setShowNetworkSelector] = useState(false);
  const [open, setOpen] = useState(false);

  const sdk = useSDK();

  const personalWallet = activeWallet?.getPersonalWallet() as
    | WalletInstance
    | undefined;

  const personalWalletConfig =
    personalWallet && walletContext.getWalletConfig(personalWallet);
  const wrapperWalletConfig =
    wrapperWallet && walletContext.getWalletConfig(wrapperWallet);

  const disableSwitchChain = !!personalWallet;

  const trigger = props.detailsBtn ? (
    <div>
      <props.detailsBtn />
    </div>
  ) : (
    <WalletInfoButton
      type="button"
      className={`${TW_CONNECTED_WALLET} ${props.className || ""}`}
      data-theme={props.theme}
      style={props.style}
      data-test="connected-wallet-details"
    >
      <ChainIcon
        chain={chain}
        size={iconSize.lg}
        className={`${TW_CONNECTED_WALLET}__network-icon`}
      />

      <ColFlex>
        {balanceQuery.data ? (
          <WalletBalance className={`${TW_CONNECTED_WALLET}__balance`}>
            {Number(balanceQuery.data.displayValue).toFixed(3)}{" "}
            {balanceQuery.data.symbol}
          </WalletBalance>
        ) : (
          <Skeleton height={fontSize.sm} width="82px" />
        )}
        <Spacer y="xs" />

        {activeWallet?.walletId === walletIds.localWallet ? (
          <ErrorMessage
            style={{
              lineHeight: 1,
              minWidth: "70px",
              fontSize: fontSize.xs,
            }}
          >
            Guest
          </ErrorMessage>
        ) : address ? (
          <WalletAddress className={`${TW_CONNECTED_WALLET}__address`}>
            {shortenString(address || "")}
          </WalletAddress>
        ) : (
          <Skeleton height={fontSize.xs} width="88px" />
        )}
      </ColFlex>

      <Img
        width={iconSize.lg}
        height={iconSize.lg}
        src={activeWalletIconURL}
        className={`${TW_CONNECTED_WALLET}__wallet-icon`}
      />
    </WalletInfoButton>
  );

  const networkSwitcherButton = (
    <ToolTip
      tip={
        disableSwitchChain ? "Network Switching is disabled" : "Switch Network"
      }
    >
      <MenuButton
        type="button"
        disabled={disableSwitchChain}
        onClick={() => {
          setOpen(false);
          setShowNetworkSelector(true);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ChainIcon chain={chain} size={iconSize.lg} active />
        </div>
        {chain?.name || `Unknown chain #${walletChainId}`}
        <StyledChevronRightIcon
          width={iconSize.sm}
          height={iconSize.sm}
          style={{
            flexShrink: 0,
            marginLeft: "auto",
          }}
        />
      </MenuButton>
    </ToolTip>
  );

  const content = (
    <div>
      {/* Balance and Account Address */}
      <Flex gap="md">
        <Img
          width={iconSize.xl}
          height={iconSize.xl}
          src={activeWalletIconURL}
          alt=""
        />

        <div
          style={{
            flexGrow: 1,
          }}
        >
          {/* row 1 */}
          <Flex gap="xs" alignItems="center">
            <div
              style={{
                display: "flex",
                gap: spacing.xs,
                alignItems: "center",
              }}
              data-test="connected-wallet-address"
              data-address={address}
            >
              <AccountAddress> {shortenString(address || "")}</AccountAddress>
              <IconButton
                variant="secondary"
                style={{
                  padding: "3px",
                }}
                data-test="copy-address"
              >
                <CopyIcon
                  text={address || ""}
                  tip="Copy Address"
                  side="bottom"
                />
              </IconButton>
            </div>

            <ToolTip
              tip="Disconnect Wallet"
              side="bottom"
              align={"end"}
              sideOffset={10}
            >
              <DisconnectIconButton
                type="button"
                variant="secondary"
                onClick={() => {
                  disconnect();
                  props.onDisconnect();
                }}
              >
                <ExitIcon size={iconSize.md} />
              </DisconnectIconButton>
            </ToolTip>
          </Flex>

          {/* row 2 */}
          <AccountBalance>
            {" "}
            {balanceQuery.data ? (
              Number(balanceQuery.data.displayValue).toFixed(3)
            ) : (
              <Skeleton height="1em" width="100px" />
            )}{" "}
            {balanceQuery.data?.symbol}{" "}
          </AccountBalance>
        </div>
      </Flex>

      <Spacer y="lg" />

      {/* Network Switcher */}
      <div>
        <DropdownLabel>Current Network</DropdownLabel>
        <Spacer y="xs" />
        {networkSwitcherButton}
      </div>

      <Spacer y="md" />

      <Flex flexDirection="column" gap={"sm"}>
        {/* Switch to Personal Wallet for Safe */}
        {personalWallet && personalWalletConfig && (
          <WalletSwitcher
            wallet={personalWallet}
            name="Personal Wallet"
            onSwitch={() => {
              setWrapperWallet(activeWallet);
            }}
          />
        )}

        {/* Switch to Wrapper Wallet */}
        {wrapperWalletConfig && wrapperWallet && (
          <WalletSwitcher
            name={wrapperWalletConfig.meta.name}
            wallet={wrapperWallet}
            onSwitch={() => {
              setWrapperWallet(undefined);
            }}
          />
        )}

        {/* Switch Account for Metamask */}
        {activeWalletConfig &&
          activeWalletConfig.id === walletIds.metamask &&
          activeWalletConfig.isInstalled &&
          activeWalletConfig.isInstalled() &&
          !isMobile() && (
            <MenuButton
              type="button"
              onClick={() => {
                (activeWallet as MetaMaskWallet).switchAccount();
                setOpen(false);
              }}
              style={{
                fontSize: fontSize.sm,
              }}
            >
              <ShuffleIcon width={iconSize.sm} height={iconSize.sm} />
              Switch Account
            </MenuButton>
          )}

        {/* Request Testnet funds */}
        {!props.hideTestnetFaucet &&
          ((chain?.faucets && chain.faucets.length > 0) ||
            chain?.chainId === Localhost.chainId) && (
            <MenuLink
              href={chain?.faucets ? chain.faucets[0] : "#"}
              target="_blank"
              as="a"
              onClick={async (e) => {
                if (chain.chainId === Localhost.chainId) {
                  e.preventDefault();
                  setOpen(false);
                  await sdk?.wallet.requestFunds(10);
                  await balanceQuery.refetch();
                }
              }}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: fontSize.sm,
              }}
            >
              <SecondaryIconContainer>
                <FundsIcon size={iconSize.sm} />
              </SecondaryIconContainer>
              Request Testnet Funds
            </MenuLink>
          )}

        {/* Export  Wallet */}
        {activeWallet?.walletId === walletIds.localWallet && (
          <div>
            <MenuButton
              onClick={() => {
                setShowExportModal(true);
                setOpen(false);
              }}
              style={{
                fontSize: fontSize.sm,
              }}
            >
              <SecondaryIconContainer>
                <PinBottomIcon width={iconSize.sm} height={iconSize.sm} />
              </SecondaryIconContainer>
              Backup wallet{" "}
            </MenuButton>
            <Spacer y="sm" />
            <ErrorMessage
              style={{
                fontSize: fontSize.xs,
                textAlign: "center",
              }}
            >
              This is a temporary guest wallet <br />
              Backup if you {`don't `}
              want to lose access to it
            </ErrorMessage>
          </div>
        )}
      </Flex>
    </div>
  );

  return (
    <>
      {isMobile() ? (
        <Modal
          trigger={trigger}
          open={open}
          setOpen={setOpen}
          hideCloseIcon={true}
        >
          <div
            style={{
              minHeight: "200px",
            }}
          >
            {content}
          </div>
        </Modal>
      ) : (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropDownContent
              asChild
              side={props.dropdownPosition?.side || "bottom"}
              align={props.dropdownPosition?.align || "end"}
              sideOffset={10}
            >
              {content}
            </DropDownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}

      {showNetworkSelector && (
        <NetworkSelector
          theme={props.theme}
          chains={chains}
          {...props.networkSelector}
          onClose={() => setShowNetworkSelector(false)}
        />
      )}

      {showExportModal && (
        <Modal
          open={true}
          setOpen={setShowExportModal}
          style={{
            maxWidth: "480px",
          }}
        >
          <ExportLocalWallet
            localWalletConfig={activeWalletConfig as LocalWalletConfig}
            onBack={() => {
              setShowExportModal(false);
            }}
            onExport={() => {
              setShowExportModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

const dropdownContentFade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const DropDownContent = /* @__PURE__ */ styled(
  /* @__PURE__ */ DropdownMenu.Content,
)<{ theme?: Theme }>`
  width: 360px;
  box-sizing: border-box;
  max-width: 100%;
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  animation: ${dropdownContentFade} 400ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  border: 1px solid ${(props) => props.theme.border.base};
  background-color: ${(props) => props.theme.bg.base};
  z-index: 1000000;
  line-height: 1;
`;

const WalletInfoButton = styled.button<{ theme?: Theme }>`
  all: unset;
  background: ${(props) => props.theme.bg.base};
  border: 1px solid ${(props) => props.theme.border.base};
  padding: ${spacing.sm} ${spacing.sm};
  border-radius: ${radius.lg};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.md};
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  line-height: 1;
  animation: ${fadeInAnimation} 300ms ease;

  ${media.mobile} {
    gap: ${spacing.sm};
    padding: ${spacing.xs} ${spacing.sm};
    img {
      width: ${iconSize.md}px;
      height: ${iconSize.md}px;
    }
  }

  &:hover {
    transition: background 250ms ease;
    background: ${(props) => props.theme.bg.baseHover};
    border-color: ${(props) => props.theme.bg.highlighted};
  }
`;

const WalletAddress = styled.span<{ theme?: Theme }>`
  color: ${(props) => props.theme.text.secondary};
  font-size: ${fontSize.xs};
  font-weight: 500;
`;

const ColFlex = styled.div<{ theme?: Theme }>`
  display: flex;
  flex-direction: column;
`;

const WalletBalance = styled.span<{ theme?: Theme }>`
  color: ${(props) => props.theme.text.neutral};
  font-size: ${fontSize.sm};
  font-weight: 500;
`;

const AccountAddress = styled.span<{ theme?: Theme }>`
  font-size: ${fontSize.md};
  color: ${(props) => props.theme.text.neutral};
  font-weight: 500;
`;

const AccountBalance = styled.span<{ theme?: Theme }>`
  font-size: ${fontSize.sm};
  color: ${(props) => props.theme.text.secondary};
  font-weight: 500;
`;

const DropdownLabel = styled.label<{ theme?: Theme }>`
  font-size: ${fontSize.sm};
  color: ${(props) => props.theme.text.secondary};
  font-weight: 500;
`;

const MenuButton = styled.button<{ theme?: Theme }>`
  all: unset;
  padding: ${spacing.sm} ${spacing.sm};
  border-radius: ${radius.md};
  background-color: ${(props) => props.theme.bg.base};
  border: 1px solid ${(props) => props.theme.border.elevated};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  font-size: ${fontSize.md};
  font-weight: 500;
  color: ${(props) => props.theme.text.neutral} !important;
  gap: ${spacing.sm};
  -webkit-tap-highlight-color: transparent;
  line-height: 1.3;

  &:not([disabled]):hover {
    transition:
      box-shadow 250ms ease,
      border-color 250ms ease;
    border: 1px solid ${(props) => props.theme.link.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.link.primary};
  }

  &[disabled] {
    cursor: not-allowed;
    svg {
      display: none;
    }
  }

  &[disabled]:hover {
    transition:
      box-shadow 250ms ease,
      border-color 250ms ease;
    border: 1px solid ${(props) => props.theme.text.danger};
    box-shadow: 0 0 0 1px ${(props) => props.theme.text.danger};
  }
`;

const MenuLink = /* @__PURE__ */ MenuButton.withComponent("a");

export const DropdownMenuItem = /* @__PURE__ */ styled(
  /* @__PURE__ */ DropdownMenu.Item,
)<{ theme?: Theme }>`
  outline: none;
`;

export const StyledChevronRightIcon = /* @__PURE__ */ styled(
  /* @__PURE__ */ ChevronRightIcon,
)<{
  theme?: Theme;
}>`
  color: ${(props) => props.theme.text.secondary};
`;

const DisconnectIconButton = /* @__PURE__ */ styled(IconButton)<{
  theme?: Theme;
}>`
  margin-right: -${spacing.xxs};
  margin-left: auto;
  color: ${(props) => props.theme.icon.secondary};
  &:hover {
    color: ${(props) => props.theme.icon.danger};
    background: none;
  }
`;

const SecondaryIconContainer = styled.div<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.icon.secondary};
`;

function WalletSwitcher({
  wallet,
  onSwitch,
  name,
}: {
  wallet: WalletInstance;
  onSwitch: () => void;
  name: string;
}) {
  const walletContext = useWalletContext();

  return (
    <MenuButton
      type="button"
      onClick={() => {
        walletContext.setConnectedWallet(wallet);
        onSwitch();
      }}
      style={{
        fontSize: fontSize.sm,
      }}
    >
      <EnterIcon width={iconSize.sm} height={iconSize.sm} />
      Switch to {name}
    </MenuButton>
  );
}
