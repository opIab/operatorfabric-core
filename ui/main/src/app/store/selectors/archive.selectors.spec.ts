/* Copyright (c) 2018, RTE (http://www.rte-france.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {AppState} from '@ofStore/index';
import {archiveInitialState, ArchiveState} from '@ofStates/archive.state';
import { selectArchiveFilters} from '@ofSelectors/archive.selectors';

describe('ArchiveSelectors', () => {
    const emptyAppState: AppState = {
        router: null,
        feed: null,
        timeline: null,
        authentication: null,
        card: null,
        menu: null,
        config: null,
        settings: null,
        time: null,
        archive: null,
        user: null
    };
    const filters = new Map<string, string[]>();
    filters.set('endBusnDate', ['1566303137']);
    const existingFilterState: ArchiveState = {
        ...archiveInitialState,
        filters
    };

    it('manage empty filters', () => {
        const testAppState = {...emptyAppState, archive: archiveInitialState};
        expect(selectArchiveFilters(testAppState)).toEqual(archiveInitialState.filters);
    });
    it('return archive  and specific filter', () => {
        const testAppState = {...emptyAppState, archive: existingFilterState};
        expect(selectArchiveFilters(testAppState)).toEqual(existingFilterState.filters);
    });




});
