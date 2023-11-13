package com.springboot.laptop.advice;

import com.springboot.laptop.exception.ApiError;
import com.springboot.laptop.exception.ApiSubError;
import com.springboot.laptop.exception.ApiValidationError;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     *
     * ControllerAdvice only handles for Controller, not handle for Service or Repository
      */

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }


    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Object> noSuchElementHandler(NoSuchElementException ex) {
        return buildResponseEntity(new ApiError(HttpStatus.NOT_FOUND,"Not found this, check again !", ex));
    }


    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Object> fileUploadExceedException(MaxUploadSizeExceededException ex) {
        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST,"The size of file uploaded exceeds the size requirement, only 2MB accepted!", ex));
    }


    @ExceptionHandler({SizeLimitExceededException.class})
    public ResponseEntity<Object> sizeLimitExceededException(SizeLimitExceededException ex) {

        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST,"The size of file uploaded exceeds the size requirement, only 2MB accepted!", ex));

    }

    @ExceptionHandler({NullPointerException.class})
    public ResponseEntity<Object> handleNullPointerException(NullPointerException ex) {

        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST,ex.getMessage(), ex));

    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex, ServletWebRequest request) {

        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        List<ApiSubError> errors = constraintViolations
                .stream()
                .map(err -> new ApiValidationError("",err.getRootBeanClass().getName(), null, ex.getMessage()))
                .collect(Collectors.toList());

        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, errors));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(
            EntityNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }


}
