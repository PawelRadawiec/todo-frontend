import {createFeatureSelector} from '@ngrx/store';
import {SystemUserState} from '../state/app.state';

export const getSystemUserState = createFeatureSelector<SystemUserState>('systemUserState');

