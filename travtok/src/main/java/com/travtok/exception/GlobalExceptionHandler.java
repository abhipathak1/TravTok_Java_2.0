package com.travtok.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetails> customerExceptionHandler(NoHandlerFoundException ex, WebRequest we) {
		ErrorDetails er = new ErrorDetails();
		er.setMessage(ex.getMessage());
		er.setDescription(we.getDescription(false));
		return new ResponseEntity<ErrorDetails>(er, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> exceptionHandler(Exception ex, WebRequest we) {
		ErrorDetails er = new ErrorDetails();
		er.setMessage(ex.getMessage());
		er.setDescription(we.getDescription(false));
		return new ResponseEntity<ErrorDetails>(er, HttpStatus.BAD_REQUEST);
	}

}
