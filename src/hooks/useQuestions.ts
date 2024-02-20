import {useState, useEffect} from 'react';
import {useAuth} from '../context';
import firestore from '@react-native-firebase/firestore';

type Level = {
  id: string;
  title: string;
};

type Subject = {
  id: string;
  level_id: string;
  title: string;
  questions: Question[];
};

type Question = {
  id: string;
  answer: string;
  options: string[];
  title: string;
  type: 'fechada';
};

const useQuestions = () => {
  const {user} = useAuth();
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const getLevels = async () => {
    const nextLevels = await firestore().collection('levels').get();
    setLevels(nextLevels.docs.map(doc => doc.data() as Level));
  };

  const getSubjects = async () => {
    const nextSubjects = await firestore().collection('subjects').get();
    setSubjects(nextSubjects.docs.map(doc => doc.data() as Subject));
  };

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    getLevels();
    getSubjects();
  }, [user?.uid]);

  return {
    levels,
    subjects,
  };
};

export default useQuestions;
