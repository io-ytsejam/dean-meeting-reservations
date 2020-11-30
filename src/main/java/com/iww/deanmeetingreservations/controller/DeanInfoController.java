package com.iww.deanmeetingreservations.controller;

import com.iww.deanmeetingreservations.DeanMeetingReservationsApplication;
import com.iww.deanmeetingreservations.dto.DeanDto;
import com.iww.deanmeetingreservations.dto.DeanInfoDto;
import com.iww.deanmeetingreservations.service.DeanInfoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DeanInfoController {

    private final Logger logger = LoggerFactory.getLogger(DeanMeetingReservationsApplication.class);
    @Autowired
    private DeanInfoServiceImpl deanInfoService;

    @RequestMapping(value = "/api/dean/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<DeanInfoDto> getDeanWithId(@PathVariable("id") String id) throws ResourceNotFoundException {
        try {
            DeanInfoDto deanInfoDto = deanInfoService.findUserById(id);
            return ResponseEntity.ok(deanInfoDto);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/api/dean/update-info/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<DeanDto> updateDeanInfo(@PathVariable String id, @RequestBody DeanDto deanDto) throws ResourceNotFoundException {
        try {
            DeanDto resultDto = deanInfoService.updateProfile(deanDto, id);
            return ResponseEntity.ok(resultDto);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}