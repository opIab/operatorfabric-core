/* Copyright (c) 2018, RTE (http://www.rte-france.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardListComponent} from './components/card-list/card-list.component';
import {FeedComponent} from './feed.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeedRoutingModule} from "./feed-routing.module";
import {NoSelectionComponent} from './components/no-selection/no-selection.component';
import {TimeLineComponent} from './components/time-line/time-line.component';
import {CardsModule} from "../cards/cards.module";
import {FiltersComponent} from './components/card-list/filters/filters.component';
import {TypeFilterComponent} from './components/card-list/filters/type-filter/type-filter.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import { TimeFilterComponent } from './components/card-list/filters/time-filter/time-filter.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgbModule.forRoot(),
        CardsModule,
        FeedRoutingModule,
    ],
    declarations: [CardListComponent, FeedComponent, NoSelectionComponent, TimeLineComponent, FiltersComponent, TypeFilterComponent, TimeFilterComponent],
    exports: [FeedComponent]
})
export class FeedModule {
}
