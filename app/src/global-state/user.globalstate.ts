import { signal } from '@preact/signals-react';
import { IAgencyAccount, ITouristAccount } from '@/types';

export const user = signal<ITouristAccount | null>(null);
export const agency = signal<IAgencyAccount | null>(null);

export const isUserLoggedIn = signal<boolean>(false);
