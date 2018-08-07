import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';

@Component({
    selector: 'jhi-shipment-update',
    templateUrl: './shipment-update.component.html'
})
export class ShipmentUpdateComponent implements OnInit {
    private _shipment: IShipment;
    isSaving: boolean;
    date: string;

    constructor(private shipmentService: ShipmentService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shipment }) => {
            this.shipment = shipment;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.shipment.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.shipment.id !== undefined) {
            this.subscribeToSaveResponse(this.shipmentService.update(this.shipment));
        } else {
            this.subscribeToSaveResponse(this.shipmentService.create(this.shipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IShipment>>) {
        result.subscribe((res: HttpResponse<IShipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get shipment() {
        return this._shipment;
    }

    set shipment(shipment: IShipment) {
        this._shipment = shipment;
        this.date = moment(shipment.date).format(DATE_TIME_FORMAT);
    }
}
