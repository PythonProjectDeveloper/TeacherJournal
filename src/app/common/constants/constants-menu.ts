import { IMenuItem } from '../entities/menu-item';

export const MAIN_MENU: IMenuItem[] = [
  { text: 'Students', routerLink: '/', routerLinkActiveOptions: { exact: true } },
  { text: 'Subjects', routerLink: '/subjects' },
  { text: 'Statistics', routerLink: '/statistics' },
  { text: 'Export', routerLink: '/export' }
];
