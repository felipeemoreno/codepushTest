import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import codePush from 'react-native-code-push';
import {getVersion} from 'react-native-device-info';

const VersionInfo = () => {
  const [appCodePushVersion, setAppCodePushVersion] = useState<string | null>(
    null,
  );

  useEffect(() => {
    codePush.getUpdateMetadata().then(update => {
      console.log(update);
      if (update) {
        setAppCodePushVersion(update.label);
      }
    });
  }, []);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{textAlign: 'center', alignItems: 'center'}}>
        Versão {getVersion()}{' '}
        {appCodePushVersion && `.${appCodePushVersion?.slice(1)}`}
      </Text>
    </View>
  );
};

export default VersionInfo;
