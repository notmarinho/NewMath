export type OpenQuestionType = {
  id: number;
  title: string;
  type: 'aberta';
  answer: string;
};

export type MultipleQuestionType = {
  id: number;
  title: string;
  type: 'multipla';
  options: string[];
  answer: string;
};

export type Question = OpenQuestionType | MultipleQuestionType;
