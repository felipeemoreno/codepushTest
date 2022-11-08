import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';

interface IRepo {
  name: string;
}

const Repos = () => {
  const [repos, setRepos] = useState<IRepo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/felipeemoreno/repos').then(response => {
      response.json().then(data => {
        setRepos(data);
      });
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#EEEEEE', margin: 5}}>
      {repos.map(repo => (
        <Text key={repo.name}>{repo.name}</Text>
      ))}
    </ScrollView>
  );
};

export default Repos;
