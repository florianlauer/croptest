import { Location } from './location';


export class Device {

    id: number;
    creationDate: Date;
    lastModificationDate: Date;
    hasBeenReplaced: boolean;
    previousDevicesIds: any[];
    settings: any;
    accessPeriods: any[];
    modelId: number;
    identification: string;
    serial: string;
    calibrations: any;
    contents: any;
    location: Location;
    status: any;


    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

