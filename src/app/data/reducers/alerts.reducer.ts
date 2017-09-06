import { Reducer, Action } from 'redux';
import * as AlertActions from '../actions/alerts.actions';
import { Alert } from '../../shared/models/alert.model';

export const alertReducer =
    function (state: Alert, action: Action): Alert {
        switch (action.type) {
            case AlertActions.ADD_ALERT: {
                const newModal: Alert = (<AlertActions.AddAlert>action).alert;
                return newModal;
            }
            case AlertActions.DEL_ALERT: {
                return null;
            }
            default: return state;
        }
    };
