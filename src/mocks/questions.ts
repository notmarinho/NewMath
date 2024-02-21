import {Question} from '../types';

type FirstQuestion = {
  subject: string;
} & Question;

export const firstTestQuestions: FirstQuestion[] = [
  {
    id: '123451234124',
    title: 'Resolva a equação x^2 - 5x + 6 = 0.',
    type: 'fechada',
    answer: '2 e 3',
    options: ['1 e 6', '2 e 3', '-2 e -3', 'Não tem solução real'],
    subject: 'Álgebra',
  },
  {
    id: '123451234125',
    title: 'Qual é a área de um círculo com raio de 4 cm?',
    type: 'fechada',
    answer: '16π cm²',
    options: ['8π cm²', '16π cm²', '32π cm²', '64π cm²'],
    subject: 'Geometria',
  },
  {
    id: '123451234126',
    title: 'Qual é o valor de f(x) = 3x - 2 quando x = 4?',
    type: 'fechada',
    answer: '10',
    options: ['10', '14', '-2', '2'],
    subject: 'Funções',
  },
  {
    id: '123451234127',
    title: 'Calcule a derivada de f(x) = x^3 + 2x^2 - x + 1.',
    type: 'fechada',
    answer: '3x^2 + 4x - 1',
    options: ['3x^2 + 4x - 1', 'x^2 + 4x - 1', '6x + 4', '3x^2 - 1'],
    subject: 'Cálculo',
  },
  {
    id: '123451234128',
    title:
      'Qual é a probabilidade de tirar um ás de um baralho padrão de 52 cartas?',
    type: 'fechada',
    answer: '1/13',
    options: ['1/52', '1/13', '1/26', '4/52'],
    subject: 'Probabilidade',
  },
  {
    id: '123451234129',
    title: 'Qual é a média dos números 2, 3, 7, 10 e 15?',
    type: 'fechada',
    answer: '7.4',
    options: ['5.4', '6.4', '7.4', '8.4'],
    subject: 'Estatística',
  },
  {
    id: '123451234130',
    title: 'Qual é o módulo do número complexo 3 + 4i?',
    type: 'fechada',
    answer: '5',
    options: ['5', '7', '12', '3'],
    subject: 'Números Complexos',
  },
  {
    id: '123451234131',
    title: 'Resolva a equação log2(x) = 3.',
    type: 'fechada',
    answer: '8',
    options: ['6', '7', '8', '9'],
    subject: 'Logaritmos',
  },
  {
    id: '123451234132',
    title: 'Qual é o quinto termo da sequência aritmética 2, 5, 8, 11,...?',
    type: 'fechada',
    answer: '14',
    options: ['12', '13', '14', '15'],
    subject: 'Sequências e Séries',
  },
  {
    id: '123451234133',
    title: 'Qual é a distância entre os pontos (1,2) e (4,6)?',
    type: 'fechada',
    answer: '5',
    options: ['3', '4', '5', '6'],
    subject: 'Geometria Analítica',
  },
  {
    id: '123451234135',
    title: 'Qual é o menor número primo maior que 10?',
    type: 'fechada',
    answer: '11',
    options: ['11', '12', '13', '14'],
    subject: 'Teoria dos Números',
  },
];
