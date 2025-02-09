package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "")
    public ResponseEntity<?> findBooks() {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        bookService.findAll()
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "")
    public ResponseEntity<?> addBook(@ModelAttribute BookRequest bookRequest) throws IOException {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        bookService.save(bookRequest)
                ),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/{bookId}")
    public ResponseEntity<?> findBookById(@PathVariable Integer bookId) {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        bookService.findBookById(bookId)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{bookId}")
    public ResponseEntity<?> updateBook(
            @PathVariable Integer bookId,
            @ModelAttribute BookRequest bookRequest
    ) throws IOException {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        bookService.update(bookId, bookRequest)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Integer bookId) {
        bookService.deleteBookById(bookId);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        null
                ),
                HttpStatus.NO_CONTENT
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/search")
    public ResponseEntity<?> findBookByTitle(
            @RequestParam("title") String bookTitle,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size
    ) {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        bookService.findBooksByTitleContaining(bookTitle, page, size)
                ),
                HttpStatus.OK
        );
    }
}
