/* Copyright (c) 2018, RTE (http://www.rte-france.com)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    urls: {
      authentication: '',
        auth: 'http://opfab.rte-europe.com:2002/auth',
        cards: 'http://opfab.rte-europe.com:2002/cards',
        users: 'http://opfab.rte-europe.com:2002/users',
        archives : '',
        thirds: 'http://opfab.rte-europe.com:2002/thirds',
        config: 'http://opfab.rte-europe.com:2002/config/web-ui.json',
      time: 'http://opfab.rte-europe.com:2002/time',
      actions: 'http://opfab.rte-europe.com:2002/action'
    }
};

/*
 * In development mode, to ignore zone related message stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw message
 */
// import 'zone.js/dist/zone-message';  // Included with Angular CLI.
