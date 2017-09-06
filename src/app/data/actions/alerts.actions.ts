import { Action, ActionCreator } from 'redux';
import { Alert } from '../../shared/models/alert.model';

export const ADD_ALERT = 'ADD_ALERT';
export const DEL_ALERT = 'DEL_ALERT';
export interface AddAlert extends Action {
    alert: Alert;
}

export const addAlert: ActionCreator<AddAlert> =
    (alert) => ({
        type: ADD_ALERT,
        alert: alert
    });

export const delAlerts: ActionCreator<any> =
    () => ({ type: DEL_ALERT });
