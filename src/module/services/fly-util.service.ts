import { Injectable } from '@angular/core';
import { FlyEntity } from './entity/fly-entity';
import { FlyEntityImpl } from './entity/fly-entity-impl';
import { FlyEmbeddedEntity } from './entity/fly-embedded-entity';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class FlyUtilService {

    static viewPortSize = 0;

    constructor() {

    }

    static fieldRequired(field: string): void {
        throw new Error('Attribute \'' + field + '\' is required');
    }

    static clone(obj: any): any {
        return _.cloneDeep(obj);
    }

    static convertNullValuesToNewInstanceOfEntity(entity: FlyEntity, emptyEntity: FlyEntity): FlyEntity {
        if (entity == null) {
            return FlyUtilService.clone(emptyEntity);
        }

        const props = Object.getOwnPropertyNames(emptyEntity);

        props.forEach((prop) => {
            if ((emptyEntity[prop] instanceof FlyEntityImpl || emptyEntity[prop] instanceof FlyEmbeddedEntity)) {

                if (!entity[prop]) {
                    entity[prop] = FlyUtilService.clone(emptyEntity[prop]);
                }

                this.convertNullValuesToNewInstanceOfEntity(entity[prop], emptyEntity[prop]);
            }
        });

        return entity;
    }

    static prepareEntityToPersisty(emptyEntity: FlyEntity, entity: FlyEntity): FlyEntity {
        const props = Object.getOwnPropertyNames(entity);

        props.forEach((prop) => {
            if (emptyEntity[prop] instanceof FlyEntityImpl) {
                if (entity[prop] && !entity[prop].id) {
                    entity[prop] = null;
                }
            } else if (emptyEntity[prop] instanceof FlyEmbeddedEntity) {
                if (entity[prop]) {
                    this.prepareEntityToPersisty(emptyEntity[prop], entity[prop]);
                }
            }
        });

        return entity;
    }

    static isInViewport(element): boolean {
        if (!element) {
            return false;
        }

        const rect = element.getBoundingClientRect();
        const html = document.documentElement;
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    }

    getColClass(value: any, defaultValue: number): string {
        if (!defaultValue) {
            defaultValue = 3;
        }

        if (!value) {
            return 'col-md-' + defaultValue;
        }

        if (value.toString() === '-1') {
            return null;
        }

        return 'col-md-' + value;
    }

    isTrue(value: any): boolean {
        if (!value) {
            return false;
        }

        return value.toString().toLowerCase() === 'true';
    }

    isFalse(value: any): boolean {
        if (!value && value !== false) {
            return false;
        }

        return value.toString().toLowerCase() === 'false';
    }

    getLastDateOfMonth(year: number, month: number): Date {
        const date = year + '-' + (month < 10 ? ('0' + month) : month) + '-01';
        return moment(date).endOf('month').toDate();
    }

    getLastDayOfMonth(year: number, month: number): string {
        const date = year + '-' + (month < 10 ? ('0' + month) : month) + '-01';
        return moment(date).endOf('month').format('DD');
    }
}
