/* Copyright (c) 2018, RTE (http://www.rte-france.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export const CONFIG_LOAD_MAX_RETRIES = 5;

export interface ConfigState{
    config:any,
    loading: boolean,
    loaded: boolean,
    error: string,
    retry: number
}

export const configInitialState: ConfigState = {
    config:{},
    loading: false,
    loaded: false,
    error: null,
    retry: 0
}