import React from 'react';
import {Button} from 'react-native-paper';

type DestructiveButtonProps = React.ComponentProps<typeof Button>;

const DestructiveButton: React.FC<DestructiveButtonProps> = ({
  children,
  ...props
}) => <Button {...props}>{children}</Button>;

export default DestructiveButton;
