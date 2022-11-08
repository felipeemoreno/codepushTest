import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Repos from './src/components/Repos';
import codePush from 'react-native-code-push';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
} from 'react-native-paper';
import DestructiveButton from './src/components/DestructiveButton';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

const App = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [hasAvailableUpdate, setHasAvailableUpdate] = useState<boolean>(false);
  const [hasVerifiedUpdate, setHasVerifiedUpdate] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<{code?: string; message?: string} | null>(
    null,
  );

  const resetStates = () => {
    setHasVerifiedUpdate;
    setIsUpdateDialogOpen(false);
    setHasAvailableUpdate(false);
    setHasVerifiedUpdate(false);
    setError(null);
    setIsUpdating(false);
  };

  const handleVerify = async () => {
    try {
      setError(null);
      setIsUpdateDialogOpen(true);

      await codePush.checkForUpdate().then(update => {
        if (!update) {
          setHasAvailableUpdate(false);
        } else {
          setHasAvailableUpdate(true);
        }
        setHasVerifiedUpdate(true);
      });

      // setIsUpdateDialogOpen(false)
    } catch (error: any) {
      setError({
        code: error?.code,
        message: error?.message,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    } catch (error: any) {
      setError({
        code: error?.code,
        message: error?.message,
      });
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Lista de Repos</Text>
        </View>
        <Repos />
        <Button onPress={handleVerify}>Verificar atualizações</Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 8,
          }}>
          <Portal>
            <Dialog visible={isUpdateDialogOpen} onDismiss={resetStates}>
              <Dialog.Content>
                {error ? (
                  <>
                    <Text>Erro ao atualizar/verificar atualizações.</Text>
                    {error.code && (
                      <Text style={{marginVertical: 8, fontWeight: 'bold'}}>
                        {error.code}
                      </Text>
                    )}
                    {error.message && (
                      <Text style={{marginVertical: 8, fontWeight: 'bold'}}>
                        {error.message}
                      </Text>
                    )}
                  </>
                ) : isUpdating ? (
                  <>
                    <ActivityIndicator />
                    <Paragraph style={{textAlign: 'center', marginTop: 16}}>
                      Atualizando...
                    </Paragraph>
                  </>
                ) : hasVerifiedUpdate ? (
                  hasAvailableUpdate ? (
                    <>
                      <Paragraph style={{fontWeight: 'bold'}}>
                        Há uma atualização disponível.
                      </Paragraph>
                      <Paragraph>
                        Deseja atualizar agora? Seu aplicativo será reiniciado.
                      </Paragraph>
                    </>
                  ) : (
                    <Paragraph style={{textAlign: 'center'}}>
                      Seu aplicativo já está atualizado!
                    </Paragraph>
                  )
                ) : (
                  <>
                    <ActivityIndicator />
                    <Paragraph style={{textAlign: 'center', marginTop: 16}}>
                      Verificando atualizações...
                    </Paragraph>
                  </>
                )}
              </Dialog.Content>
              {hasAvailableUpdate &&
                hasVerifiedUpdate &&
                !error &&
                !isUpdating && (
                  <Dialog.Actions>
                    <DestructiveButton onPress={resetStates}>
                      Não
                    </DestructiveButton>
                    <Button onPress={handleUpdate}>Sim</Button>
                  </Dialog.Actions>
                )}
            </Dialog>
          </Portal>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  header: {
    backgroundColor: '#666',
  },
  text: {
    color: '#63fa43',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20,
    marginBottom: 30,
  },
});

export default codePush(codePushOptions)(App);
