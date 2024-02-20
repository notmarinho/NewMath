export type OpenQuestion = {
  type: 'aberta';
  answer: string;
  title: string;
};

export type MultipleChoiceQuestion = {
  type: 'multipla';
  answer: string;
  title: string;
  options: string[];
};

type Question = OpenQuestion | MultipleChoiceQuestion;

type Subject = {
  title: string;
  questions: Question[];
};

export type Levels = {
  subjects: Subject[];
};
