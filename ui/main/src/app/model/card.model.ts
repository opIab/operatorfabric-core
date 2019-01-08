/* Copyright (c) 2018, RTE (http://www.rte-france.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Severity} from "@ofModel/light-card.model";
import {I18n} from "@ofModel/i18n.model";

// export interface Card {
//     readonly uid: string;
//     readonly id: string;
//     readonly mainRecipient: string;
//     readonly publishDate: number;
//     readonly startDate: number;
//     readonly endDate: number;
//     readonly severity: Severity;
//     readonly processId?: string;
//     readonly lttd?: number;
//     readonly title?: I18n;
//     readonly summary?: I18n;
//     readonly data?: any;
//     readonly details?:CardDetail[];
//
// }

export class Card {

    constructor(
        readonly uid: string,
        readonly id: string,
        readonly publishDate: number,
        readonly startDate: number,
        readonly endDate: number,
        readonly severity: Severity,
        readonly mainRecipient: string,
        readonly processId?: string,
        readonly lttd?: number,
        readonly title?: I18n,
        readonly summary?: I18n,
        readonly  data?: any,
        readonly  details?: CardDetail[]
    ) {}
}

export enum TitlePosition {
    UP, DOWN, NONE

}

export class CardDetail {
    constructor(
        readonly titlePosition: TitlePosition,
        readonly title: I18n,
        readonly titleStyle:string,
        readonly templateName:string,
        readonly styles: string[]){}
}