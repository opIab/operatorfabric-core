/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

package org.lfenergy.operatorfabric.cards.consultation.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.lfenergy.operatorfabric.cards.consultation.model.CardOperationConsultationData;
import org.lfenergy.operatorfabric.cards.consultation.model.I18nConsultationData;
import org.lfenergy.operatorfabric.cards.consultation.model.LightCardConsultationData;
import org.lfenergy.operatorfabric.cards.consultation.services.CardSubscriptionService;
import org.lfenergy.operatorfabric.cards.model.CardOperationTypeEnum;
import org.lfenergy.operatorfabric.cards.model.SeverityEnum;
import org.lfenergy.operatorfabric.springtools.error.model.ApiError;
import org.lfenergy.operatorfabric.springtools.error.model.ApiErrorException;
import org.lfenergy.operatorfabric.users.model.User;
import org.lfenergy.operatorfabric.utilities.SimulatedTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.Optional;

/**
 * <p></p>
 * Created on 18/09/18
 *
 * @author davibind
 */
@Component
@Slf4j
public class CardOperationsController {

    private final CardSubscriptionService cardSubscriptionService;


    private final ObjectMapper mapper;

    @Autowired
    public CardOperationsController(CardSubscriptionService cardSubscriptionService, ObjectMapper mapper) {
        this.cardSubscriptionService = cardSubscriptionService;
        this.mapper = mapper;
    }



    public Flux<String> registerSubscriptionAndPublish(Mono<Tuple2<User, Optional<String>>> input) {
        return input
           .flatMapMany(t -> {
               if (t.getT2().isPresent()) {
                   String clientId = t.getT2().get();
                   return cardSubscriptionService.subscribe(t.getT1(), clientId).getPublisher();
               } else {
                   log.warn("\"clientId\" is a mandatory request parameter");
                   ApiErrorException e = new ApiErrorException(ApiError.builder()
                      .status(HttpStatus.BAD_REQUEST)
                      .message("\"clientId\" is a mandatory request parameter")
                      .build()
                   );
                   log.debug("4xx error underlying exception", e);
                   return Mono.just(objectToJsonString(e.getError()));
               }
           });
    }

    public Flux<String> publishTestData(Mono<Tuple2<User, Optional<String>>> input) {
        return input.flatMapMany(t -> Flux
                .interval(Duration.ofSeconds(5))
                .doOnEach(l -> log.info("message " + l + " to " + t.getT1().getLogin()))
                .map(l -> CardOperationConsultationData.builder()
                        .number(l)
                        .publicationDate(SimulatedTime.getInstance().computeNow().toEpochMilli() - 600000)
                        .type(CardOperationTypeEnum.ADD)
                        .card(
                                LightCardConsultationData.builder()
                                        .id(l + "")
                                        .uid(l + "")
                                        .summary(I18nConsultationData.builder().key("summary").build())
                                        .title(I18nConsultationData.builder().key("title").build())
                                        .mainRecipient("rte-operator")
                                        .severity(SeverityEnum.ALARM)
                                        .startDate(SimulatedTime.getInstance().computeNow().toEpochMilli())
                                        .endDate(SimulatedTime.getInstance().computeNow().toEpochMilli() + 3600000)
                                        .build()
                        )
                        .build())
                .map(this::objectToJsonString)
                .doOnCancel(() -> log.info("cancelled"))
                .log()
        );
    }

    private String objectToJsonString(Object o) {
        try {
            return mapper.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            log.error("Unnable to convert object to Json string", e);
            return "null";
        }
    }


}
