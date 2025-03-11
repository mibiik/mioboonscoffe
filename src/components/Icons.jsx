import {
  HomeIcon,
  InformationCircleIcon,
  ClipboardDocumentListIcon,
  CakeIcon,
  PhotoIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  PaperAirplaneIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  SparklesIcon,
  FireIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

// Import game controller icon from react-icons
import { GiGamepad } from 'react-icons/gi';

// Define custom icons
export const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.25H6a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-3.75m-1.5-1.5V5.25A2.25 2.25 0 0 1 15 3h2.25a2.25 2.25 0 0 1 2.25 2.25v1.5m-8.25 0h3.75m-3.75 0V3m0 0h-3.75A2.25 2.25 0 0 0 6 5.25v1.5" />
  </svg>
);

export const CakeSliceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125C3.504 20.625 3 20.121 3 19.5v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .53 0L12.53 3.43l.53.32a.375.375 0 1 1 0 .53l-.53.32-.32.53a.375.375 0 1 1-.53 0L11.47 5l-.53-.32a.375.375 0 1 1 0-.53l.53-.32.32-.53Z" />
  </svg>
);

export const ForkKnifeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513m-7.5 1.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM4.375 13.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm15.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

export const EggIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
);

// Game Controller Icon using react-icons
export const GameControllerIcon = () => (
  <GiGamepad className="w-6 h-6" />
);

// New Puzzle Game Icon
export const PuzzleGameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
  </svg>
);

export const navigationIcons = {
  'Ana Sayfa': HomeIcon,
  'Hakkımızda': InformationCircleIcon,
  'Menü': ClipboardDocumentListIcon,
  'Doğum Günü': CakeIcon,
  'Galeri': PhotoIcon,
  'İletişim': EnvelopeIcon,
  'Rezervasyon': CalendarDaysIcon,
  'Oyunlar': GameControllerIcon // Now using the react-icons GiGamepad icon
};

export const contactIcons = {
  'Adres': MapPinIcon,
  'Telefon': PhoneIcon,
  'E-posta': EnvelopeIcon,
  'Çalışma Saatleri': ClockIcon
};

export const actionIcons = {
  'Rezervasyon Yap': CalendarDaysIcon,
  'Menüyü İncele': ClipboardDocumentListIcon,
  'Gönder': PaperAirplaneIcon,
  'arrow': ArrowRightIcon,
  'chevron': ChevronRightIcon
};