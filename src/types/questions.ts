export type Question = {
  answer: string;
  options: string[];
  title: string;
  type: 'fechada';
  id: string;
};

export type Subject = {
  id: string;
  title: string;
  questions: Question[];
};

export type Levels = {
  subjects: Subject[];
};
