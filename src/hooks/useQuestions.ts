import {useState, useEffect} from 'react';
import {useAuth} from '../context';
import firestore from '@react-native-firebase/firestore';

import {Levels} from '../types';

const useQuestions = () => {
  const {user} = useAuth();
  const [levels, setLevels] = useState<Levels[]>([]);

  const getQuestions = async () => {
    if (!user) {
      return [];
    }

    const questions = (await firestore()
      .collection('questions')
      .get()
      .then(res => res.docs.map(doc => doc.data()))) as Levels[];

    setLevels(questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return {
    levels,
  };
};

export default useQuestions;
