export interface Word {
  id: string;
  word: string;
  translation: string;
  category: string;
  progress: number;
}

export const mockWords: Word[] = [
  {
    id: '1',
    word: 'apple',
    translation: 'яблуко',
    category: 'Food',
    progress: 75,
  },
  {
    id: '2',
    word: 'book',
    translation: 'книга',
    category: 'Education',
    progress: 45,
  },
  {
    id: '3',
    word: 'cat',
    translation: 'кіт',
    category: 'Animals',
    progress: 100,
  },
  {
    id: '4',
    word: 'house',
    translation: 'будинок',
    category: 'Home',
    progress: 30,
  },
];
