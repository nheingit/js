import Text from "../Text";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useAppTheme } from "../../../styles/hooks";

export const ModalFooter = ({
  footer,
  isLoading,
  onPress,
}: {
  footer: string;
  isLoading?: boolean;
  onPress?: () => void;
}) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity style={styles.footer} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.linkPrimary} />
      ) : (
        <Text variant="link">{footer}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 24,
    marginBottom: 14,
    minHeight: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
