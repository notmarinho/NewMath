import {Question} from '../types';

export const trigonometryQuestions: Question[] = [
  {
    id: 1,
    title: 'Calcule o seno de 30 graus.',
    type: 'aberta',
    answer: '0.5',
  },
  {
    id: 2,
    title: 'Qual é a tangente de 45 graus?',
    type: 'aberta',
    answer: '1',
  },
  {
    id: 3,
    title: 'Se cos(x) = 0.5, qual é o valor de x em graus?',
    type: 'aberta',
    answer: '60 graus',
  },
  {
    id: 4,
    title: 'Qual é o valor de sin(90°)?',
    type: 'multipla',
    options: ['0', '0.5', '1', '-1'],
    answer: '1',
  },
  {
    id: 5,
    title: 'Se tan(θ) = 1, quais são os possíveis valores de θ?',
    type: 'multipla',
    options: ['45° e 225°', '30° e 150°', '45° e 180°', '30° e 210°'],
    answer: '45° e 225°',
  },
  {
    id: 6,
    title: 'Qual é o cosseno de 60 graus?',
    type: 'aberta',
    answer: '0.5',
  },
  {
    id: 7,
    title: 'Determine o valor de cos(0°).',
    type: 'aberta',
    answer: '1',
  },
  {
    id: 8,
    title: 'A tangente de qual ângulo é indefinida?',
    type: 'multipla',
    options: ['0°', '90°', '180°', '270°'],
    answer: '90°',
  },
  {
    id: 9,
    title: 'Qual é a secante de 45 graus?',
    type: 'aberta',
    answer: '√2',
  },
  {
    id: 10,
    title: 'Qual é o valor de sin(θ) quando θ é 270 graus?',
    type: 'multipla',
    options: ['1', '0', '-1', '0.5'],
    answer: '-1',
  },
];
